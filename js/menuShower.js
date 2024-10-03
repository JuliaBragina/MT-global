document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelectorAll('.header__burger-button');
    const burgerMenu = document.querySelector('.burgerMenu');

    burgerButton.forEach(item => 
        item.addEventListener('click', function() {
            burgerMenu.classList.toggle('burgerMenu_hidden');
        })
    );

    const subBurgerButton = document.querySelectorAll('.burgerMenu__item');

    subBurgerButton.forEach(item => 
        item.addEventListener('click', function() {
            const subList = item.querySelector('.burgerMenu__subList');

            if (!subList) return;

            subBurgerButton.forEach(i => {
                if (i !== item) {
                    i.classList.remove('burgerMenu__item_active');
                    const hiddenSubList = i.querySelector('.burgerMenu__subList');
                    if (hiddenSubList) {
                        hiddenSubList.classList.add('burgerMenu__subList_hidden');
                    }
                }
            });

            item.classList.toggle('burgerMenu__item_active');
            if (subList) {
                subList.classList.toggle('burgerMenu__subList_hidden');
            }
        })
    );
});

