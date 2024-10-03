const buttons = document.querySelectorAll('.typicalSolutions__button');
const descriptions = document.querySelectorAll('.typicalSolutions__description');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('typicalSolutions__button_active'));
        
        button.classList.add('typicalSolutions__button_active');
        descriptions.forEach(desc => desc.style.display = 'none');
        descriptions[index].style.display = 'flex';
    });
});
