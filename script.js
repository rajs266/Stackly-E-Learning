(function () {
    'use strict';


    const Loader = {
        init: function () {
            const loader = document.getElementById('stage-loader');
            if (!loader) return;

            
            const loaderTimeout = 200;

            window.addEventListener('load', function () {
                setTimeout(function () {
                    loader.classList.add('loader-hidden');
                    setTimeout(function () {
                        loader.style.display = 'none';
                    }, 300);
                }, loaderTimeout);
            });

            
            setTimeout(function () {
                if (loader && !loader.classList.contains('loader-hidden')) {
                    loader.classList.add('loader-hidden');
                    setTimeout(function () {
                        loader.style.display = 'none';
                    }, 300);
                }
            }, 1000);
        }
    };


    const MobileMenu = {
        init: function () {
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

            
            mobileOverlay.addEventListener('click', function (e) {
                if (e.target === mobileOverlay) closeMenu();
            });

            
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
                    closeMenu();
                }
            });

            
            const mobileLinks = mobileOverlay.querySelectorAll('a');
            mobileLinks.forEach(function (link) {
                link.addEventListener('click', function () {
                    closeMenu();
                });
            });
        }
    };


    const DropdownMenus = {
        init: function () {
            const dropdownParents = document.querySelectorAll('.has-dropdown');

            dropdownParents.forEach(function (parent) {
                const link = parent.querySelector('.nav-link');
                const menu = parent.querySelector('.dropdown-menu');

                if (!link || !menu) return;

                
                link.addEventListener('click', function (e) {
                    if (window.innerWidth < 1024) {
                        e.preventDefault();
                        const isOpen = menu.style.display === 'block';
                        
                        document.querySelectorAll('.dropdown-menu').forEach(function (m) {
                            m.style.display = 'none';
                        });
                        menu.style.display = isOpen ? 'none' : 'block';
                    }
                });
            });

            
            document.addEventListener('click', function (e) {
                if (!e.target.closest('.has-dropdown')) {
                    document.querySelectorAll('.dropdown-menu').forEach(function (m) {
                        if (window.innerWidth < 1024) {
                            m.style.display = 'none';
                        }
                    });
                }
            });
        }
    };

 
    const StickyNav = {
        init: function () {
            const header = document.querySelector('.main-header');
            if (!header) return;

            let lastScroll = 0;

            window.addEventListener('scroll', function () {
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


    const ScrollReveal = {
        init: function () {
            
            document.querySelectorAll('section, .feature-card, .course-card, .testimonial-card, .footer-col').forEach(el => {
                if (!el.classList.contains('section-reveal')) {
                    el.classList.add('section-reveal');
                }
            });

            const revealElements = document.querySelectorAll('.section-reveal');

            if (!('IntersectionObserver' in window)) {
                
                revealElements.forEach(function (el) {
                    el.classList.add('revealed');
                });
                return;
            }

            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(function (el) {
                observer.observe(el);
            });
        }
    };


    const HeroEffects = {
        init: function () {
            this.initParallax();
            this.initTilt();
            this.initParticles();
        },

        initParallax: function () {
            const heroSection = document.querySelector('.hero-section');
            if (!heroSection) return;

            const layers = heroSection.querySelectorAll('.hero-bg-layer');

            window.addEventListener('scroll', function () {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;

                layers.forEach(function (layer, index) {
                    const speed = (index + 1) * 0.2;
                    layer.style.transform = 'translateY(' + (rate * speed) + 'px)';
                });
            });
        },

        initTilt: function () {
            const tiltElement = document.getElementById('hero-tilt');
            if (!tiltElement) return;

            
            if (window.matchMedia('(pointer: coarse)').matches) return;

            var heroSection = document.querySelector('.hero-section');
            if (!heroSection) return;

            heroSection.addEventListener('mousemove', function (e) {
                const rect = tiltElement.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                tiltElement.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
            });

            heroSection.addEventListener('mouseleave', function () {
                tiltElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        },

        initParticles: function () {
            const particlesContainer = document.getElementById('hero-particles');
            if (!particlesContainer) return;

            
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

    const CardTilt = {
        init: function () {
            const cards = document.querySelectorAll('[data-tilt]');

            if (window.matchMedia('(pointer: coarse)').matches) return;

            cards.forEach(function (card) {
                card.addEventListener('mousemove', function (e) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = ((y - centerY) / centerY) * -8;
                    const rotateY = ((x - centerX) / centerX) * 8;

                    card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(10px)';
                });

                card.addEventListener('mouseleave', function () {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                });
            });
        }
    };


    const FormValidation = {
        init: function () {
            this.initContactForm();
            this.initLoginForm();
            this.initSignupForm();
        },

        showError: function (input, errorId, message) {
            const errorEl = document.getElementById(errorId);
            if (errorEl) {
                errorEl.textContent = message || 'Please fill this field';
                errorEl.style.display = 'block';
            }
            input.classList.add('input-error');
        },

        hideError: function (input, errorId) {
            const errorEl = document.getElementById(errorId);
            if (errorEl) {
                errorEl.style.display = 'none';
            }
            input.classList.remove('input-error');
        },

        validateEmail: function (email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        validatePhone: function (phone) {
            const re = /^[+]?[\d\s-]{10,}$/;
            return re.test(phone);
        },

        initContactForm: function () {
            const form = document.getElementById('contact-form');
            if (!form) return;

            form.addEventListener('submit', function (e) {
                e.preventDefault();

                let isValid = true;

                const name = document.getElementById('contact-name');
                const email = document.getElementById('contact-email');
                const subject = document.getElementById('contact-subject');
                const message = document.getElementById('contact-message');

                const mobile = document.getElementById('contact-mobile');

                
                if (!name || !name.value.trim()) {
                    if (name) FormValidation.showError(name, 'error-name');
                    isValid = false;
                } else if (!/^[a-zA-Z\s]+$/.test(name.value)) {
                    if (name) FormValidation.showError(name, 'error-name', 'Name can only contains alphabets');
                    isValid = false;
                } else {
                    if (name) FormValidation.hideError(name, 'error-name');
                }

                
                if (mobile && mobile.value.trim() !== '') {
                    if (!/^\d{10}$/.test(mobile.value)) {
                        FormValidation.showError(mobile, 'error-mobile', 'Please enter a valid 10-digit mobile number');
                        isValid = false;
                    } else {
                        FormValidation.hideError(mobile, 'error-mobile');
                    }
                }

                
                if (!email || !email.value.trim()) {
                    if (email) FormValidation.showError(email, 'error-email');
                    isValid = false;
                } else if (!FormValidation.validateEmail(email.value)) {
                    if (email) FormValidation.showError(email, 'error-email', 'Please enter a valid email address');
                    isValid = false;
                } else {
                    if (email) FormValidation.hideError(email, 'error-email');
                }

                
                if (!subject || !subject.value) {
                    if (subject) FormValidation.showError(subject, 'error-subject');
                    isValid = false;
                } else {
                    if (subject) FormValidation.hideError(subject, 'error-subject');
                }

                
                if (!message || !message.value.trim()) {
                    if (message) FormValidation.showError(message, 'error-message');
                    isValid = false;
                } else {
                    if (message) FormValidation.hideError(message, 'error-message');
                }

                if (isValid) {
                    
                    alert('Thank you for your message! We will get back to you within 24 hours.');
                    form.reset();
                }
            });

            
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(function (input) {
                input.addEventListener('input', function () {
                    const errorId = 'error-' + input.id.replace('contact-', '');
                    FormValidation.hideError(input, errorId);
                });
            });
        },

        initLoginForm: function () {
            const form = document.getElementById('login-form');
            if (!form) return;

            form.addEventListener('submit', function (e) {
                e.preventDefault();

                const email = document.getElementById('login-email');
                const password = document.getElementById('login-password');

                let isValid = true;

                
                if (!email || !email.value.trim()) {
                    if (email) FormValidation.showError(email, 'error-login-email');
                    isValid = false;
                } else if (!FormValidation.validateEmail(email.value)) {
                    if (email) FormValidation.showError(email, 'error-login-email', 'Please enter a valid email address');
                    isValid = false;
                } else {
                    if (email) FormValidation.hideError(email, 'error-login-email');
                }

                
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
                    const roleInput = document.querySelector('input[name="role"]:checked');
                    const userRole = roleInput ? roleInput.value : 'student';
                    
                    
                    sessionStorage.setItem('stacklyUserEmail', email.value);
                    sessionStorage.setItem('stacklyUserRole', userRole);
                    
                    if (userRole === 'instructor') {
                        window.location.href = 'dashboard-instructor.html';
                    } else {
                        window.location.href = 'dashboard-student.html';
                    }
                }
            });

            
            const inputs = form.querySelectorAll('input');
            inputs.forEach(function (input) {
                input.addEventListener('input', function () {
                    const errorId = 'error-' + input.id;
                    FormValidation.hideError(input, errorId);
                });
            });

            
            const toggleBtn = document.getElementById('password-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', function () {
                    const passwordInput = document.getElementById('login-password');
                    if (passwordInput) {
                        const type = passwordInput.type === 'password' ? 'text' : 'password';
                        passwordInput.type = type;
                        toggleBtn.textContent = type === 'password' ? '👁️' : '🙈';
                    }
                });
            }
        },

        initSignupForm: function () {
            const form = document.getElementById('signup-form');
            if (!form) return;

            
            const passwordInput = document.getElementById('signup-password');
            const strengthBar = document.querySelector('.strength-fill');
            const strengthText = document.querySelector('.strength-text');

            if (passwordInput && strengthBar) {
                passwordInput.addEventListener('input', function () {
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

            
            const toggleBtn = document.getElementById('signup-password-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', function () {
                    if (passwordInput) {
                        const type = passwordInput.type === 'password' ? 'text' : 'password';
                        passwordInput.type = type;
                        toggleBtn.textContent = type === 'password' ? '👁️' : '🙈';
                    }
                });
            }

            form.addEventListener('submit', function (e) {
                e.preventDefault();

                let isValid = true;

                const firstname = document.getElementById('signup-firstname');
                const lastname = document.getElementById('signup-lastname');
                const email = document.getElementById('signup-email');
                const password = document.getElementById('signup-password');
                const confirm = document.getElementById('signup-confirm');
                const terms = document.querySelector('input[name="terms"]');

                const mobile = document.getElementById('signup-mobile');

                
                if (!firstname || !firstname.value.trim()) {
                    if (firstname) FormValidation.showError(firstname, 'error-signup-firstname');
                    isValid = false;
                } else if (!/^[a-zA-Z\s]+$/.test(firstname.value)) {
                    if (firstname) FormValidation.showError(firstname, 'error-signup-firstname', 'Name can only contains alphabets');
                    isValid = false;
                } else {
                    if (firstname) FormValidation.hideError(firstname, 'error-signup-firstname');
                }

                
                if (!lastname || !lastname.value.trim()) {
                    if (lastname) FormValidation.showError(lastname, 'error-signup-lastname');
                    isValid = false;
                } else if (!/^[a-zA-Z\s]+$/.test(lastname.value)) {
                    if (lastname) FormValidation.showError(lastname, 'error-signup-lastname', 'Name can only contains alphabets');
                    isValid = false;
                } else {
                    if (lastname) FormValidation.hideError(lastname, 'error-signup-lastname');
                }

                
                if (!mobile || !mobile.value.trim()) {
                    if (mobile) FormValidation.showError(mobile, 'error-signup-mobile');
                    isValid = false;
                } else if (!/^\d{10}$/.test(mobile.value)) {
                    if (mobile) FormValidation.showError(mobile, 'error-signup-mobile', 'Please enter a valid 10-digit mobile number');
                    isValid = false;
                } else {
                    if (mobile) FormValidation.hideError(mobile, 'error-signup-mobile');
                }

                
                if (!email || !email.value.trim()) {
                    if (email) FormValidation.showError(email, 'error-signup-email');
                    isValid = false;
                } else if (!FormValidation.validateEmail(email.value)) {
                    if (email) FormValidation.showError(email, 'error-signup-email', 'Please enter a valid email address');
                    isValid = false;
                } else {
                    if (email) FormValidation.hideError(email, 'error-signup-email');
                }

                
                if (!password || !password.value.trim()) {
                    if (password) FormValidation.showError(password, 'error-signup-password');
                    isValid = false;
                } else if (password.value.length < 8) {
                    if (password) FormValidation.showError(password, 'error-signup-password', 'Password must be at least 8 characters');
                    isValid = false;
                } else {
                    if (password) FormValidation.hideError(password, 'error-signup-password');
                }

                
                if (!confirm || !confirm.value.trim()) {
                    if (confirm) FormValidation.showError(confirm, 'error-signup-confirm');
                    isValid = false;
                } else if (password && confirm.value !== password.value) {
                    if (confirm) FormValidation.showError(confirm, 'error-signup-confirm', 'Passwords do not match');
                    isValid = false;
                } else {
                    if (confirm) FormValidation.hideError(confirm, 'error-signup-confirm');
                }

                
                if (terms && !terms.checked) {
                    FormValidation.showError(terms, 'error-signup-terms', 'You must agree to the terms');
                    isValid = false;
                } else {
                    if (terms) FormValidation.hideError(terms, 'error-signup-terms');
                }

                if (isValid) {
                    sessionStorage.setItem('stacklyUserEmail', email.value);
                    const successModal = document.getElementById('success-modal');
                    if (successModal) {
                        successModal.style.display = 'flex';
                        setTimeout(function () {
                            successModal.classList.add('active');
                        }, 10);
                        setTimeout(function () {
                            window.location.href = 'login.html';
                        }, 3000);
                    } else {
                        window.location.href = 'login.html';
                    }
                }
            });

            
            const inputs = form.querySelectorAll('input');
            inputs.forEach(function (input) {
                input.addEventListener('input', function () {
                    const errorId = 'error-' + input.id;
                    FormValidation.hideError(input, errorId);
                });
            });
        }
    };


    const Dashboard = {
        init: function () {
            this.loadUserData();
            this.initSidebar();
            this.initPanelSwitching();
            this.initSidebarToggle();
            this.initLogout();
            this.initProfileForm();
        },

        initProfileForm: function () {
            const forms = [
                { id: 'profile-form', prefix: 'profile' },
                { id: 'instructor-profile-form', prefix: 'instructor' }
            ];

            forms.forEach(function(f) {
                const profileForm = document.getElementById(f.id);
                if (profileForm) {
                    profileForm.addEventListener('submit', function (e) {
                        e.preventDefault();
                        let isValid = true;

                        const fname = document.getElementById(f.prefix + '-fname');
                        const lname = document.getElementById(f.prefix + '-lname');
                        const email = document.getElementById(f.prefix === 'profile' ? 'profile-email-input' : f.prefix + '-email');
                        const mobile = document.getElementById(f.prefix + '-mobile');

                        
                        if (!fname || !fname.value.trim()) {
                            if (fname) FormValidation.showError(fname, 'error-' + f.prefix + '-fname');
                            isValid = false;
                        } else if (!/^[a-zA-Z\s]+$/.test(fname.value)) {
                            if (fname) FormValidation.showError(fname, 'error-' + f.prefix + '-fname', 'Name can only contains alphabets');
                            isValid = false;
                        } else {
                            if (fname) FormValidation.hideError(fname, 'error-' + f.prefix + '-fname');
                        }

                        
                        if (!lname || !lname.value.trim()) {
                            if (lname) FormValidation.showError(lname, 'error-' + f.prefix + '-lname');
                            isValid = false;
                        } else if (!/^[a-zA-Z\s]+$/.test(lname.value)) {
                            if (lname) FormValidation.showError(lname, 'error-' + f.prefix + '-lname', 'Name can only contains alphabets');
                            isValid = false;
                        } else {
                            if (lname) FormValidation.hideError(lname, 'error-' + f.prefix + '-lname');
                        }
                        
                        
                        const emailErrorId = f.prefix === 'profile' ? 'error-profile-email' : 'error-instructor-email';
                        if (!email || !email.value.trim()) {
                            if (email) FormValidation.showError(email, emailErrorId);
                            isValid = false;
                        } else if (!FormValidation.validateEmail(email.value)) {
                            if (email) FormValidation.showError(email, emailErrorId, 'Please enter a valid email address');
                            isValid = false;
                        } else {
                            if (email) FormValidation.hideError(email, emailErrorId);
                        }

                        
                        if (!mobile || !mobile.value.trim()) {
                            if (mobile) FormValidation.showError(mobile, 'error-' + f.prefix + '-mobile');
                            isValid = false;
                        } else if (!/^\d{10}$/.test(mobile.value)) {
                            if (mobile) FormValidation.showError(mobile, 'error-' + f.prefix + '-mobile', 'Please enter a valid 10-digit mobile number');
                            isValid = false;
                        } else {
                            if (mobile) FormValidation.hideError(mobile, 'error-' + f.prefix + '-mobile');
                        }

                        if (isValid) {
                            const btn = profileForm.querySelector('button[type="submit"]');
                            if (btn) {
                                const originalText = btn.textContent;
                                btn.textContent = 'Saved!';
                                btn.style.backgroundColor = '#10b981';
                                btn.style.color = 'white';

                                setTimeout(function () {
                                    btn.textContent = originalText;
                                    btn.style.backgroundColor = '';
                                    btn.style.color = '';
                                }, 2000);
                            }
                        }
                    });
                }
            });
        },

        loadUserData: function () {
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

                
                const nameFromEmail = userEmail.split('@')[0];
                const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

                if (profileName) profileName.textContent = formattedName;
                if (userName) userName.textContent = formattedName;

                
                const welcomeTitle = document.querySelector('.welcome-title');
                if (welcomeTitle) {
                    welcomeTitle.textContent = 'Welcome, ' + formattedName + '!';
                }
            } else {
                
                if (document.querySelector('.dashboard-page')) {
                    window.location.href = 'login.html';
                }
            }
        },

        initSidebar: function () {
            const sidebar = document.getElementById('dashboard-sidebar');
            if (!sidebar) return;

            
            const hash = window.location.hash || '#overview';
            this.setActiveSidebarLink(hash.replace('#', ''));
        },

        setActiveSidebarLink: function (panelId) {
            const links = document.querySelectorAll('.sidebar-link[data-panel]');
            links.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('data-panel') === panelId) {
                    link.classList.add('active');
                }
            });
        },

        initPanelSwitching: function () {
            const sidebarLinks = document.querySelectorAll('.sidebar-link[data-panel]');
            const panels = document.querySelectorAll('.dashboard-panel');

            if (!sidebarLinks.length || !panels.length) return;

            sidebarLinks.forEach(function (link) {
                link.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetPanel = this.getAttribute('data-panel');

                    
                    sidebarLinks.forEach(function (l) { l.classList.remove('active'); });
                    this.classList.add('active');

                    
                    panels.forEach(function (panel) {
                        if (panel.id === 'panel-' + targetPanel) {
                            panel.classList.add('active');
                            panel.style.opacity = '0';
                            panel.style.transform = 'translateY(20px)';
                            setTimeout(function () {
                                panel.style.opacity = '1';
                                panel.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            panel.classList.remove('active');
                        }
                    });

                    
                    history.pushState(null, null, '#' + targetPanel);

                    
                    if (window.innerWidth < 1024) {
                        const sidebar = document.getElementById('dashboard-sidebar');
                        const sidebarOverlay = document.querySelector('.sidebar-overlay');
                        if (sidebar) { sidebar.classList.remove('active'); sidebar.classList.remove('sidebar-open'); }
                        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
                        document.body.classList.remove('sidebar-open-body');
                    }
                });
            });

            
            window.addEventListener('popstate', function () {
                const hash = window.location.hash.replace('#', '') || 'overview';
                Dashboard.setActiveSidebarLink(hash);

                panels.forEach(function (panel) {
                    panel.classList.toggle('active', panel.id === 'panel-' + hash);
                });
            });
        },

        initSidebarToggle: function () {
            const toggleBtn = document.getElementById('sidebar-toggle');
            const sidebar = document.getElementById('dashboard-sidebar');
            const closeBtn = document.getElementById('sidebar-close');

            
            let overlay = document.querySelector('.sidebar-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                document.body.appendChild(overlay);
            }

            function openSidebar() {
                if (!sidebar) return;
                sidebar.classList.add('sidebar-open');
                overlay.classList.add('active');
                document.body.classList.add('sidebar-open-body');
            }

            function closeSidebar() {
                if (!sidebar) return;
                sidebar.classList.remove('sidebar-open');
                overlay.classList.remove('active');
                document.body.classList.remove('sidebar-open-body');
            }

            if (toggleBtn) {
                toggleBtn.addEventListener('click', function () {
                    if (sidebar.classList.contains('sidebar-open')) {
                        closeSidebar();
                    } else {
                        openSidebar();
                    }
                });
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', closeSidebar);
            }

            overlay.addEventListener('click', closeSidebar);

            
            if (sidebar) {
                sidebar.querySelectorAll('.sidebar-link').forEach(function(link) {
                    link.addEventListener('click', function() {
                        if (window.innerWidth < 1024) closeSidebar();
                    });
                });
            }

            
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 1024) closeSidebar();
            });
        },

        initLogout: function () {
            const logoutBtn = document.getElementById('logout-btn');
            const headerLogout = document.getElementById('header-logout');

            function doLogout() {
                sessionStorage.removeItem('stacklyUserEmail');
                window.location.href = 'index.html';
            }

            if (logoutBtn) {
                logoutBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    doLogout();
                });
            }

            if (headerLogout) {
                headerLogout.addEventListener('click', function (e) {
                    e.preventDefault();
                    doLogout();
                });
            }
        }
    };

    const CourseFilter = {
        init: function () {
            this.initCategoryFilter();
            this.initLevelFilter();
            this.initSearch();
            this.initPricingToggle();
        },

        initCategoryFilter: function () {
            const categoryCards = document.querySelectorAll('.category-card');
            const courseCards = document.querySelectorAll('.course-card');

            if (!categoryCards.length) return;

            categoryCards.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    
                    categoryCards.forEach(function (b) { b.classList.remove('active'); });
                    this.classList.add('active');

                    const filter = this.getAttribute('data-filter');

                    courseCards.forEach(function (card) {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = '';
                            setTimeout(function () {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.9)';
                            setTimeout(function () {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        },

        initLevelFilter: function () {
            const filterTags = document.querySelectorAll('.filter-tag');
            const courseCards = document.querySelectorAll('.course-card');

            if (!filterTags.length) return;

            filterTags.forEach(function (tag) {
                tag.addEventListener('click', function () {
                    filterTags.forEach(function (t) { t.classList.remove('active'); });
                    this.classList.add('active');

                    const level = this.textContent.toLowerCase();

                    courseCards.forEach(function (card) {
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

        initSearch: function () {
            const searchInput = document.getElementById('course-search');
            const courseCards = document.querySelectorAll('.course-card');

            if (!searchInput) return;

            searchInput.addEventListener('input', function () {
                const query = this.value.toLowerCase();

                courseCards.forEach(function (card) {
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

        initPricingToggle: function () {
            const toggle = document.getElementById('pricing-toggle');
            const amounts = document.querySelectorAll('.amount');

            if (!toggle) return;

            toggle.addEventListener('change', function () {
                const isYearly = this.checked;

                amounts.forEach(function (el) {
                    const monthly = el.getAttribute('data-monthly');
                    const yearly = el.getAttribute('data-yearly');

                    if (monthly && yearly) {
                        el.textContent = isYearly ? yearly : monthly;
                    }
                });

                
                const periods = document.querySelectorAll('.period');
                periods.forEach(function (p) {
                    p.textContent = isYearly ? '/year' : '/month';
                });
            });
        }
    };


    const FAQAccordion = {
        init: function () {
            const questions = document.querySelectorAll('.faq-question');

            questions.forEach(function (q) {
                q.addEventListener('click', function () {
                    const isOpen = this.getAttribute('aria-expanded') === 'true';

                    
                    questions.forEach(function (other) {
                        other.setAttribute('aria-expanded', 'false');
                        const answer = other.nextElementSibling;
                        if (answer) answer.style.maxHeight = null;
                    });

                    
                    this.setAttribute('aria-expanded', !isOpen);
                    const answer = this.nextElementSibling;
                    if (answer && !isOpen) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                });
            });
        }
    };


    const FallbackRouting = {
        init: function () {
            document.addEventListener('click', function (e) {
                const target = e.target.closest('a, button');
                if (!target) return;

                const href = target.getAttribute('href');

                
                
                if (target.tagName === 'BUTTON') {
                    if (
                        target.getAttribute('data-panel') ||
                        target.getAttribute('onclick') ||
                        target.closest('.dashboard-sidebar') ||
                        target.closest('.dashboard-header') ||
                        target.closest('.dashboard-content') ||
                        target.closest('[data-panel]') ||
                        target.id === 'sidebar-toggle' ||
                        target.id === 'sidebar-close' ||
                        target.id === 'logout-btn' ||
                        target.id === 'header-logout' ||
                        target.classList.contains('sidebar-toggle') ||
                        target.classList.contains('sidebar-close') ||
                        target.classList.contains('action-btn') ||
                        target.classList.contains('password-toggle') ||
                        target.closest('form') ||
                        target.type === 'submit' ||
                        target.type === 'button' ||
                        target.type === 'reset'
                    ) {
                        return;
                    }
                }

                if (href === 'javascript:void(0)' || href === 'javascript:void(0);') {
                    e.preventDefault();
                    window.location.href = '404.html';
                }
            });
        }
    };


    const SmoothScroll = {
        init: function () {
            document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
                anchor.addEventListener('click', function (e) {
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


    const Accessibility = {
        init: function () {
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


    document.addEventListener('DOMContentLoaded', function () {
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