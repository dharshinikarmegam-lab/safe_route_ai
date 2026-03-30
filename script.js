document.addEventListener('DOMContentLoaded', () => {
    // ---- DOM Elements ----
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');
    const findRouteBtn = document.getElementById('find-route-btn');
    const sosBtn = document.getElementById('sos-btn');
    const alertToast = document.getElementById('alert-toast');
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // ---- Navigation Logic ----
    function switchView(targetViewId) {
        if (targetViewId === 'login-view') {
            document.body.classList.add('is-auth');
        } else {
            document.body.classList.remove('is-auth');
        }
        // Update Nav Menu
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-target') === targetViewId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update View Display
        views.forEach(view => {
            if (view.id === targetViewId) {
                view.classList.add('active');
                
                // Add minor animation delay for effect
                view.style.opacity = '0';
                setTimeout(() => {
                    view.style.opacity = '1';
                }, 10);

            } else {
                view.classList.remove('active');
            }
        });

        // Close mobile menu if open
        if (navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
        }
    }

    // Attach click events to nav buttons
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            switchView(target);
        });
    });

    // Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // ---- Utility Functions ----
    function showToast(message, iconClass = 'ph-warning-circle') {
        const icon = alertToast.querySelector('i');
        const span = alertToast.querySelector('span');
        
        icon.className = `ph-fill ${iconClass}`;
        span.textContent = message;
        
        alertToast.classList.add('show');
        setTimeout(() => {
            alertToast.classList.remove('show');
        }, 4000);
    }

    // ---- Interactivity Features ----

    // Login Form Submit
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('login-submit-btn');
            
            // Loading state
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Authenticating...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                
                showToast('Login successful', 'ph-check-circle');
                
                // Switch to home view
                setTimeout(() => {
                    switchView('home-view');
                }, 800);
            }, 1000);
        });
    }

    // Home Page -> Find Route Button
    if (findRouteBtn) {
        findRouteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add a small loading simulation effect on the button
            const originalContent = findRouteBtn.innerHTML;
            findRouteBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Analyzing safest route using AI...';
            findRouteBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                findRouteBtn.innerHTML = originalContent;
                findRouteBtn.style.opacity = '1';
                // Switch to Routes view
                switchView('routes-view');
            }, 1200); // Increased slightly for realistic AI effect
        });
    }

    // Share Route Button
    const shareRouteBtn = document.getElementById('share-route-btn');
    if (shareRouteBtn) {
        shareRouteBtn.addEventListener('click', () => {
            showToast('Route shared with trusted contacts', 'ph-share-network');
        });
    }

    // Emergency View -> SOS Button
    if (sosBtn) {
        sosBtn.addEventListener('click', () => {
            
            // Show the Toast
            showToast('Alert sent successfully', 'ph-warning-circle');
            
            // Play a subtle visual vibration effect using DOM mutation 
            document.body.style.border = "4px solid var(--danger-color)";
            
            setTimeout(() => {
                document.body.style.border = "none";
            }, 200);
            
            setTimeout(() => {
                document.body.style.border = "4px solid var(--danger-color)";
            }, 400);

            setTimeout(() => {
                document.body.style.border = "none";
            }, 600);
        });
    }

    // Highlight Routes
    const routeCards = document.querySelectorAll('.route-card');
    routeCards.forEach(card => {
        card.addEventListener('click', () => {
            // Demote others
            routeCards.forEach(c => {
                c.classList.remove('safest-route');
                c.style.border = 'var(--glass-border)';
                c.style.boxShadow = 'none';
                
                const badge = c.querySelector('.safety-score');
                if (badge) badge.classList.replace('high', 'medium-score');
            });
            
            // Promote this one
            card.classList.add('safest-route');
            card.style.border = '2px solid var(--success-color)';
            card.style.boxShadow = '0 0 20px rgba(56, 176, 0, 0.2)';
            
            const badge = card.querySelector('.safety-score');
            if (badge) badge.classList.replace('medium-score', 'high');
            
        });
    });
});
