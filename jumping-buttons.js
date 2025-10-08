function makeButtonJump(button) {
    let jumpInterval;
    let isJumping = false;
    
    function startJumping() {
        if (isJumping) return;
        isJumping = true;
        
        jumpToRandomPosition(button);
        
        jumpInterval = setInterval(() => {
            jumpToRandomPosition(button);
        }, 1000);
    }
    
    function jumpToRandomPosition(buttonElement) {
        const screen = buttonElement.closest('.screen');
        if (!screen) return;
        
        const screenRect = screen.getBoundingClientRect();
        const buttonRect = buttonElement.getBoundingClientRect();
        
        const maxX = screenRect.width - buttonRect.width - 20;
        const maxY = screenRect.height - buttonRect.height - 20;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        buttonElement.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        buttonElement.style.position = 'absolute';
        buttonElement.style.left = `${randomX}px`;
        buttonElement.style.top = `${randomY}px`;
    }
    
    function stopJumping() {
        isJumping = false;
        if (jumpInterval) clearInterval(jumpInterval);
    }
    
    button.addEventListener('mouseenter', startJumping);
    button.addEventListener('touchstart', startJumping);
    button.addEventListener('mouseleave', stopJumping);
    button.addEventListener('touchend', stopJumping);
    
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        jumpToRandomPosition(button);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const noButtons = document.querySelectorAll('.no-btn');
    noButtons.forEach(button => {
        makeButtonJump(button);
    });
});