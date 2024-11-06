// script.js

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'AIzaSyB1J9-HJ3LrAlGmayCqNmlekmdRFxhsEZQ';
    const mainVideoId = '6QjSwIo0fXw';
    const categories = {
        'Category 1': ['fh4C2FcfHpA', 'YbKsQt5aB4E', 'jhsj2mkIxbc'],
        'Category 2': ['vb4OvBegKfY', 'nE8u0Pr3xRo']
    };

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

    // Theme toggle functionality
    window.toggleTheme = function() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);

        const themeToggleButton = document.getElementById('theme-toggle-button');
        themeToggleButton.textContent = newTheme === 'dark' ? '🌙' : '🌞';
        themeToggleButton.setAttribute('title', `Switch to ${currentTheme} theme`);
    }

    // Initial load
    loadMainVideo(mainVideoId);
    createCategoryButtons();
    loadRelatedVideos(categories['Category 1']); // Load the first category by default
});