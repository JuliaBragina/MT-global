document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.querySelector('.popup-overlay');
    const openPopupButton = document.querySelector('.header__openPopup');
    const closePopupButton = document.getElementById('closePopup');
    
    console.log(openPopupButton)
    openPopupButton.addEventListener('click', function() {
        popupOverlay.style.display = 'flex';
    });

    closePopupButton.addEventListener('click', function() {
        popupOverlay.style.display = 'none';
    });

    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });
});
