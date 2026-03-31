document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader removal
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 500);

    // 2. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 4. Scroll animations using IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Initial trigger for hero elements
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-in-up').forEach(el => {
            el.classList.add('visible');
        });
    }, 600); // trigger after loader

    // Watch all other fade-in elements
    document.querySelectorAll('.fade-in-up:not(.hero .fade-in-up)').forEach(el => {
        observer.observe(el);
    });
});

// 5. Modal Logic for Artworks
function openModal(title, imgSrc, collection, desc) {
    const modal = document.getElementById('artModal');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-col').innerText = collection;

    // Si pasamos una descripción específica la mostramos, sino un texto por defecto.
    const descriptionText = desc || "Obra original en texturas y acrílico sobre lienzo. Realizada a mano con técnicas mixtas y materiales de alta calidad, perfecta para crear un rincón de calma en tu hogar.";
    document.getElementById('modal-desc').innerText = descriptionText;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeModal() {
    const modal = document.getElementById('artModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

// Close modal when clicking outside of the content (on the overlay)
document.getElementById('artModal').addEventListener('click', (e) => {
    if (e.target.id === 'artModal') {
        closeModal();
    }
});

// Listen for ESC key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});

// 6. Carousel Logic
function scrollCarousel(btn, direction) {
    const container = btn.closest('.carousel-container');
    const track = container ? container.querySelector('.carousel-track') : null;
    if (track) {
        const itemElement = track.querySelector('.carousel-item');
        if (itemElement) {
            const itemWidth = itemElement.offsetWidth + 20;
            const scrollAmount = window.innerWidth > 768 ? itemWidth * 2 : itemWidth;
            track.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
        }
    }
}
