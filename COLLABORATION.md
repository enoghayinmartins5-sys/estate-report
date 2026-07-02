# Team Collaboration & Auto‑Deployment Guide

This repository powers the **EstatePro Reporting System** website, live at:

👉 **https://enoghayinmartins5-sys.github.io/estate-report/**

It is set up for **continuous deployment**: whenever a change reaches the
`main` branch, a GitHub Actions workflow automatically publishes it to the
live site within a minute or two. No one has to deploy anything by hand.

---

## 1. How the auto‑deployment works

- The workflow file lives at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
- It runs on **every push / merge to `main`**.
- Steps:
  1. **Validate** – checks that `index.html` exists and `reports.json` is valid JSON.
  2. **Deploy** – publishes the site to GitHub Pages.
- You can watch every deployment under the repository's **Actions** tab.

> ✅ Result: when any staff member's change lands on `main`, everyone sees it
> on the live website automatically.

> ⚙️ **One-time setup:** In **Settings → Pages → Build and deployment → Source**,
> select **GitHub Actions** (instead of "Deploy from a branch"). This tells
> GitHub Pages to use the workflow above.

---

## 2. Adding team members as collaborators

Only the repository **owner/admin** (`enoghayinmartins5-sys`) can do this.

1. Open the repository on GitHub:
   `https://github.com/enoghayinmartins5-sys/estate-report`
2. Click **Settings** (top menu).
3. In the left sidebar, click **Collaborators** (under *Access*).
   - GitHub may ask you to confirm your password.
4. Click **Add people**.
5. Type the teammate's **GitHub username or email** and select them.
6. Choose a role — for staff who edit the site, pick **Write**.
7. Click **Add [name] to this repository**.
8. The teammate receives an email/GitHub invite and must **Accept** it.

### Recommended roles
| Role | What they can do | Use for |
|------|------------------|---------|
| **Read** | View only | Viewers / auditors |
| **Write** | Push branches, open & merge PRs, edit files | Most staff editors |
| **Maintain** | Write + manage some settings | Team leads |
| **Admin** | Full control incl. settings & collaborators | Owner / IT admin |

> 💡 For larger teams, create a **GitHub Organization** and use **Teams** to
> manage many people at once instead of adding them one by one.

---

## 3. Collaboration workflow for staff

There are two supported ways to make changes. Choose based on comfort level.

### Option A — Quick edit directly on GitHub (easiest, no tools)
Best for small text/report edits.

1. Go to the file on GitHub (e.g. `index.html` or `reports.json`).
2. Click the **pencil (✏️ Edit)** icon.
3. Make your changes.
4. Scroll down, add a short **commit message** describing the change.
5. Choose **"Commit directly to the `main` branch"**.
6. Click **Commit changes**.
7. 🎉 The site auto‑deploys — refresh the live URL after ~1–2 minutes.

### Option B — Branch + Pull Request (recommended for safety / review)
Best when you want a teammate to review before it goes live.

```bash
# 1. Clone once (first time only)
git clone https://github.com/enoghayinmartins5-sys/estate-report.git
cd estate-report

# 2. Always start from the latest main
git checkout main
git pull origin main

# 3. Create a branch for your change
git checkout -b my-change-description

# 4. Edit files, then stage & commit
git add .
git commit -m "Describe what you changed"

# 5. Push your branch
git push origin my-change-description
```

Then on GitHub:
1. Click **Compare & pull request**.
2. Add a title/description and click **Create pull request**.
3. A teammate reviews and clicks **Merge pull request**.
4. On merge, the site **auto‑deploys** to the live URL.

---

## 4. Golden rules to avoid conflicts

- **Always `git pull origin main` before you start editing.** This keeps you
  in sync with everyone else's latest changes.
- **Make small, frequent commits** with clear messages.
- If Git reports a **merge conflict**, it means two people edited the same
  lines. Open the file, keep the correct version, remove the `<<<<`/`====`/`>>>>`
  markers, then commit again.
- Check the **Actions** tab if a change doesn't appear — a red ❌ means the
  deployment failed (usually invalid JSON in `reports.json`).

---

## 5. Important note about report data

The website currently stores the reports you create **in each browser's local
storage** (on the individual staff member's device). That data is **not**
automatically shared between staff or committed to this repository.

To make reports truly shared across the whole team, the data needs to be saved
back into the repository (e.g. committing `reports.json`) or into a shared
backend/database. If you'd like every staff member to see the same live report
data automatically, ask your developer to enable one of those options — the
deployment pipeline in this repo is already ready to publish it once it's saved.

---

## 6. Quick reference

| Task | Where |
|------|-------|
| Live website | https://enoghayinmartins5-sys.github.io/estate-report/ |
| Add collaborators | Settings → Collaborators → Add people |
| Watch deployments | Actions tab |
| Deployment config | `.github/workflows/deploy.yml` |
| Set Pages source | Settings → Pages → Source → GitHub Actions |
