// Intersection Observer для анимаций при скролле
const observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		}
	});
}, observerOptions);

// Добавляем класс fade-in ко всем элементам, которые хотим анимировать
document.querySelectorAll('.service-card, .project-card, .term-item, .blog-card, .contact-card').forEach(el => {
	el.classList.add('fade-in');
	observer.observe(el);
});

// Scroll to top functionality
document.addEventListener('DOMContentLoaded', () => {
	const scrollToTopButton = document.querySelector('.scroll-to-top');

	if (scrollToTopButton) {
		window.addEventListener('scroll', () => {
			if (window.pageYOffset > 500) {
				scrollToTopButton.classList.add('visible');
			} else {
				scrollToTopButton.classList.remove('visible');
			}
		});

		scrollToTopButton.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}

	// Mobile Navigation
	const menuToggle = document.querySelector('.menu-toggle');
	const navLinks = document.querySelector('.nav-links');

	if (menuToggle && navLinks) {
		menuToggle.addEventListener('click', (e) => {
			e.stopPropagation(); // Предотвращаем всплытие события
			navLinks.classList.toggle('active');
			menuToggle.classList.toggle('active');
			menuToggle.setAttribute('aria-expanded',
				menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
			);
		});

		// Закрываем меню при клике на ссылку
		navLinks.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				navLinks.classList.remove('active');
				menuToggle.classList.remove('active');
				menuToggle.setAttribute('aria-expanded', 'false');
			});
		});

		// Закрываем меню при клике вне его
		document.addEventListener('click', (e) => {
			if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
				navLinks.classList.remove('active');
				menuToggle.classList.remove('active');
				menuToggle.setAttribute('aria-expanded', 'false');
			}
		});
	}

	// Добавляем активный класс для текущей секции при скролле
	const sections = document.querySelectorAll('section[id]');

	if (sections.length > 0) {
		function highlightCurrentSection() {
			const scrollY = window.pageYOffset;

			sections.forEach(section => {
				const sectionHeight = section.offsetHeight;
				const sectionTop = section.offsetTop - 100;
				const sectionId = section.getAttribute('id');
				const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

				if (navLink) {
					if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
						navLink.classList.add('active');
					} else {
						navLink.classList.remove('active');
					}
				}
			});
		}

		window.addEventListener('scroll', highlightCurrentSection);
	}

	// Оптимизация обработчика скролла
	let scrollTimeout;
	window.addEventListener('scroll', () => {
		if (!scrollTimeout) {
			scrollTimeout = setTimeout(() => {
				scrollTimeout = null;
				// Ваш код обработки скролла
			}, 20);
		}
	});
}); 