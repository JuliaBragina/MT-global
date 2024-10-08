import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.swiper').forEach(slider => {
        const uniqueClass = slider.classList[0];

        const swiperContainer = slider.querySelector(`.swiper-container_${uniqueClass}`);
        const nextButton = slider.querySelector(`.swiper-button-next_${uniqueClass}`);
        const prevButton = slider.querySelector(`.swiper-button-prev_${uniqueClass}`);

        console.log(uniqueClass, swiperContainer, nextButton, prevButton);
        
        if (swiperContainer && nextButton && prevButton) {
            new Swiper(swiperContainer, {
                loop: true,
                navigation: {
                    nextEl: nextButton,
                    prevEl: prevButton,
                },
                slidesPerView: uniqueClass === 'reviews' ? 1 : 4,
                spaceBetween: 10,
            });
        } else {
            console.error('Не удалось найти элементы для инициализации Swiper', { swiperContainer, nextButton, prevButton });
        }
    });
});
