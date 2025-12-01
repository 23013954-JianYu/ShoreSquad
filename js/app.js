/* ==========================================
   ShoreSquad - JavaScript Application
   Main interactivity, map, weather, and event management
   ========================================== */

// Application State
const app = {
    map: null,
    userLocation: null,
    events: [],
    crew: [],
    currentSection: 'map'
};

// ==========================================
// Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌊 ShoreSquad App Initialized');
    
    initializeMap();
    initializeNavigation();
    initializeEventListeners();
    loadWeather();
    registerServiceWorker();
});

// ==========================================
// Map Initialization (Leaflet.js)
// ==========================================

function initializeMap() {
    try {
        // Initialize map centered on coastal area
        app.map = L.map('map').setView([34.0522, -118.2437], 10); // Default: LA coast
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
            className: 'map-tile'
        }).addTo(app.map);
        
        // Add beach markers
        addBeachMarkers();
        
        // Get user location
        getUserLocation();
        
    } catch (error) {
        console.error('Map initialization error:', error);
        handleError('Map failed to load. Please refresh the page.');
    }
}

function addBeachMarkers() {
    const beaches = [
        { name: 'Sunset Beach', lat: 33.7453, lng: -118.0545, crew: 12 },
        { name: 'Marina Bay', lat: 37.8268, lng: -122.2832, crew: 8 },
        { name: 'Santa Monica Beach', lat: 34.0195, lng: -118.4912, crew: 15 },
        { name: 'Huntington Beach', lat: 33.6603, lng: -117.9992, crew: 10 }
    ];
    
    beaches.forEach(beach => {
        const customIcon = L.divIcon({
            className: 'beach-marker',
            html: `<div class="marker-content">🏖️</div>`,
            iconSize: [40, 40],
            popupAnchor: [0, -20]
        });
        
        L.marker([beach.lat, beach.lng], { icon: customIcon })
            .bindPopup(`
                <div class="popup-content">
                    <h4>${beach.name}</h4>
                    <p>👥 ${beach.crew} crew members</p>
                    <button onclick="joinEvent('${beach.name}')" class="btn-secondary">Join Cleanup</button>
                </div>
            `)
            .addTo(app.map);
    });
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                app.userLocation = { lat: latitude, lng: longitude };
                
                // Add user marker
                L.circleMarker([latitude, longitude], {
                    radius: 8,
                    fillColor: '#0066CC',
                    color: '#FFF',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                })
                .bindPopup('📍 Your Location')
                .addTo(app.map);
                
                // Center map on user
                app.map.setView([latitude, longitude], 12);
                
                console.log('✅ User location obtained:', { latitude, longitude });
            },
            (error) => {
                console.warn('Location access denied:', error);
            }
        );
    }
}

// ==========================================
// Navigation & UI Interaction
// ==========================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menuToggle');
    const navLinksContainer = document.getElementById('navLinks');
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            switchSection(section);
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu
            navLinksContainer.classList.remove('active');
        });
    });
}

function switchSection(sectionName) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = section.id === sectionName ? 'block' : 'none';
    });
    app.currentSection = sectionName;
    
    // Trigger map resize when switching to map section
    if (sectionName === 'map' && app.map) {
        setTimeout(() => app.map.invalidateSize(), 100);
    }
    
    console.log(`📍 Switched to section: ${sectionName}`);
}

function initializeEventListeners() {
    // Location button
    document.getElementById('locationButton')?.addEventListener('click', () => {
        if (app.userLocation && app.map) {
            app.map.setView([app.userLocation.lat, app.userLocation.lng], 13);
            showNotification('📍 Centered on your location!');
        } else {
            showNotification('Location not available. Please enable location services.');
        }
    });
    
    // Search input with debouncing
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // CTA Button
    document.getElementById('startButton')?.addEventListener('click', () => {
        switchSection('map');
        document.querySelector('a[data-section="map"]').classList.add('active');
        showNotification('🌊 Welcome to ShoreSquad! Let\'s find your beach.');
    });
    
    // Create Event Button
    document.getElementById('createEventBtn')?.addEventListener('click', () => {
        showNotification('📅 Event creation coming soon!');
    });
    
    // Event join buttons
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            handleJoinEvent(btn);
        });
    });
}

// ==========================================
// Weather Integration
// ==========================================

function loadWeather() {
    // Simulated weather data (replace with real API call)
    const mockWeatherData = {
        temp: 22,
        wind: 12,
        humidity: 65,
        uv: 6
    };
    
    updateWeatherUI(mockWeatherData);
    
    // In production, use OpenWeatherMap API:
    // fetchWeatherFromAPI(latitude, longitude);
}

function updateWeatherUI(data) {
    document.getElementById('tempValue').textContent = `${data.temp}°C`;
    document.getElementById('windValue').textContent = `${data.wind} km/h`;
    document.getElementById('humidityValue').textContent = `${data.humidity}%`;
    document.getElementById('uvValue').textContent = `${data.uv}`;
}

function fetchWeatherFromAPI(lat, lng) {
    // Example API call structure
    const apiKey = 'YOUR_WEATHER_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateWeatherUI({
                temp: Math.round(data.main.temp),
                wind: Math.round(data.wind.speed * 3.6), // m/s to km/h
                humidity: data.main.humidity,
                uv: 'API limit'
            });
        })
        .catch(error => console.error('Weather API error:', error));
}

// ==========================================
// Event Management
// ==========================================

function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    console.log(`🔍 Searching for: ${query}`);
    
    if (query.length > 2) {
        // Implement beach search/filter logic
        showNotification(`🔍 Searching for beaches matching "${query}"...`);
    }
}

function handleJoinEvent(button) {
    const eventCard = button.closest('.event-card');
    const eventName = eventCard.querySelector('h3').textContent;
    
    button.textContent = '✓ Joined!';
    button.disabled = true;
    button.style.backgroundColor = '#2EAD6C';
    
    showNotification(`🎉 Joined "${eventName}"! Your crew awaits.`);
    
    // Analytics
    trackEvent('join_cleanup', { eventName });
}

function joinEvent(beachName) {
    showNotification(`✅ You've joined the cleanup at ${beachName}!`);
    trackEvent('beach_marker_join', { beach: beachName });
}

// ==========================================
// Utility Functions
// ==========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #0066CC, #1DD3B0);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInUp 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove notification
    setTimeout(() => {
        notification.style.animation = 'slideInUp 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

function handleError(message) {
    console.error('❌ Error:', message);
    showNotification(`⚠️ ${message}`, 5000);
}

function trackEvent(eventName, data = {}) {
    console.log(`📊 Event tracked: ${eventName}`, data);
    // Implement actual analytics integration (Google Analytics, Mixpanel, etc.)
}

// ==========================================
// Performance Optimizations
// ==========================================

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Local storage helpers
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('LocalStorage write error:', error);
    }
}

function getFromLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.error('LocalStorage read error:', error);
        return null;
    }
}

// ==========================================
// Service Worker Registration
// ==========================================

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('✅ Service Worker registered'))
            .catch(error => console.log('Service Worker registration failed:', error));
    }
}

// ==========================================
// Keyboard Accessibility
// ==========================================

document.addEventListener('keydown', (e) => {
    // Escape key closes modals/menus
    if (e.key === 'Escape') {
        document.getElementById('navLinks').classList.remove('active');
    }
    
    // Quick actions
    if (e.key === '/') {
        document.getElementById('searchInput')?.focus();
    }
});

// ==========================================
// Export for testing
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { app, showNotification, trackEvent };
}
