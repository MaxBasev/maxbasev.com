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