
document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelectorAll('.header__burger-button');
    const burgerMenu = document.querySelector('.burgerMenu');

    burgerButton.forEach(item => 
        item.addEventListener('click', function() {
        burgerMenu.classList.toggle('burgerMenu_hidden');
    }));
});
