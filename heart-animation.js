function startHeartAnimation() {
    const container = document.getElementById('heart-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Make container invisible first
    container.style.opacity = '0';
    container.style.transition = 'opacity 1.5s ease-in-out';
    
    // Wait 1 second, then fade in
    setTimeout(() => {
        container.style.opacity = '1';
    }, 1000);
    
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Responsive sizes
    const mainHeartSize = isMobile ? '120px' : '200px';
    const messageFontSize = isMobile ? '2rem' : '3rem';
    const subFontSize = isMobile ? '1.2rem' : '1.5rem';
    const askFontSize = isMobile ? '1.5rem' : '2rem';
    const gifSize = isMobile ? '150' : '200';
    
    // Main heart
    const mainHeart = document.createElement('div');
    mainHeart.innerHTML = '❤️';
    mainHeart.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: ${mainHeartSize};
        color: #E91E63;
        z-index: 10;
        filter: drop-shadow(0 0 20px rgba(233, 30, 99, 0.5));
        animation: heartbeat 1.5s ease-in-out infinite;
        opacity: 0;
        transition: opacity 1s ease-in-out;
    `;
    container.appendChild(mainHeart);
    
    // Floating hearts - fewer on mobile
    const heartCount = isMobile ? 8 : 12;
    const colors = ['#E91E63', '#EC407A', '#F48FB1', '#F8BBD0'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        const size = isMobile ? Math.random() * 20 + 15 : Math.random() * 30 + 20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5 + 1;
        
        heart.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            color: ${color};
            animation: floatHeart ${duration}s linear infinite ${delay}s;
            z-index: 5;
            opacity: 0;
            transition: opacity 1s ease-in-out ${delay * 0.3}s;
            left: ${Math.random() * 100}vw;
            top: 120%;
        `;
        container.appendChild(heart);
    }
    
    // Message - adjusted positioning for mobile
    const messageTop = isMobile ? '15%' : '20%';
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="font-family: 'Dancing Script', cursive; font-size: ${messageFontSize}; color: #5D4037; text-align: center; padding: 0 20px;">
            I Love You<br>
            <span style="font-size: ${subFontSize}; color: #E91E63;">You make everything better 💚</span>
            <div style="font-size: ${askFontSize}; color: #8B008B; margin-top: 10px;">please go out with me 💜</div>
        </div>
    `;
    message.style.cssText = `
        position: absolute;
        top: ${messageTop};
        left: 50%;
        transform: translateX(-50%);
        z-index: 15;
        opacity: 0;
        transition: opacity 1s ease-in-out 0.5s;
        width: 100%;
        max-width: 90vw;
    `;
    container.appendChild(message);
    
    // =======================
    // 🎁 YOUR GIF GOES HERE!
    // =======================
    const gifContainer = document.createElement('div');
      gifContainer.innerHTML = `

        <img src="heart.gif" width="200" height="200" 
             style="border-radius: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">

    `;
    
    const gifBottom = isMobile ? '30px' : '50px';
    gifContainer.style.cssText = `
        position: absolute;
        bottom: ${gifBottom};
        left: 50%;
        transform: translateX(-50%);
        z-index: 20;
        opacity: 0;
        transition: opacity 1s ease-in-out 1.5s;
    `;
    container.appendChild(gifContainer);
    
    // Staggered fade-in for all elements
    setTimeout(() => {
        mainHeart.style.opacity = '1';
        
        const floatingHearts = container.querySelectorAll('div');
        floatingHearts.forEach((heart, index) => {
            if (heart !== mainHeart && heart !== message && heart !== gifContainer) {
                setTimeout(() => {
                    heart.style.opacity = '0.7';
                }, index * 100);
            }
        });
        
        setTimeout(() => {
            message.style.opacity = '1';
        }, 500);
        
        setTimeout(() => {
            gifContainer.style.opacity = '1';
        }, 1500);
        
    }, 1000);
}

// Handle window resize
window.addEventListener('resize', function() {
    // Optional: Re-initialize on orientation change for mobile
    if (window.innerWidth <= 768) {
        const container = document.getElementById('heart-container');
        if (container) {
            container.innerHTML = '';
            setTimeout(startHeartAnimation, 100);
        }
    }
});

document.addEventListener('DOMContentLoaded', startHeartAnimation);
