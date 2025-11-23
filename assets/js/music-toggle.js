document.addEventListener('DOMContentLoaded', () => {
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');

    if (musicToggle && bgMusic) {
        // Restore state from localStorage
        const savedTime = localStorage.getItem('musicTime');
        const savedState = localStorage.getItem('musicState');

        if (savedTime) {
            bgMusic.currentTime = parseFloat(savedTime);
        }

        if (savedState === 'playing') {
            bgMusic.play().then(() => {
                updateMusicIcon('music');
            }).catch(error => {
                console.log("Autoplay blocked or failed:", error);
                updateMusicIcon('volume-mute'); // Fallback
            });
        } else {
            updateMusicIcon('volume-mute');
        }

        // Toggle event listener
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    updateMusicIcon('music');
                    localStorage.setItem('musicState', 'playing');
                }).catch(error => {
                    console.log("Audio play failed:", error);
                });
            } else {
                bgMusic.pause();
                updateMusicIcon('volume-mute');
                localStorage.setItem('musicState', 'paused');
            }
        });

        // Save time periodically
        setInterval(() => {
            if (!bgMusic.paused) {
                localStorage.setItem('musicTime', bgMusic.currentTime);
            }
        }, 1000);

        // Save time on unload
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('musicTime', bgMusic.currentTime);
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
