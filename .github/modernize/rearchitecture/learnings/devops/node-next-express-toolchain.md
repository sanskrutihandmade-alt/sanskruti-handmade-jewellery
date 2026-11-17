# Node, Next.js, and Express Toolchain

The local Sanskruti workspace uses Node.js/npm as the base toolchain and should pin app dependencies in the scaffold manifest and lockfile.

## What Happened

For Sanskruti task t2, the active Windows PATH resolved Node.js v22.21.0 and npm/npx 10.9.4. An isolated temporary install of Next.js 16.4.6 and Express 5.3.0 ran successfully; Next.js documents Node 20.9 as its minimum and Express package metadata specifies Node 18 or later. The project had no manifest, so the tested packages were not added to it.

## Takeaway

When the app scaffold is created, choose and pin compatible Next.js/React/Express versions in `package.json`, commit the npm lockfile, and record the Node runtime policy. Keep environment readiness checks separate from app dependencies; use a temporary install to validate package/runtime compatibility before the project manifest exists.

## History

- 2026-11-17 (sanskruti-full-stack/t2): initial
