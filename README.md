# MERN Authentication

Simple MERN stack authentication project.

## Environment

Copy `server/config.env.example` to `server/config.env` and fill in real values. Never commit `server/config.env` to the repository — it should remain local only.

If secrets were previously committed to this repo, rotate them immediately (Twilio credentials, SMTP password, JWT secret, etc.) and verify GitHub Secret Scanning for any remaining alerts.

## Notes

- After history rewrites, collaborators should re-clone or run:

```powershell
# Make sure you have no uncommitted changes
git fetch origin
git reset --hard origin/main
```

## Secret scanning and local checks

- A GitHub Action (`.github/workflows/gitleaks.yml`) was added to scan for secrets on pushes and pull requests using Gitleaks.
- A local quick-check script is available at `scripts/check-secrets.js`. Run it locally before committing to detect obvious secrets:

```powershell
node scripts/check-secrets.js
```

These are safeguards — you should still rotate any previously exposed secrets immediately.
