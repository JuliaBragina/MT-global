document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.header__burger-button');
    const menu = document.querySelector('.burgerMenu');
    const menuLinks = document.querySelectorAll('.burgerMenu__link');
    const burgerMenuItems = document.querySelectorAll('.burgerMenu__item');
    const overlay = document.querySelector('.burgerMenu__overlay');

    const toggleMenu = (isOpen) => {
        buttons.forEach(button => {
            button.classList.toggle('header__burger-button_active', isOpen);
            button.setAttribute('aria-expanded', isOpen);
            const buttonImg = button.querySelector('.header__burger-button-img');
            buttonImg.classList.toggle('header__burger-button-img_active', isOpen); 
        });
        
        menu.setAttribute('aria-hidden', !isOpen);
        menu.classList.toggle('burgerMenu_active', isOpen);
        menuLinks.forEach(link => link.setAttribute('tabindex', isOpen ? '0' : '-1'));
    };

    buttons.forEach(button => 
        button.addEventListener('click', () => {
            const isOpen = !button.classList.contains('header__burger-button_active');
            toggleMenu(isOpen);
        })
    );

    document.addEventListener('click', function(event) {
        const isClickInsideMenu = event.target.closest('.burgerMenu__list') !== null;
        const isClickInsideButton = event.target.closest('.header__burger-button') !== null;
        const isClickInsideOverlay = overlay.contains(event.target);

        if (!isClickInsideMenu && !isClickInsideButton && !isClickInsideOverlay) {
            toggleMenu(false);
        }
    });

    burgerMenuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            burgerMenuItems.forEach(i => i.classList.remove('burgerMenu__item_active'));
            item.classList.add('burgerMenu__item_active');

            const subList = item.querySelector('.burgerMenu__subList');
            if (subList) {
                subList.setAttribute('aria-hidden', 'false');
            }
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('burgerMenu__item_active');
            const subList = item.querySelector('.burgerMenu__subList');
            if (subList) {
                subList.setAttribute('aria-hidden', 'true');
            }
        });
    });
});
