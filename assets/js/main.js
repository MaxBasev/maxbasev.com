// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
	const menuToggle = document.querySelector('.menu-toggle');
	const navLinks = document.querySelector('.nav-links');

	if (menuToggle && navLinks) {
		menuToggle.addEventListener('click', (e) => {
			e.stopPropagation();
			navLinks.classList.toggle('active');
			menuToggle.setAttribute('aria-expanded',
				menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
			);
		});

		// Close menu when clicking on a link
		navLinks.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				navLinks.classList.remove('active');
				menuToggle.setAttribute('aria-expanded', 'false');
			});
		});

		// Close menu when clicking outside
		document.addEventListener('click', (e) => {
			if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
				navLinks.classList.remove('active');
				menuToggle.setAttribute('aria-expanded', 'false');
			}
		});
	}

	// Scroll to top functionality
	const scrollToTopButton = document.querySelector('.scroll-to-top');

	if (scrollToTopButton) {
		window.addEventListener('scroll', () => {
			if (window.pageYOffset > 500) {
				scrollToTopButton.classList.add('visible');
			} else {
				scrollToTopButton.classList.remove('visible');
			}
		});

		scrollToTopButton.addEventListener('click', (e) => {
			e.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}

	// Active navigation highlighting
	const sections = document.querySelectorAll('section[id]');
	const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

	if (sections.length > 0 && navItems.length > 0) {
		function updateActiveNav() {
			const scrollY = window.pageYOffset;

			sections.forEach(section => {
				const sectionHeight = section.offsetHeight;
				const sectionTop = section.offsetTop - 100;
				const sectionId = section.getAttribute('id');
				const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

				if (navLink) {
					if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
						navItems.forEach(item => item.classList.remove('active'));
						navLink.classList.add('active');
					}
				}
			});
		}

		// Throttled scroll handler
		let scrollTimeout;
		window.addEventListener('scroll', () => {
			if (!scrollTimeout) {
				scrollTimeout = setTimeout(() => {
					updateActiveNav();
					scrollTimeout = null;
				}, 100);
			}
		});
	}
}); 