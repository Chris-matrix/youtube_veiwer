// Combined script.js

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'AIzaSyB1J9-HJ3LrAlGmayCqNmlekmdRFxhsEZQ';
    const mainVideoId = '6QjSwIo0fXw';
    const categories = {
        'Category 1': ['fh4C2FcfHpA', 'YbKsQt5aB4E', 'jhsj2mkIxbc'],
        'Category 2': ['vb4OvBegKfY', 'nE8u0Pr3xRo']
    };

    // YouTube Video Viewer Functions
    function loadMainVideo(videoId) {
        const iframe = document.getElementById('main-youtube-video');
        iframe.src = `https://www.youtube.com/embed/${videoId}`;

        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const videoInfo = data.items[0].snippet;
                const contentDetails = data.items[0].contentDetails;
                document.getElementById('main-video-title').textContent = videoInfo.title;
                document.getElementById('main-video-description').textContent = videoInfo.description;
                document.getElementById('main-video-watch-time').textContent = `Duration: ${formatDuration(contentDetails.duration)}`;
            })
            .catch(error => {
                console.error('Error fetching video information:', error);
                document.getElementById('main-video-title').textContent = 'Video information unavailable';
                document.getElementById('main-video-description').textContent = 'Unable to load video description.';
                document.getElementById('main-video-watch-time').textContent = '';
            });
    }

    function loadRelatedVideos(videoIds) {
        const container = document.getElementById('video-list-container');
        container.innerHTML = '';

        videoIds.forEach(videoId => {
            fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    const videoInfo = data.items[0].snippet;
                    const contentDetails = data.items[0].contentDetails;
                    const videoElement = createVideoElement(videoId, videoInfo, contentDetails);
                    container.appendChild(videoElement);
                })
                .catch(error => console.error('Error fetching related video information:', error));
        });
    }

    function createVideoElement(videoId, videoInfo, contentDetails) {
        const videoElement = document.createElement('div');
        videoElement.className = 'video-list-item';
        videoElement.innerHTML = `
            <img src="${videoInfo.thumbnails.medium.url}" alt="${videoInfo.title}">
            <div class="video-list-item-info">
                <h4>${videoInfo.title}</h4>
                <p>Duration: ${formatDuration(contentDetails.duration)}</p>
            </div>
        `;
        videoElement.addEventListener('click', () => loadMainVideo(videoId));
        return videoElement;
    }

    function formatDuration(duration) {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = (parseInt(match[1]) || 0);
        const minutes = (parseInt(match[2]) || 0);
        const seconds = (parseInt(match[3]) || 0);
        return `${hours ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function createCategoryButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'category-buttons';
        Object.keys(categories).forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.addEventListener('click', () => loadRelatedVideos(categories[category]));
            buttonContainer.appendChild(button);
        });
        document.querySelector('.video-list').insertBefore(buttonContainer, document.getElementById('video-list-container'));
    }

    // Profile Functions
    function loadProfile() {
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        const theme = localStorage.getItem('theme');
        
        if (username && email) {
            document.getElementById('displayUsername').textContent = username;
            document.getElementById('displayEmail').textContent = email;
            document.getElementById('displayTheme').textContent = theme || 'light';
            
            // Pre-fill the form
            document.getElementById('username').value = username;
            document.getElementById('email').value = email;
            document.querySelector(`input[name="theme"][value="${theme || 'light'}"]`).checked = true;
        }
    }

    function saveProfile(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const theme = document.querySelector('input[name="theme"]:checked').value;
        
        if (username.length < 4) {
            alert('Username must be at least 4 characters long');
            return;
        }
        
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('theme', theme);
        
        loadProfile();
        applyTheme(theme);
        alert('Profile updated successfully!');
    }

    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        const themeToggleButton = document.getElementById('theme-toggle-button');
        themeToggleButton.textContent = theme === 'dark' ? '🌙' : '🌞';
        themeToggleButton.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }

    // Theme toggle functionality
    window.toggleTheme = function() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Navigation Functions
    function showHome() {
        document.getElementById('home').style.display = 'block';
        document.getElementById('profile').style.display = 'none';
    }

    function showProfile() {
        document.getElementById('home').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
        loadProfile(); // Reload profile data when showing the profile
    }

    // Initial load
    loadMainVideo(mainVideoId);
    createCategoryButtons();
    loadRelatedVideos(categories['Category 1']); // Load the first category by default
    applyTheme(localStorage.getItem('theme') || 'light');
    showHome(); // Start on the home page

    // Event Listeners
    document.getElementById('profileForm').addEventListener('submit', saveProfile);
    document.getElementById('homeLink').addEventListener('click', function(e) {
        e.preventDefault();
        showHome();
    });
    document.getElementById('profileLink').addEventListener('click', function(e) {
        e.preventDefault();
        showProfile();
    });
});