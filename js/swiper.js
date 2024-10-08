import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const slidesPerView = {
        reviews: 1,
        about: 5
    };

    document.querySelectorAll('.swiper').forEach(slider => {
        const uniqueClass = slider.classList[0];

        const swiperContainer = slider.querySelector('.swiper-container');
        const nextButton = slider.querySelector('.swiper-button-next');
        const prevButton = slider.querySelector('.swiper-button-prev');

        if (swiperContainer && nextButton && prevButton) {
            new Swiper(swiperContainer, {
                loop: true,
                navigation: {
                    nextEl: nextButton,
                    prevEl: prevButton,
                },
                slidesPerView: slidesPerView[uniqueClass] || 4,
                spaceBetween: 20,
                spaceBetween: 0,
                breakpoints: {
                    1300: {
                        slidesPerView: uniqueClass === 'reviews' ? 1 : (uniqueClass === 'about' && 5) || 4,
                    },
                    1024: {
                        slidesPerView: uniqueClass === 'reviews' ? 1 : 4,
                    },
                    768: {
                        slidesPerView: uniqueClass === 'reviews' ? 1 : 4,
                    },
                    425: {
                        slidesPerView: uniqueClass === 'reviews' ? 1 : 2,
                    },
                    360: {
                        slidesPerView: 1,
                    },
                    320: {
                        slidesPerView: 1,
                    },
                },
            });
        } else {
            console.error('Не удалось найти элементы для инициализации Swiper', { swiperContainer, nextButton, prevButton });
        }
    });
});
