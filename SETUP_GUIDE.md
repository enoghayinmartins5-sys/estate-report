# EstatePro Reporting System - Setup Guide
## Real-Time Collaboration with GitHub Sync

This guide explains how to set up and use the enhanced EstatePro Reporting System with real-time team collaboration.

---

## 🚀 What's New?

The system now includes **GitHub Sync** functionality that enables:
- ✅ Real-time report sharing across all team members
- ✅ Automatic backup of all reports to your GitHub repository
- ✅ Conflict-free collaboration - everyone sees the same data
- ✅ Version history and data recovery through GitHub
- ✅ Works on any device with internet access

---

## 📋 Prerequisites

Before you begin, ensure you have:
1. A GitHub account (free account works fine)
2. Write access to the `estate-report` repository
3. Basic understanding of how to generate a GitHub Personal Access Token

---

## 🔧 Setup Instructions

### Step 1: Generate a GitHub Personal Access Token

1. Go to GitHub and log in to your account
2. Click on your profile picture (top-right) → **Settings**
3. Scroll down and click **Developer settings** (left sidebar)
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Fill in the form:
   - **Note**: `EstatePro Reporting System`
   - **Expiration**: Choose `No expiration` or set a long expiration
   - **Scopes**: Check the `repo` checkbox (this gives full repository access)
7. Scroll to the bottom and click **Generate token**
8. **IMPORTANT**: Copy the token immediately! It looks like: `ghp_xxxxxxxxxxxxxxxxxxxx`
   - You won't be able to see it again
   - Save it somewhere safe temporarily

### Step 2: Configure the EstatePro System

1. Open the EstatePro website: `https://enoghayinmartins5-sys.github.io/estate-report/`
2. Click on **Settings & Sync** in the left sidebar
3. In the configuration form, enter:
   - **GitHub Token**: Paste the token you copied in Step 1
   - **Your Name**: Enter your full name (e.g., "John Doe")
   - **Your Email**: Enter your work email
4. Click **Save Configuration**
5. Click **Test Connection** to verify it works
   - You should see a green "Connected successfully!" message

### Step 3: Enable Sync

1. After configuration, you'll see an "Enable Sync" toggle
2. Turn it **ON**
3. The system will perform an initial sync automatically
4. You're now set up! 🎉

---

## 💼 How to Use

### Creating Reports

1. Click **Daily Report** in the sidebar
2. Fill in your department's report form
3. Click **Submit Report**
4. The report is saved **locally** (in your browser)
5. If sync is enabled, it's **automatically pushed to GitHub** within seconds
6. All team members will receive the update on their next sync

### Viewing Reports

- **Dashboard**: See all reports aggregated
- **Weekly/Monthly/Yearly**: View summary analytics
- **Search Reports**: Find specific reports by date, department, or content

### Manual Sync Operations

In **Settings & Sync**, you have three manual sync options:

#### Pull from GitHub
- Downloads all reports from GitHub
- Replaces your local data with GitHub data
- Use this when: You want to get the latest reports from your team

#### Push to GitHub
- Uploads your local reports to GitHub
- Use this when: You have reports locally that aren't on GitHub yet

#### Full Sync (Recommended)
- Intelligently merges local and GitHub data
- Keeps all reports from both sources
- Use this when: You want to ensure everything is synchronized

---

## 👥 Team Collaboration Workflow

### For the First Team Member (Admin)

1. Set up GitHub sync as described above
2. Create a few sample reports
3. Ensure sync is enabled and reports are pushed to GitHub
4. Share the setup guide with other team members

### For Additional Team Members

1. Each team member needs to:
   - Get their own GitHub Personal Access Token (Step 1)
   - Configure the system with their token (Step 2)
   - Enable sync (Step 3)
2. On first load, the system will download all existing reports from GitHub
3. Now everyone is synchronized!

### Daily Usage

1. **Morning**: Open the website - it automatically syncs on load
2. **Throughout the day**: Submit reports as usual
3. **Reports auto-sync**: Every report is pushed to GitHub immediately
4. **Periodic sync**: The system syncs every 5 minutes automatically
5. **Manual sync**: Use "Full Sync" button if you want to force an immediate update

---

## 🔐 Security & Privacy

- **Tokens are stored locally**: Your GitHub token is only saved in your browser's local storage
- **Not shared**: The token never leaves your device
- **Team visibility**: All team members with the token can see all reports
- **GitHub protected**: Your repository is protected by GitHub's security

---

## ⚠️ Important Notes

### Token Expiration
- If you set an expiration on your token, you'll need to generate a new one when it expires
- Update it in Settings & Sync when that happens

### Internet Requirement
- GitHub sync requires an active internet connection
- Local reports are saved even without internet
- They'll sync when you're back online

### Data Conflicts
- The sync system uses "merge" logic - it keeps reports from both sources
- Each report has a unique ID, so duplicates are impossible

### Repository Access
- All team members need write access to the repository
- The repository owner can manage permissions in GitHub settings

---

## 🛠️ Troubleshooting

### "Connection failed: 401 Unauthorized"
- Your token is invalid or expired
- Generate a new token and save it in Settings

### "Connection failed: 403 Forbidden"
- Your token doesn't have `repo` permissions
- Generate a new token with the `repo` scope checked

### "No reports showing up"
- Make sure sync is enabled
- Click "Pull from GitHub" to download reports
- Check if you have internet connection

### "Reports not syncing"
- Check if sync toggle is ON in Settings & Sync
- Try clicking "Full Sync" manually
- Check browser console for error messages (F12 → Console tab)

---

## 📚 Additional Features

### Backup & Export
- You can still export reports as JSON files from "Backup & Export"
- This provides an additional backup layer

### Department Filtering
- Each team member can switch between department views
- Admins see all departments
- Department users see their own department by default

### Analytics
- Dashboard shows real-time statistics
- Weekly/Monthly/Yearly summaries with charts
- Estate performance tracking

---

## 🎯 Best Practices

1. **Enable sync immediately** after setup
2. **Check the dashboard daily** to see team progress
3. **Use meaningful names** when configuring (your real name)
4. **Don't share your token** - each person should have their own
5. **Regular backups**: Export JSON backups monthly as extra safety
6. **Keep repository private**: The repository contains company data

---

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Try the troubleshooting section
3. Check the GitHub repository's Issues tab
4. Contact your system administrator

---

## 🔄 Version History

### v2.0 - GitHub Sync Release
- Added real-time collaboration via GitHub
- Auto-sync on report submission
- Periodic background syncing
- Manual sync controls
- Settings & configuration page

### v1.0 - Initial Release
- Local storage only
- Basic reporting features
- Dashboard analytics

---

**Last Updated**: July 2, 2026  
**Repository**: `enoghayinmartins5-sys/estate-report`  
**Website**: `https://enoghayinmartins5-sys.github.io/estate-report/`
