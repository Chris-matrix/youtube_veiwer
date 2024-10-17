document.addEventListener('DOMContentLoaded', () => {
    // Get references to important DOM elements
    const imageContainer = document.querySelector('main');
  
    // Sample image data - in a real application, this would likely come from a server
    const images = [
      { id: 1, url: 'https://i.makeagif.com/media/3-26-2015/6cdUye.gif', caption: '', liked: false, hidden: false },
      { id: 2, url: 'https://i.pinimg.com/originals/15/17/ed/1517ed1d264c3c7dbb2937b923066f05.gif', caption: '', liked: false, hidden: false },
      { id: 3, url: 'https://i.pinimg.com/originals/a8/96/c4/a896c49a2c4ee27d9349f38ba662aab9.gif', caption: '', liked: false, hidden: false },
    ];
  
    // Function to update existing images and add action buttons
    function updateImages() {
      images.forEach((image, index) => {
        const figure = document.getElementById(`image${index + 1}`);
        if (figure) {
          // Update image source and alt text
          const img = figure.querySelector('img');
          img.src = image.url;
          img.alt = image.caption;
  
          // Add image actions if they don't exist
          if (!figure.querySelector('.image-actions')) {
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'image-actions';
            actionsDiv.innerHTML = `
              <button class="like-btn" data-id="${image.id}">${image.liked ? 'Unlike' : 'Like'}</button>
              <button class="hide-btn" data-id="${image.id}">Hide</button>
              <button class="share-btn" data-id="${image.id}">Share</button>
            `;
            figure.appendChild(actionsDiv);
          }
  
          // Show or hide the image based on its 'hidden' status
          figure.style.display = image.hidden ? 'none' : 'block';
        }
      });
    }
  
    // Event delegation for image actions (like, hide, share)
    imageContainer.addEventListener('click', (e) => {
      const actionButton = e.target.closest('.like-btn, .hide-btn, .share-btn');
      if (!actionButton) return;
  
      const imageId = parseInt(actionButton.dataset.id);
      const image = images.find(img => img.id === imageId);
  
      if (!image) {
        console.error(`Image with id ${imageId} not found`);
        return;
      }
  
      switch (actionButton.classList[0]) {
        case 'like-btn':
          image.liked = !image.liked;
          actionButton.textContent = image.liked ? 'Unlike' : 'Like';
          break;
        case 'hide-btn':
          image.hidden = true;
          updateImages();
          break;
        case 'share-btn':
          // Placeholder for share functionality
          alert(`Sharing image ${imageId}`);
          break;
        default:
          console.error('Unknown action button clicked');
      }
    });
  
    // Call updateImages to initially display the images
    updateImages();
  });
