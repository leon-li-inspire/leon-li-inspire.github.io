document.addEventListener('DOMContentLoaded', () => {
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    // Playing: Show music icon
                    updateMusicIcon('music');
                }).catch(error => {
                    console.log("Audio play failed:", error);
                });
            } else {
                bgMusic.pause();
                // Paused: Show mute icon
                updateMusicIcon('volume-mute');
            }
        });
    }

    function updateMusicIcon(iconName) {
        if (!musicToggle) return;
        const icon = musicToggle.querySelector('i');
        if (icon) {
            icon.className = `fas fa-${iconName}`;
        }
    }
});
