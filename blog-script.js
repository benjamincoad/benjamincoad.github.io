// blog-script.js - Helper functions for individual blog posts

// Update status bar with clock
function updateStatusBar() {
    const statusBar = document.querySelector('.status-bar');
    const now = new Date();
    const time = now.toLocaleTimeString();
    statusBar.textContent = `bencoad.com | ${time}`;
}

// Initialize
setInterval(updateStatusBar, 1000);
updateStatusBar();