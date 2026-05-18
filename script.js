/* ============================================
   STACKLY E-LEARNING PLATFORM
   Unified Native JavaScript Logic
   ============================================ */

(function() {
    'use strict';

    /* ============================================
       SECTION 1: STAGE LOADER
       ============================================ */
    
    const Loader = {
        init: function() {
            const loader = document.getElementById('stage-loader');
            if (!loader) return;
            
            // Hard 2-second timeout cap as per requirements
            const loaderTimeout = 1900;
            
            window.addEventListener('load', function() {
                setTimeout(function() {
                    loader.classList.add('loader-hidden');
                    setTimeout(function() {
                        loader.style.display = 'none';
                    }, 500);
                }, loaderTimeout);
            });
            
            // Fallback: always hide loader even if load event fails
            setTimeout(function() {
                if (loader && !loader.classList.contains('loader-hidden')) {
                    loader.classList.add('loader-hidden');
                    setTimeout(function() {
                        loader.style.display = 'none';
                    }, 500);
                }
            }, 2100);
        }
    };

    /* ============================================
       SECTION 2: MOBILE HAMBURGER MENU
       ============================================ */
    
    const MobileMenu = {
        init: function() {
            const hamburgerBtn = document.querySelector('.hamburger-btn');
            const mobileOverlay = document.querySelector('.mobile-menu-overlay');
            const closeBtn = document.querySelector('.mobile-close-btn');
            
            if (!hamburgerBtn || !mobileOverlay) return;
            
            function openMenu() {
                mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                hamburgerBtn.setAttribute('aria-expanded', 'true');
            }
            
            function closeMenu() {
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
            
            hamburgerBtn.addEventListener('click', openMenu);
            if (closeBtn) closeBtn.addEventListener('click', closeMenu);
            
            // Close on overlay click (outside menu content)
            mobileOverlay.addEventListener('click', function(e) {
                if (e.target === mobileOverlay) closeMenu();
            });
            
            // Close on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
                    closeMenu();
                }
            });
            
            // Close menu when clicking any nav link
            const mobileLinks = mobileOverlay.querySelectorAll('a');
            mobileLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    closeMenu();
                });
            });
        }
    };

    /* ============================================
       SECTION 3: NAVBAR DROPDOWN MENUS
       ============================================ */
    
    const DropdownMenus = {
        init: function() {
            const dropdownParents = document.querySelectorAll('.has-dropdown');
            
            dropdownParents.forEach(function(parent) {
                const link = parent.querySelector('.nav-link');
                const menu = parent.querySelector('.dropdown-menu');
                
                if (!link || !menu) return;
                
                // Hover for desktop
                parent.addEventListener('mouseenter', function() {
                    if (window.innerWidth >= 1024) {
                        menu.style.opacity = '1';
                        menu.style.visibility = 'visible';
                        menu.style.transform = 'translateY(0)';
                    }
                });
                
                parent.addEventListener('mouseleave', function() {
                    if (window.innerWidth >= 1024) {
                        menu.style.opacity = '0';
                        menu.style.visibility = 'hidden';
                        menu.style.transform = 'translateY(-10px)';
                    }
                });
                
                // Click for touch devices
                link.addEventListener('click', function(e) {
                    if (window.innerWidth < 1024) {
                        e.preventDefault();
                        const isOpen = menu.style.display === 'block';
                        // Close all other dropdowns
                        document.querySelectorAll('.dropdown-menu').forEach(function(m) {
                            m.style.display = 'none';
                        });
                        menu.style.display = isOpen ? 'none' : 'block';
                    }
                });
            });
            
            // Close dropdowns when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.has-dropdown')) {
                    document.querySelectorAll('.dropdown-menu').forEach(function(m) {
                        if (window.innerWidth < 1024) {
                            m.style.display = 'none';
                        }
                    });
                }
            });
        }
    };

    /* ============================================
       SECTION 4: STICKY NAVBAR
       ============================================ */
    
    const StickyNav = {
        init: function() {
            const header = document.querySelector('.main-header');
            if (!header) return;
            
            let lastScroll = 0;
            
            window.addEventListener('scroll', function() {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                lastScroll = currentScroll;
            });
        }
    };

    /* ============================================
       SECTION 5: SCROLL REVEAL ANIMATIONS
       (Intersection Observer API)
       ============================================ */
    
    const ScrollReveal = {
        init: function() {
            const revealElements = document.querySelectorAll('.section-reveal');
            
            if (!('IntersectionObserver' in window)) {
                // Fallback for older browsers
                revealElements.forEach(function(el) {
                    el.classList.add('revealed');
                });
                return;
            }
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            revealElements.forEach(function(el) {
                observer.observe(el);
            });
        }
    };

    /* ============================================
       SECTION 6: HERO PARALLAX & 3D TILT EFFECTS
       ============================================ */
    
    const HeroEffects = {
        init: function() {
            this.initParallax();
            this.initTilt();
            this.initParticles();
        },
        
        initParallax: function() {
            const heroSection = document.querySelector('.hero-section');
            if (!heroSection) return;
            
            const layers = heroSection.querySelectorAll('.hero-bg-layer');
            
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;
                
                layers.forEach(function(layer, index) {
                    const speed = (index + 1) * 0.2;
                    layer.style.transform = 'translateY(' + (rate * speed) + 'px)';
                });
            });
        },
        
        initTilt: function() {
            const tiltElement = document.getElementById('hero-tilt');
            if (!tiltElement) return;
            
            // Skip on touch devices
            if (window.matchMedia('(pointer: coarse)').matches) return;
            
            heroSection = document.querySelector('.hero-section');
            if (!heroSection) return;
            
            heroSection.addEventListener('mousemove', function(e) {
                const rect = tiltElement.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                
                tiltElement.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
            });
            
            heroSection.addEventListener('mouseleave', function() {
                tiltElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        },
        
        initParticles: function() {
            const particlesContainer = document.getElementById('hero-particles');
            if (!particlesContainer) return;
            
            // Create SVG particles
            const particleCount = 25;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.width = (Math.random() * 4 + 2) + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
                particlesContainer.appendChild(particle);
            }
        }
    };

    /* ============================================
       SECTION 7: CARD TILT EFFECTS (3D)
       ============================================ */
    
    const CardTilt = {
        init: function() {
            const cards = document.querySelectorAll('[data-tilt]');
            
            if (window.matchMedia('(pointer: coarse)').matches) return;
            
            cards.forEach(function(card) {
                card.addEventListener('mousemove', function(e) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = ((y - centerY) / centerY) * -8;
                    const rotateY = ((x - centerX) / centerX) * 8;
                    
                    card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(10px)';
                });
                
                card.addEventListener('mouseleave', function() {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                });
            });
        }
    };

    /* ============================================
       SECTION 8: FORM VALIDATION
       ============================================ */
    
    const FormValidation = {
        init: function() {
            this.initContactForm();
            this.initLoginForm();
            this.initSignupForm();
        },
        
        showError: function(input, errorId, message) {
            const errorEl = document.getElementById(errorId);
            if (errorEl) {
                errorEl.textContent = message || 'Please fill this field';
                errorEl.style.display = 'block';
            }
            input.classList.add('input-error');
        },
        
        hideError: function(input, errorId) {
            const errorEl = document.getElementById(errorId);
            if (errorEl) {
                errorEl.style.display = 'none';
            }
            input.classList.remove('input-error');
        },
        
        validateEmail: function(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        
        validatePhone: function(phone) {
            const re = /^[+]?[\d\s-]{10,}$/;
            return re.test(phone);
        },
        
        initContactForm: function() {
            const form = document.getElementById('contact-form');
            if (!form) return;
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                
                const name = document.getElementById('contact-name');
                const email = document.getElementById('contact-email');
                const subject = document.getElementById('contact-subject');
                const message = document.getElementById('contact-message');
                
                // Name validation
                if (!name || !name.value.trim()) {
                    if (name) FormValidation.showError(name, 'error-name');
                    isValid = false;
                } else {
                    if (name) FormValidation.hideError(name, 'error-name');
                }
                
                // Email validation
                if (!email || !email.value.trim()) {
                    if (email) FormValidation.showError(email, 'error-email');
                    isValid = false;
                } else if (!FormValidation.validateEmail(email.value)) {
                    if (email) FormValidation.showError(email, 'error-email', 'Please enter a valid email address');
                    isValid = false;
                } else {
                    if (email) FormValidation.hideError(email, 'error-email');
                }
                
                // Subject validation
                if (!subject || !subject.value) {
                    if (subject) FormValidation.showError(subject, 'error-subject');
                    isValid = false;
                } else {
                    if (subject) FormValidation.hideError(subject, 'error-subject');
                }
                
                // Message validation
                if (!message || !message.value.trim()) {
                    if (message) FormValidation.showError(message, 'error-message');
                    isValid = false;
                } else {
                    if (message) FormValidation.hideError(message, 'error-message');
                }
                
                if (isValid) {
                    // Show success message
                    alert('Thank you for your message! We will get back to you within 24 hours.');
                    form.reset();
                }
            });
            
            // Real-time validation on input
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(function(input) {
                input.addEventListener('input', function() {
                    const errorId = 'error-' + input.id.replace('contact-', '');
                    FormValidation.hideError(input, errorId);
                });
            });
        },
        
        initLoginForm: function() {
            const form = document.getElementById('login-form');
            if (!form) return;
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('login-email');
                const password = document.getElementById('login-password');
                
                let isValid = true;
                
                // Email validation
                if (!email || !email.value.trim()) {
                    if (email) FormValidation.showError(email, 'error-login-email');
                    isValid = false;
                } else if (!FormValidation.validateEmail(email.value)) {
                    if (email) FormValidation.showError(email, 'error-login-email', 'Please enter a valid email address');
                    isValid = false;
                } else {
                    if (email) FormValidation.hideError(email, 'error-login-email');
                }
                
                // Password validation
                if (!password || !password.value.trim()) {
                    if (password) FormValidation.showError(password, 'error-login-password');
                    isValid = false;
                } else if (password.value.length < 6) {
                    if (password) FormValidation.showError(password, 'error-login-password', 'Password must be at least 6 characters');
                    isValid = false;
                } else {
                    if (password) FormValidation.hideError(password, 'error-login-password');
                }
                
                if (isValid) {
                    // Store email in sessionStorage and redirect
                    sessionStorage.setItem('stacklyUserEmail', email.value);
                    window.location.href = 'dashboard.html';
                }
            });
            
            // Real-time validation
            const inputs = form.querySelectorAll('input');
            inputs.forEach(function(input) {
                input.addEventListener('input', function() {
                    const errorId = 'error-' + input.id;
                    FormValidation.hideError(input, errorId);
                });
            });
            
            // Password toggle
            const toggleBtn = document.getElementById('password-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', function() {
                    const passwordInput = document.getElementById('login-password');
                    if (passwordInput) {
                        const type = passwordInput.type === 'password' ? 'text' : 'password';
                        passwordInput.type = type;
                        toggleBtn.textContent = type === 'password' ? '👁️' : '🙈';
                    }
                });
            }
        },
        
        initSignupForm: function() {
            const form = document.getElementById('signup-form');
            if (!form) return;
            
            // Password strength meter
            const passwordInput = document.getElementById('signup-password');
            const strengthBar = document.querySelector('.strength-fill');
            const strengthText = document.querySelector('.strength-text');
            
            if (passwordInput && strengthBar) {
                passwordInput.addEventListener('input', function() {
                    const val = passwordInput.value;
                    let strength = 0;
                    
                    if (val.length >= 8) strength += 25;
                    if (val.match(/[a-z]/) && val.match(/[A-Z]/)) strength += 25;
                    if (val.match(/[0-9]/)) strength += 25;
                    if (val.match(/[^a-zA-Z0-9]/)) strength += 25;
                    
                    strengthBar.style.width = strength + '%';
                    
                    if (strength <= 25) {
                        strengthBar.style.background = '#e74c3c';
                        if (strengthText) strengthText.textContent = 'Weak';
                    } else if (strength <= 50) {
                        strengthBar.style.background = '#f39c12';
                        if (strengthText) strengthText.textContent = 'Fair';
                    } else if (strength <= 75) {
                        strengthBar.style.background = '#3498db';
                        if (strengthText) strengthText.textContent = 'Good';
                    } else {
                        strengthBar.style.background = '#64ffda';
                        if (strengthText) strengthText.textContent = 'Strong';
                    }
                });
            }
            
            // Password toggle
            const toggleBtn = document.getElementById('signup-password-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', function() {
                    if (passwordInput) {
                        const type = passwordInput.type === 'password' ? 'text' : 'password';
                        passwordInput.type = type;
                        toggleBtn.textContent = type === 'password' ? '👁️' : '🙈';
                    }
                });
            }
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                
                const firstname = document.getElementById('signup-firstname');
                const lastname = document.getElementById('signup-lastname');
                const email = document.getElementById('signup-email');
                const password = document.getElementById('signup-password');
                const confirm = document.getElementById('signup-confirm');
                const terms = document.querySelector('input[name="terms"]');
                
                // First name
                if (!firstname || !firstname.value.trim()) {
                    if (firstname) FormValidation.showError(firstname, 'error-signup-firstname');
                    isValid = false;
                } else {
                    if (firstname) FormValidation.hideError(firstname, 'error-signup-firstname');
                }
                
                // Last name
                if (!lastname || !lastname.value.trim()) {
                    if (lastname) FormValidation.showError(lastname, 'error-signup-lastname');
                    isValid = false;
                } else {
                    if (lastname) FormValidation.hideError(lastname, 'error-signup-lastname');
                }
                
                // Email
                if (!email || !email.value.trim()) {
                    if (email) FormValidation.showError(email, 'error-signup-email');
                    isValid = false;
                } else if (!FormValidation.validateEmail(email.value)) {
                    if (email) FormValidation.showError(email, 'error-signup-email', 'Please enter a valid email address');
                    isValid = false;
                } else {
                    if (email) FormValidation.hideError(email, 'error-signup-email');
                }
                
                // Password
                if (!password || !password.value.trim()) {
                    if (password) FormValidation.showError(password, 'error-signup-password');
                    isValid = false;
                } else if (password.value.length < 8) {
                    if (password) FormValidation.showError(password, 'error-signup-password', 'Password must be at least 8 characters');
                    isValid = false;
                } else {
                    if (password) FormValidation.hideError(password, 'error-signup-password');
                }
                
                // Confirm password
                if (!confirm || !confirm.value.trim()) {
                    if (confirm) FormValidation.showError(confirm, 'error-signup-confirm');
                    isValid = false;
                } else if (password && confirm.value !== password.value) {
                    if (confirm) FormValidation.showError(confirm, 'error-signup-confirm', 'Passwords do not match');
                    isValid = false;
                } else {
                    if (confirm) FormValidation.hideError(confirm, 'error-signup-confirm');
                }
                
                // Terms
                if (terms && !terms.checked) {
                    FormValidation.showError(terms, 'error-signup-terms', 'You must agree to the terms');
                    isValid = false;
                } else {
                    if (terms) FormValidation.hideError(terms, 'error-signup-terms');
                }
                
                if (isValid) {
                    sessionStorage.setItem('stacklyUserEmail', email.value);
                    alert('Account created successfully! Welcome to Stackly.');
                    window.location.href = 'dashboard.html';
                }
            });
            
            // Real-time validation
            const inputs = form.querySelectorAll('input');
            inputs.forEach(function(input) {
                input.addEventListener('input', function() {
                    const errorId = 'error-' + input.id;
                    FormValidation.hideError(input, errorId);
                });
            });
        }
    };

    /* ============================================
       SECTION 9: DASHBOARD LOGIC
       ============================================ */
    
    const Dashboard = {
        init: function() {
            this.loadUserData();
            this.initSidebar();
            this.initPanelSwitching();
            this.initSidebarToggle();
            this.initLogout();
        },
        
        loadUserData: function() {
            const userEmail = sessionStorage.getItem('stacklyUserEmail');
            const welcomeEmail = document.getElementById('welcome-email');
            const userEmailEl = document.getElementById('user-email');
            const profileEmail = document.getElementById('profile-email');
            const profileEmailInput = document.getElementById('profile-email-input');
            const profileName = document.getElementById('profile-name');
            const userName = document.getElementById('user-name');
            
            if (userEmail) {
                if (welcomeEmail) welcomeEmail.textContent = userEmail;
                if (userEmailEl) userEmailEl.textContent = userEmail;
                if (profileEmail) profileEmail.textContent = userEmail;
                if (profileEmailInput) profileEmailInput.value = userEmail;
                
                // Extract name from email for display
                const nameFromEmail = userEmail.split('@')[0];
                const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
                
                if (profileName) profileName.textContent = formattedName;
                if (userName) userName.textContent = formattedName;
                
                // Update welcome title
                const welcomeTitle = document.querySelector('.welcome-title');
                if (welcomeTitle) {
                    welcomeTitle.textContent = 'Welcome Back, ' + formattedName + '!';
                }
            } else {
                // Not logged in - redirect to login
                if (document.querySelector('.dashboard-page')) {
                    window.location.href = 'login.html';
                }
            }
        },
        
        initSidebar: function() {
            const sidebar = document.getElementById('dashboard-sidebar');
            if (!sidebar) return;
            
            // Mark active sidebar link based on URL hash or default
            const hash = window.location.hash || '#overview';
            this.setActiveSidebarLink(hash.replace('#', ''));
        },
        
        setActiveSidebarLink: function(panelId) {
            const links = document.querySelectorAll('.sidebar-link[data-panel]');
            links.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('data-panel') === panelId) {
                    link.classList.add('active');
                }
            });
        },
        
        initPanelSwitching: function() {
            const sidebarLinks = document.querySelectorAll('.sidebar-link[data-panel]');
            const panels = document.querySelectorAll('.dashboard-panel');
            
            if (!sidebarLinks.length || !panels.length) return;
            
            sidebarLinks.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetPanel = this.getAttribute('data-panel');
                    
                    // Update active sidebar link
                    sidebarLinks.forEach(function(l) { l.classList.remove('active'); });
                    this.classList.add('active');
                    
                    // Switch panels with animation
                    panels.forEach(function(panel) {
                        if (panel.id === 'panel-' + targetPanel) {
                            panel.classList.add('active');
                            panel.style.opacity = '0';
                            panel.style.transform = 'translateY(20px)';
                            setTimeout(function() {
                                panel.style.opacity = '1';
                                panel.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            panel.classList.remove('active');
                        }
                    });
                    
                    // Update URL hash without scrolling
                    history.pushState(null, null, '#' + targetPanel);
                    
                    // On mobile, close sidebar after selection
                    if (window.innerWidth < 1024) {
                        const sidebar = document.getElementById('dashboard-sidebar');
                        if (sidebar) sidebar.classList.remove('active');
                    }
                });
            });
            
            // Handle browser back/forward
            window.addEventListener('popstate', function() {
                const hash = window.location.hash.replace('#', '') || 'overview';
                Dashboard.setActiveSidebarLink(hash);
                
                panels.forEach(function(panel) {
                    panel.classList.toggle('active', panel.id === 'panel-' + hash);
                });
            });
        },
        
        initSidebarToggle: function() {
            const toggleBtn = document.getElementById('sidebar-toggle');
            const sidebar = document.getElementById('dashboard-sidebar');
            const closeBtn = document.getElementById('sidebar-close');
            
            if (toggleBtn && sidebar) {
                toggleBtn.addEventListener('click', function() {
                    sidebar.classList.toggle('active');
                });
            }
            
            if (closeBtn && sidebar) {
                closeBtn.addEventListener('click', function() {
                    sidebar.classList.remove('active');
                });
            }
        },
        
        initLogout: function() {
            const logoutBtn = document.getElementById('logout-btn');
            const headerLogout = document.getElementById('header-logout');
            
            function doLogout() {
                sessionStorage.removeItem('stacklyUserEmail');
                window.location.href = 'index.html';
            }
            
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    doLogout();
                });
            }
            
            if (headerLogout) {
                headerLogout.addEventListener('click', function(e) {
                    e.preventDefault();
                    doLogout();
                });
            }
        }
    };

    /* ============================================
       SECTION 10: COURSE FILTERING
       ============================================ */
    
    const CourseFilter = {
        init: function() {
            this.initCategoryFilter();
            this.initLevelFilter();
            this.initSearch();
            this.initPricingToggle();
        },
        
        initCategoryFilter: function() {
            const categoryCards = document.querySelectorAll('.category-card');
            const courseCards = document.querySelectorAll('.course-card');
            
            if (!categoryCards.length) return;
            
            categoryCards.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    // Update active state
                    categoryCards.forEach(function(b) { b.classList.remove('active'); });
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    courseCards.forEach(function(card) {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = '';
                            setTimeout(function() {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.9)';
                            setTimeout(function() {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        },
        
        initLevelFilter: function() {
            const filterTags = document.querySelectorAll('.filter-tag');
            const courseCards = document.querySelectorAll('.course-card');
            
            if (!filterTags.length) return;
            
            filterTags.forEach(function(tag) {
                tag.addEventListener('click', function() {
                    filterTags.forEach(function(t) { t.classList.remove('active'); });
                    this.classList.add('active');
                    
                    const level = this.textContent.toLowerCase();
                    
                    courseCards.forEach(function(card) {
                        const cardLevel = card.getAttribute('data-level');
                        if (level === 'all levels' || cardLevel === level) {
                            card.style.display = '';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        },
        
        initSearch: function() {
            const searchInput = document.getElementById('course-search');
            const courseCards = document.querySelectorAll('.course-card');
            
            if (!searchInput) return;
            
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                
                courseCards.forEach(function(card) {
                    const title = card.querySelector('.course-title');
                    const desc = card.querySelector('.course-desc');
                    const category = card.querySelector('.course-category-tag');
                    
                    const text = (title ? title.textContent : '') + ' ' + 
                                (desc ? desc.textContent : '') + ' ' + 
                                (category ? category.textContent : '');
                    
                    if (text.toLowerCase().includes(query)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        },
        
        initPricingToggle: function() {
            const toggle = document.getElementById('pricing-toggle');
            const amounts = document.querySelectorAll('.amount');
            
            if (!toggle) return;
            
            toggle.addEventListener('change', function() {
                const isYearly = this.checked;
                
                amounts.forEach(function(el) {
                    const monthly = el.getAttribute('data-monthly');
                    const yearly = el.getAttribute('data-yearly');
                    
                    if (monthly && yearly) {
                        el.textContent = isYearly ? yearly : monthly;
                    }
                });
                
                // Update period text
                const periods = document.querySelectorAll('.period');
                periods.forEach(function(p) {
                    p.textContent = isYearly ? '/year' : '/month';
                });
            });
        }
    };

    /* ============================================
       SECTION 11: FAQ ACCORDION
       ============================================ */
    
    const FAQAccordion = {
        init: function() {
            const questions = document.querySelectorAll('.faq-question');
            
            questions.forEach(function(q) {
                q.addEventListener('click', function() {
                    const isOpen = this.getAttribute('aria-expanded') === 'true';
                    
                    // Close all others
                    questions.forEach(function(other) {
                        other.setAttribute('aria-expanded', 'false');
                        const answer = other.nextElementSibling;
                        if (answer) answer.style.maxHeight = null;
                    });
                    
                    // Toggle current
                    this.setAttribute('aria-expanded', !isOpen);
                    const answer = this.nextElementSibling;
                    if (answer && !isOpen) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                });
            });
        }
    };

    /* ============================================
       SECTION 12: FALLBACK ROUTING (404)
       ============================================ */
    
    const FallbackRouting = {
        init: function() {
            // Intercept clicks on buttons/links without valid hrefs
            document.addEventListener('click', function(e) {
                const target = e.target.closest('a, button');
                if (!target) return;
                
                // Check if it's a button or link with # href or javascript:void
                const href = target.getAttribute('href');
                
                if (target.tagName === 'BUTTON' && !target.type && !target.closest('form')) {
                    // Orphan button - route to 404
                    e.preventDefault();
                    window.location.href = '404.html';
                    return;
                }
                
                if (href === '#' || href === 'javascript:void(0)' || href === 'javascript:void(0);') {
                    e.preventDefault();
                    window.location.href = '404.html';
                }
            });
        }
    };

    /* ============================================
       SECTION 13: SMOOTH SCROLL
       ============================================ */
    
    const SmoothScroll = {
        init: function() {
            document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    /* ============================================
       SECTION 14: REDUCED MOTION RESPECT
       ============================================ */
    
    const Accessibility = {
        init: function() {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
            
            function handleMotionPreference() {
                if (prefersReducedMotion.matches) {
                    document.documentElement.classList.add('reduce-motion');
                } else {
                    document.documentElement.classList.remove('reduce-motion');
                }
            }
            
            handleMotionPreference();
            prefersReducedMotion.addEventListener('change', handleMotionPreference);
        }
    };

    /* ============================================
       INITIALIZATION
       ============================================ */
    
    document.addEventListener('DOMContentLoaded', function() {
        Loader.init();
        MobileMenu.init();
        DropdownMenus.init();
        StickyNav.init();
        ScrollReveal.init();
        HeroEffects.init();
        CardTilt.init();
        FormValidation.init();
        Dashboard.init();
        CourseFilter.init();
        FAQAccordion.init();
        FallbackRouting.init();
        SmoothScroll.init();
        Accessibility.init();
    });

})();