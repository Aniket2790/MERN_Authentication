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
