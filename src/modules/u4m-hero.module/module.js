// Handling click event to open the video popup
document.querySelectorAll('.bannerVideo').forEach(function(cardVideo) {
	cardVideo.addEventListener('click', function() {
		var dtPopup = cardVideo.getAttribute('data-popup-id');
		var popupElement = document.getElementById(dtPopup);

		if (popupElement) {
			// Show the popup
			popupElement.style.display = 'flex';

			// Find the video element inside the popup
			var video = popupElement.querySelector('video');
			var iframe = popupElement.querySelector('iframe');

			// Handle regular video autoplay
			if (video) {
				video.setAttribute('autoplay', "autoplay");
				video.play();
			}

			// Handle iframe autoplay (YouTube video)
			if (iframe) {
				// Set the iframe source to autoplay the YouTube video
				var iframeSrc = iframe.getAttribute('data-src');
				iframe.setAttribute('src', iframeSrc + '&autoplay=1');
			}
		}
	});
});

// Handling close button to stop videos or iframes
document.querySelectorAll('.bannerpopVideo .close').forEach(function(closeButton) {
	closeButton.addEventListener('click', function() {
		document.querySelectorAll('.bannerVideoPopup').forEach(function(cardVideoPopup) {
			cardVideoPopup.style.display = 'none';

			// Find and stop regular video
			var video = cardVideoPopup.querySelector('video');
			if (video) {
				video.setAttribute('autoplay', "");
				video.pause();
			}

			// Find and stop iframe video (YouTube)
			var iframe = cardVideoPopup.querySelector('iframe');
			if (iframe) {
				// Remove the iframe src to stop the video
				iframe.setAttribute('src', '');
			}
		});
	});
});
