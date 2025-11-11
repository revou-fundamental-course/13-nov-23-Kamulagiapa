// ===== FILE EXPLORER FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    // Get all folder items
    const folderItems = document.querySelectorAll('.folder-item');
    
    // Add click event to each folder
    folderItems.forEach(folder => {
        const folderHeader = folder.querySelector('.folder-header');
        const folderContent = folder.querySelector('.folder-content');
        const fileItems = folder.querySelectorAll('.file-item');
        
        folderHeader.addEventListener('click', function() {
            // Toggle active class
            const isActive = folder.classList.contains('active');
            
            if (isActive) {
                // Close folder
                folder.classList.remove('active');
                
                // Reset file animations
                fileItems.forEach(file => {
                    file.style.animation = 'none';
                });
            } else {
                // Close all other folders first
                folderItems.forEach(otherFolder => {
                    if (otherFolder !== folder) {
                        otherFolder.classList.remove('active');
                        const otherFiles = otherFolder.querySelectorAll('.file-item');
                        otherFiles.forEach(file => {
                            file.style.animation = 'none';
                        });
                    }
                });
                
                // Open clicked folder
                folder.classList.add('active');
                
                // Trigger file animations
                setTimeout(() => {
                    fileItems.forEach(file => {
                        file.style.animation = 'slideInFile 0.5s ease forwards';
                    });
                }, 50);
            }
            
            // Add ripple effect
            createRipple(folderHeader, event);
        });
        
        // Add hover sound effect (visual feedback)
        folderHeader.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        folderHeader.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click event to file items
    const allFileItems = document.querySelectorAll('.file-item');
    allFileItems.forEach(file => {
        file.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Add selected effect
            allFileItems.forEach(f => f.classList.remove('selected'));
            this.classList.add('selected');
            
            // Show file info (you can customize this)
            const fileName = this.querySelector('.file-name').textContent;
            const fileSize = this.querySelector('.file-size').textContent;
            
            // Create notification
            showNotification(`File dipilih: ${fileName} (${fileSize})`);
            
            // Add pulse effect
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 0.5s ease';
            }, 10);
        });
    });
    
    // Ripple effect function
    function createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Notification function
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeFolders = document.querySelectorAll('.folder-item.active');
        
        // Press 'Escape' to close all folders
        if (e.key === 'Escape') {
            folderItems.forEach(folder => {
                folder.classList.remove('active');
            });
        }
        
        // Press 'Enter' to toggle first folder
        if (e.key === 'Enter' && activeFolders.length === 0) {
            folderItems[0].querySelector('.folder-header').click();
        }
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    folderItems.forEach(folder => {
        folder.style.opacity = '0';
        folder.style.transform = 'translateY(20px)';
        folder.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(folder);
    });
    
    // Add dynamic background particles
    createParticles();
    
    function createParticles() {
        const particleCount = 20;
        const container = document.querySelector('.container');
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            container.appendChild(particle);
        }
    }
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Console welcome message
    console.log('%c🎉 File Explorer Loaded Successfully! 🎉', 
        'color: #667eea; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
    console.log('%cKlik folder untuk melihat isinya!', 
        'color: #764ba2; font-size: 14px; font-style: italic;');
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        opacity: 0;
        transform: translateX(400px);
        transition: all 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    }
    
    .notification.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .file-item.selected {
        background: linear-gradient(90deg, #e8f0ff 0%, #d0e4ff 100%);
        border-left: 4px solid #667eea;
    }
    
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: float-particle 15s infinite ease-in-out;
    }
    
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(100px, -100px) scale(1.5);
        }
    }
    
    body.loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(style);
