// Modern Developer Website - Benjamin Coad
// Main JavaScript functionality

// YouTube API Configuration
const YOUTUBE_API_KEY = 'AIzaSyA16HETjclvrJlG02hjtHUfHX9BOm-8tJA';
const YOUTUBE_CHANNEL_ID = 'UCxqAWLTk1CmBvZFPzeZMd9A'; // @babjamin
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadYouTubeVideos();
    initializeScrollEffects();
    initializeTypingEffect();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = getCurrentPage();
    
    // Set active nav link based on current page
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Add smooth transitions for navigation
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Get current page for navigation highlighting
function getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
}

// YouTube API integration
async function loadYouTubeVideos() {
    const youtubeContent = document.getElementById('youtube-content');
    const loadingElement = document.getElementById('youtube-loading');
    
    if (!youtubeContent) return;
    
    try {
        // Fetch channel uploads playlist
        const channelResponse = await fetch(
            `${YOUTUBE_API_URL}/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
        );
        
        if (!channelResponse.ok) {
            throw new Error('Failed to fetch channel data');
        }
        
        const channelData = await channelResponse.json();
        const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
        
        // Fetch latest 3 videos
        const videosResponse = await fetch(
            `${YOUTUBE_API_URL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=3&key=${YOUTUBE_API_KEY}`
        );
        
        if (!videosResponse.ok) {
            throw new Error('Failed to fetch videos');
        }
        
        const videosData = await videosResponse.json();
        
        // Clear loading state
        if (loadingElement) {
            loadingElement.remove();
        }
        
        // Render videos
        renderYouTubeVideos(videosData.items, youtubeContent);
        
    } catch (error) {
        console.error('Error loading YouTube videos:', error);
        renderFallbackVideos(youtubeContent);
    }
}

// Render YouTube videos in the grid
function renderYouTubeVideos(videos, container) {
    const [featuredVideo, ...sidebarVideos] = videos;
    
    container.innerHTML = `
        <div class="featured-video">
            ${renderVideoCard(featuredVideo, true)}
        </div>
        <div class="video-sidebar">
            ${sidebarVideos.map(video => renderVideoCard(video, false)).join('')}
        </div>
    `;
}

// Render individual video card
function renderVideoCard(video, isFeatured = false) {
    const { videoId, title, publishedAt, thumbnails } = video.snippet;
    const publishDate = new Date(publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const thumbnailUrl = isFeatured 
        ? (thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url)
        : (thumbnails.medium?.url || thumbnails.default?.url);
    
    return `
        <div class="video-card">
            <div class="video-embed">
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}" 
                    title="${escapeHtml(title)}"
                    allowfullscreen>
                </iframe>
            </div>
            <div class="video-info">
                <h3 class="video-title">${escapeHtml(title)}</h3>
                <p class="video-date">${publishDate}</p>
            </div>
        </div>
    `;
}

// Fallback videos in case API fails
function renderFallbackVideos(container) {
    if (container.querySelector('#youtube-loading')) {
        container.querySelector('#youtube-loading').remove();
    }
    
    container.innerHTML = `
        <div class="featured-video">
            <div class="video-card">
                <div class="video-embed" style="background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center; height: 300px;">
                    <div style="text-align: center;">
                        <p class="text-secondary">Unable to load videos</p>
                        <a href="https://www.youtube.com/@babjamin" class="btn btn-outline" target="_blank" style="margin-top: var(--space-md);">
                            Visit YouTube Channel
                        </a>
                    </div>
                </div>
                <div class="video-info">
                    <h3 class="video-title">Check out my YouTube channel</h3>
                    <p class="video-date">Latest content available on YouTube</p>
                </div>
            </div>
        </div>
        <div class="video-sidebar">
            <div class="video-card">
                <div class="video-embed" style="background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center; height: 150px;">
                    <p class="text-secondary text-center">More videos<br>on YouTube</p>
                </div>
                <div class="video-info">
                    <h3 class="video-title">Development Updates</h3>
                    <p class="video-date">Regular uploads</p>
                </div>
            </div>
            <div class="video-card">
                <div class="video-embed" style="background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center; height: 150px;">
                    <p class="text-secondary text-center">Project<br>Showcases</p>
                </div>
                <div class="video-info">
                    <h3 class="video-title">Project Walkthroughs</h3>
                    <p class="video-date">Behind the scenes</p>
                </div>
            </div>
        </div>
    `;
}

// Scroll effects for better UX
function initializeScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Fade in animations for cards
    const cards = document.querySelectorAll('.card, .project-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Terminal typing effect
function initializeTypingEffect() {
    const cursor = document.querySelector('.terminal-cursor');
    if (!cursor) return;
    
    // Add some randomness to cursor blinking
    setInterval(() => {
        const shouldBlink = Math.random() > 0.7;
        if (shouldBlink) {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            setTimeout(() => {
                cursor.style.opacity = '1';
            }, 150);
        }
    }, 2000);
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
});

// Progressive loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.style.filter = 'grayscale(100%)';
        });
        
        // Set initial styles
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Contact form enhancement (if present)
function initializeContactForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual logic)
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.style.background = 'var(--accent-green)';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                form.reset();
            }, 2000);
        }, 1000);
    });
}

// Initialize contact form if on contact page
if (window.location.pathname.includes('contact')) {
    document.addEventListener('DOMContentLoaded', initializeContactForm);
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Log page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Track largest contentful paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log(`LCP: ${Math.round(lastEntry.startTime)}ms`);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    });
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    initializePerformanceMonitoring();
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Graceful degradation for critical features
    if (e.error.message.includes('YouTube') || e.error.message.includes('fetch')) {
        const youtubeContent = document.getElementById('youtube-content');
        if (youtubeContent && !youtubeContent.innerHTML.includes('Unable to load')) {
            renderFallbackVideos(youtubeContent);
        }
    }
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadYouTubeVideos,
        renderVideoCard,
        escapeHtml
    };
}