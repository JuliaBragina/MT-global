document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector('.slider');
    const leftButton = document.querySelector('.navButton__prev_about');
    const rightButton = document.querySelector('.navButton__next_about');

    const slides = slider.querySelectorAll('.slider__item');
    const slideCount = slides.length;
    let slideIndex = 0;

    leftButton.addEventListener('click', showPreviousSlide);
    rightButton.addEventListener('click', showNextSlide);

    function showPreviousSlide() {
        slideIndex = (slideIndex - 1 + slideCount) % slideCount;
        disableButtons();
        updateSlider();
    }

    function showNextSlide() {
        slideIndex = (slideIndex + 1) % slideCount;

        console.log(slideIndex);
        disableButtons();
        updateSlider();
    }

    function updateSlider() {
    slides.forEach((item, index) => {
        if(index >= slideIndex  && index < slideCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })}

    function disableButtons() {
    if (slideIndex === 0) {
        leftButton.children[0].style.display = 'none';
        leftButton.disabled = true;
    } else {
        leftButton.children[0].style.display = 'block';
        leftButton.disabled = false;
    }

    if (slideIndex === slideCount - 1) {
        rightButton.children[0].style.display = 'none';
        rightButton.disabled = true;
    } else {
        rightButton.children[0].style.display = 'block';
        rightButton.disabled = false;
    }
    }

    updateSlider();
    disableButtons();
});

const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.slider__item');
const slideCount = slides.length;
const sliderLine = document.querySelector('.slider__line');
const yellowBar = document.querySelector('.slider__line_pink');
const lineWidth = sliderLine.offsetWidth;

let slideIndex = 0;

function updateSlider() {
    const margin = window.innerWidth <= 1300 ? 10 : 20;
    console.log(margin);
    const offset = slideIndex * -(292 + margin);
    slider.querySelector('.slider__items').style.transform = `translateX(${offset}px)`;

    const yellowBarOffset = (slideIndex / (slideCount - 1)) * (lineWidth - yellowBar.offsetWidth);
    yellowBar.style.transform = `translateX(${yellowBarOffset}px)`;
}

let isDragging = false;

sliderLine.addEventListener('mousedown', (e) => {
    isDragging = true;
    const startX = e.clientX;
    const startSlideIndex = slideIndex;

    const onMouseMove = (moveEvent) => {
        if (!isDragging) return;

        const dx = moveEvent.clientX - startX;
        const percentage = dx / lineWidth;
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

// Initialize the slider position
updateSlider();
