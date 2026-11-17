const path = require("node:path");
const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config({
  path: process.env.MONGODB_ENV_FILE || path.resolve(__dirname, "..", "atlas-credentials.env")
});

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("Missing MONGODB_URI. Set it in the parent atlas-credentials.env file or the environment.");
  process.exit(1);
}

const app = express();
const client = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 10000 });
const databaseName = process.env.MONGODB_DB_NAME || "sanskruti";
const port = Number(process.env.PORT) || 8000;

app.use(express.json({ limit: "10kb" }));

app.post("/api/enquiries", async (req, res) => {
  const body = req.body;
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const mobile = typeof body?.mobile === "string" ? body.mobile.trim() : "";
  const product = typeof body?.product === "string" ? body.product.trim() : "";
  const quantity = Number(body?.quantity);
  const mobileDigits = mobile.replace(/\D/g, "");

  if (
    name.length === 0 || name.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
    mobile.length > 30 || mobileDigits.length < 10 || mobileDigits.length > 15 ||
    product.length === 0 || product.length > 150 ||
    !Number.isSafeInteger(quantity) || quantity < 1
  ) {
    return res.status(400).json({ error: "Please provide valid contact and product details." });
  }

  try {
    await client.db(databaseName).collection("enquiries").insertOne({
      name,
      email,
      mobile,
      product,
      quantity,
      status: "new",
      createdAt: new Date()
    });
    res.status(201).json({ message: "Enquiry saved." });
  } catch (error) {
    console.error(`MongoDB enquiry insert failed (${error.name}).`);
    res.status(503).json({ error: "We could not save your enquiry. Please try again later." });
  }
});

app.get("/api/health", async (_req, res) => {
  try {
    await client.db(databaseName).command({ ping: 1 });
    res.json({ status: "ok", database: "connected" });
  } catch {
    res.status(503).json({ status: "unavailable", database: "disconnected" });
  }
});

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

for (const file of ["styles.css", "contact-form.css", "config.js", "script.js"]) {
  app.get(`/${file}`, (_req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
}

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use((_req, res) => {
  res.status(404).send("Not found");
});

async function start() {
  await client.connect();
  await client.db(databaseName).command({ ping: 1 });
  app.listen(port, "127.0.0.1", () => {
    console.log(`Sanskruti site available at http://localhost:${port}`);
    console.log(`MongoDB connection ready for database "${databaseName}"`);
  });
}

start().catch(async (error) => {
  console.error(`MongoDB connection failed (${error.name}). Check the Atlas URI, credentials, and network access.`);
  await client.close().catch(() => {});
  process.exitCode = 1;
});

process.once("SIGINT", async () => {
  await client.close();
  process.exit(0);
});

process.once("SIGTERM", async () => {
  await client.close();
  process.exit(0);
});
