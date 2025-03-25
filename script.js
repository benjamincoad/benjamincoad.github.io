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

    // Find and update active menu item
    document.querySelector(`[href="#${pageId}"]`).classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

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

// Artwork Preview Functionality
function showArtworkPreview(imageSrc, title) {
    const modal = document.getElementById('artworkPreview');
    const previewImage = document.getElementById('previewImage');
    const previewTitle = document.getElementById('previewTitle');

    previewImage.src = imageSrc;
    previewTitle.textContent = title;
    modal.style.display = 'block';

    // Close on clicking outside
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeArtworkPreview();
        }
    };

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeArtworkPreview();
        }
    });
}

function closeArtworkPreview() {
    const modal = document.getElementById('artworkPreview');
    modal.style.display = 'none';
}

// Start Menu Functionality
function toggleStartMenu(event) {
    event.stopPropagation();
    const startMenu = document.getElementById('startMenu');
    startMenu.classList.toggle('active');
}

// Close start menu when clicking outside
document.addEventListener('click', (event) => {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.querySelector('.start-button');

    if (!startMenu.contains(event.target) && event.target !== startButton) {
        startMenu.classList.remove('active');
    }
});

// Navigation from Start Menu
function navigateTo(pageId) {
    const startMenu = document.getElementById('startMenu');
    startMenu.classList.remove('active');
    showPage(pageId);
}

// Taskbar Clock
function updateTaskbarClock() {
    const clock = document.getElementById('taskbarClock');
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');

    clock.textContent = `${displayHours}:${displayMinutes} ${ampm}`;
}

// Initialize
setInterval(updateTaskbarClock, 1000);
updateTaskbarClock();