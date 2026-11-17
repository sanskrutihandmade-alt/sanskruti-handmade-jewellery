const path = require("node:path");
const express = require("express");
const app = express();
const port = Number(process.env.PORT) || 8000;

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
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

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Sanskruti site available on port ${port}`);
});

process.once("SIGINT", () => server.close(() => process.exit(0)));
process.once("SIGTERM", () => server.close(() => process.exit(0)));
