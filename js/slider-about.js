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