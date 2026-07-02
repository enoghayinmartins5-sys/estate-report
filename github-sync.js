/**
 * GitHub Sync Module for EstatePro Reporting System
 * Enables real-time collaboration by syncing reports.json to GitHub repository
 */

class GitHubSync {
    constructor() {
        this.owner = 'enoghayinmartins5-sys';
        this.repo = 'estate-report';
        this.branch = 'main';
        this.filePath = 'reports.json';
        this.token = localStorage.getItem('github_token') || '';
        this.isConfigured = !!this.token;
        this.syncEnabled = localStorage.getItem('sync_enabled') === 'true';
        this.lastSync = localStorage.getItem('last_sync_time') || null;
        this.userName = localStorage.getItem('github_user_name') || 'Unknown';
        this.userEmail = localStorage.getItem('github_user_email') || 'user@estatepro.local';
    }

    /**
     * Configure GitHub sync with personal access token
     */
    configure(token, userName, userEmail) {
        this.token = token;
        this.userName = userName;
        this.userEmail = userEmail;
        localStorage.setItem('github_token', token);
        localStorage.setItem('github_user_name', userName);
        localStorage.setItem('github_user_email', userEmail);
        this.isConfigured = true;
    }

    /**
     * Enable or disable sync
     */
    toggleSync(enabled) {
        this.syncEnabled = enabled;
        localStorage.setItem('sync_enabled', enabled.toString());
    }

    /**
     * Get current file SHA from GitHub (needed for updates)
     */
    async getFileSHA() {
        try {
            const response = await fetch(
                `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.filePath}?ref=${this.branch}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (!response.ok) {
                if (response.status === 404) {
                    return null; // File doesn't exist yet
                }
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const data = await response.json();
            return data.sha;
        } catch (error) {
            console.error('Error getting file SHA:', error);
            throw error;
        }
    }

    /**
     * Pull reports from GitHub repository
     */
    async pull() {
        if (!this.isConfigured || !this.syncEnabled) {
            throw new Error('GitHub sync not configured or disabled');
        }

        try {
            const response = await fetch(
                `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.filePath}?ref=${this.branch}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (!response.ok) {
                if (response.status === 404) {
                    // File doesn't exist, return empty array
                    return [];
                }
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const data = await response.json();
            const content = atob(data.content.replace(/\n/g, ''));
            const reports = JSON.parse(content);
            
            this.lastSync = new Date().toISOString();
            localStorage.setItem('last_sync_time', this.lastSync);
            
            return reports;
        } catch (error) {
            console.error('Error pulling from GitHub:', error);
            throw error;
        }
    }

    /**
     * Push reports to GitHub repository
     */
    async push(reports, commitMessage = 'Update reports') {
        if (!this.isConfigured || !this.syncEnabled) {
            throw new Error('GitHub sync not configured or disabled');
        }

        try {
            // Get current file SHA
            const sha = await this.getFileSHA();
            
            // Encode content to base64
            const content = btoa(JSON.stringify(reports, null, 2));
            
            // Prepare commit data
            const commitData = {
                message: commitMessage,
                content: content,
                branch: this.branch,
                committer: {
                    name: this.userName,
                    email: this.userEmail
                }
            };

            // Add SHA if file exists
            if (sha) {
                commitData.sha = sha;
            }

            // Push to GitHub
            const response = await fetch(
                `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.filePath}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(commitData)
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`GitHub API error: ${response.status} - ${error.message}`);
            }

            const result = await response.json();
            this.lastSync = new Date().toISOString();
            localStorage.setItem('last_sync_time', this.lastSync);
            
            return result;
        } catch (error) {
            console.error('Error pushing to GitHub:', error);
            throw error;
        }
    }

    /**
     * Sync local storage with GitHub (bidirectional)
     */
    async sync(localReports) {
        if (!this.isConfigured || !this.syncEnabled) {
            return localReports;
        }

        try {
            // Pull from GitHub
            const remoteReports = await this.pull();
            
            // Merge: prefer remote reports, add local ones not in remote
            const merged = [...remoteReports];
            const remoteIds = new Set(remoteReports.map(r => r.reportId));
            
            for (const localReport of localReports) {
                if (!remoteIds.has(localReport.reportId)) {
                    merged.push(localReport);
                }
            }
            
            // If we added local reports, push back to GitHub
            if (merged.length > remoteReports.length) {
                await this.push(merged, 'Sync: Add local reports to remote');
            }
            
            return merged;
        } catch (error) {
            console.error('Sync error:', error);
            // Return local reports on error
            return localReports;
        }
    }

    /**
     * Test GitHub connection
     */
    async testConnection() {
        if (!this.isConfigured) {
            return { success: false, message: 'GitHub token not configured' };
        }

        try {
            const response = await fetch(
                `https://api.github.com/repos/${this.owner}/${this.repo}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (!response.ok) {
                return { 
                    success: false, 
                    message: `Connection failed: ${response.status} ${response.statusText}` 
                };
            }

            const data = await response.json();
            return { 
                success: true, 
                message: 'Connected successfully!',
                repo: data.full_name,
                private: data.private
            };
        } catch (error) {
            return { 
                success: false, 
                message: `Connection error: ${error.message}` 
            };
        }
    }

    /**
     * Get sync status
     */
    getStatus() {
        return {
            configured: this.isConfigured,
            enabled: this.syncEnabled,
            lastSync: this.lastSync,
            userName: this.userName,
            repo: `${this.owner}/${this.repo}`
        };
    }
}

// Export for use in main application
window.GitHubSync = GitHubSync;
