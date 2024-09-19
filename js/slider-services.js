const servicesData = [
    {
        title: "Мультимедийные решения для бизнеса",
        description: "Описание для мультимедийных решений для бизнеса",
        image: "../img/services/services-1.svg"
    },
    {
        title: "Управление ИТ-Инфраструктурой",
        description: "Описание для управления ИТ-инфраструктурой",
        image: "../img/services/services-2.svg"
    },
    {
        title: "Импортозамещение",
        description: "Описание для импортозамещения",
        image: "../img/services/services-3.svg"
    },
    {
        title: "Автоматизация процессов на базе 1С",
        description: "Описание для автоматизации процессов на базе 1С",
        image: "../img/services/services-4.svg"
    },
    {
        title: "ИТ-Консалтинг",
        description: "Описание для ИТ-Консалтинга",
        image: "../img/services/services-5.svg"
    }
];

const serviceButtons = document.querySelectorAll('.services__button');
const currentCounter = document.querySelector('.services__currentCounter');
const maxCounter = document.querySelector('.services__maxCounter');
const currentTitle = document.querySelector('.services__currentTitle');
const serviceImage = document.querySelector('.services__img');
const serviceParagraph = document.querySelector('.services__paragraph');

maxCounter.textContent = (parseInt(servicesData.length.toString())).toString().padStart(2, '0');

function updateServiceContent(index) {
    const service = servicesData[index];

    currentCounter.textContent = (parseInt(index) + 1).toString().padStart(2, '0');
    currentTitle.textContent = service.title;
    serviceParagraph.textContent = service.description;
    serviceImage.src = service.image;

    serviceButtons.forEach(btn => btn.classList.remove('services__button_active'));
    serviceButtons[index].classList.add('services__button_active');
}

serviceButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const index = e.currentTarget.getAttribute('data-index');
        updateServiceContent(index);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    updateServiceContent(0);
});