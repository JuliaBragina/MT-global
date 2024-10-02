document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupOverlayCatalog = document.querySelector('.popup-overlay-getCatalog');
    const popupOverlayNeedProject = document.querySelector('.popup-overlay-needProject');

    const openCallBackPopup = document.querySelectorAll('.openCallBackPopup');
    const openGetSolutionsPopup = document.querySelectorAll('.openGetSolutionsPopup');
    const openOrderSolutionPopup = document.querySelectorAll('.openOrderSolutionPopup');

    const closePopupButton = document.querySelectorAll('.popup__close-button');
    
    openCallBackPopup.forEach(item => {
        item.addEventListener('click', function() {
            popupOverlay.style.display = 'flex';
        });
    })

    openOrderSolutionPopup.forEach(item => {
        item.addEventListener('click', function() {
            popupOverlayNeedProject.style.display = 'flex';
        })
    });

    openGetSolutionsPopup.forEach(item => {
        item.addEventListener('click', function() {
            popupOverlayCatalog.style.display = 'flex';
        })
    });

    closePopupButton.forEach(item => {
        item.addEventListener('click', function() {
            popupOverlay.style.display = 'none';
            popupOverlayCatalog.style.display = 'none';
            popupOverlayNeedProject.style.display = 'none';
        });
    });

    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });

    popupOverlayCatalog.addEventListener('click', function(e) {
        if (e.target === popupOverlayCatalog) {
            popupOverlayCatalog.style.display = 'none';
        }
    });

    popupOverlayNeedProject.addEventListener('click', function(e) {
        if (e.target === popupOverlayNeedProject) {
            popupOverlayNeedProject.style.display = 'none';
        }
    });
});
