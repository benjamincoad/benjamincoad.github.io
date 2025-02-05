// Form handling
const form = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.className = 'status-message success';
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                formStatus.textContent = 'Oops! There was a problem sending your message.';
                formStatus.className = 'status-message error';
            });
    });
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Update menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    // Update active menu item
    event.target.classList.add('active');
}

// Initialize status bar clock
function updateStatusBar() {
    const statusBar = document.querySelector('.status-bar');
    const now = new Date();
    const time = now.toLocaleTimeString();
    statusBar.textContent = `Ready | ${time}`;
}

// Update clock every second
setInterval(updateStatusBar, 1000);
updateStatusBar(); // Initial update