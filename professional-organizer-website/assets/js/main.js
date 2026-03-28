
// General Site Logic
document.addEventListener('DOMContentLoaded', () => {
    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Mobile Menu Toggle Fix (if needed beyond Bootstrap defaults)
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    if (menuToggle) {
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 1200 && !link.classList.contains('dropdown-toggle')) {
                    const bsCollapse = new bootstrap.Collapse(menuToggle);
                    bsCollapse.hide();
                }
            });
        });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Validation (Simple UI Only)
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // RTL Toggle Support
    const rtlToggle = document.getElementById('rtl-toggle');
    const htmlElem = document.documentElement;

    // Load saved RTL state
    const savedDir = localStorage.getItem('site-direction') || 'ltr';
    htmlElem.setAttribute('dir', savedDir);
    updateRTLIcon(savedDir);

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = htmlElem.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            
            htmlElem.setAttribute('dir', newDir);
            localStorage.setItem('site-direction', newDir);
            updateRTLIcon(newDir);
        });
    }

    function updateRTLIcon(dir) {
        if (!rtlToggle) return;
        const icon = rtlToggle.querySelector('i');
        if (dir === 'rtl') {
            icon.classList.remove('bi-translate');
            icon.classList.add('bi-arrow-left-right');
            rtlToggle.setAttribute('title', 'Switch to LTR');
        } else {
            icon.classList.remove('bi-arrow-left-right');
            icon.classList.add('bi-translate');
            rtlToggle.setAttribute('title', 'Switch to RTL');
        }
    }
});
