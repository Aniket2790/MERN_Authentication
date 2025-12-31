#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const ignoreDirs = new Set([".git", "node_modules", "dist"]);

const patterns = [
  { name: "Twilio SID", re: /AC[a-f0-9]{32}/i },
  { name: "Twilio Auth Token", re: /[a-f0-9]{32}/i },
  { name: "JWT secret", re: /JWT_SECRET_KEY\s*=\s*\S+/i },
  { name: "SMTP password", re: /SMTP_PASSWORD\s*=\s*\S+/i },
  { name: "Generic long key", re: /[A-Za-z0-9_\-]{40,}/ }, // long tokens
];

let findings = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    if (ignoreDirs.has(ent.name)) continue;
    // skip backup bundles
    if (ent.name.endsWith(".bundle")) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(p);
    } else {
      // skip binary files by extension
      if (/\.(png|jpg|jpeg|gif|ico|exe|dll|so|zip|tar|gz)$/i.test(ent.name))
        continue;
      try {
        const text = fs.readFileSync(p, "utf8");
        patterns.forEach(({ name, re }) => {
          const m = text.match(re);
          if (m) {
            findings.push({ file: path.relative(root, p), name, match: m[0] });
          }
        });
      } catch (e) {
        // ignore read errors
      }
    }
  }
}

walk(root);

if (findings.length) {
  console.error("Secrets detector found potential secrets:");
  findings.forEach((f) =>
    console.error(` - ${f.file}: ${f.name} => ${f.match}`)
  );
  process.exitCode = 2;
} else {
  console.log("No obvious secrets found (quick scan).");
}
