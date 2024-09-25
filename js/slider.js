document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll('.slider-container');
    
    sliders.forEach(slider => {
        const leftButton = slider.querySelector('.navButton__prev_about, .navButton__prev_reviews, .navButton__prev_database, .navButton__prev_readyProjects, .navButton__prev_doneProjects');
        const rightButton = slider.querySelector('.navButton__next_about, .navButton__next_reviews, .navButton__next_database, .navButton__next_readyProjects, .navButton__next_doneProjects');
        const slides = slider.querySelectorAll('.slider__item');
        const slideCount = slides.length;
        const sliderItems = slider.querySelector('.slider__items');
        const sliderLine = slider.querySelector('.slider__line');
        const yellowBar = sliderLine ? sliderLine.querySelector('.slider__line_pink') : null;

        let slideIndex = 0;
        let isDragging = false;

        if (leftButton && rightButton) {
            leftButton.addEventListener('click', showPreviousSlide);
            rightButton.addEventListener('click', showNextSlide);
        }

        function showPreviousSlide() {
            slideIndex = (slideIndex - 1 + slideCount) % slideCount;
            updateSlider();
            disableButtons();
        }

        function showNextSlide() {
            slideIndex = (slideIndex + 1) % slideCount;
            updateSlider();
            disableButtons();
        }

        function updateSlider() {
            const slideWidth = slides[0].offsetWidth;
            const margin = window.innerWidth <= 1300 ? 10 : 20;
            const offset = slideIndex * -(slideWidth + margin);
            sliderItems.style.transform = `translateX(${offset}px)`;

            if (yellowBar && sliderLine) {
                const lineWidth = sliderLine.offsetWidth;
                const yellowBarOffset = (slideIndex / (slideCount - 1)) * (lineWidth - yellowBar.offsetWidth);
                yellowBar.style.transform = `translateX(${yellowBarOffset}px)`;
            }
            if (slideIndex === 0) {
                leftButton.style.opacity = '0.5';
                leftButton.disabled = true;
            } else {
                leftButton.style.opacity = '1'; 
                leftButton.disabled = false;
            }

            if (slideIndex === slideCount - 1) {
                rightButton.style.opacity = '0.5';
                rightButton.disabled = true;
            } else {
                rightButton.style.opacity = '1';
                rightButton.disabled = false; 
            }
        }

        function disableButtons() {
            if (slideIndex === 0) {
                leftButton.style.opacity = '0.5';
                leftButton.disabled = true;
            } else {
                leftButton.style.opacity = '1'; 
                leftButton.disabled = false;
            }

            if (slideIndex === slideCount - 1) {
                rightButton.style.opacity = '0.5';
                rightButton.disabled = true;
            } else {
                rightButton.style.opacity = '1';
                rightButton.disabled = false; 
            }
        }

        if (sliderLine) {
            sliderLine.addEventListener('mousedown', (e) => {
                isDragging = true;
                const startX = e.clientX;
                const startSlideIndex = slideIndex;

                const onMouseMove = (moveEvent) => {
                    if (!isDragging) return;

                    const dx = moveEvent.clientX - startX;
                    const percentage = dx / sliderLine.offsetWidth;
                    slideIndex = Math.min(Math.max(startSlideIndex + Math.round(percentage * slideCount), 0), slideCount - 1);
                    updateSlider();
                };

                const onMouseUp = () => {
                    isDragging = false;
                    window.removeEventListener('mousemove', onMouseMove);
                    window.removeEventListener('mouseup', onMouseUp);
                };

                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
            });
        }

        updateSlider();
        disableButtons();
    });
});

