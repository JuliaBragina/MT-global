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

const serviceButtons = document.querySelectorAll('.services__link');
const currentCounter = document.querySelector('.services__currentCounter');
const maxCounter = document.querySelector('.services__maxCounter');
const currentTitle = document.querySelector('.services__currentTitle');
const serviceImage = document.querySelector('.services__img');
const serviceParagraph = document.querySelector('.services__paragraph');

const prevButton = document.querySelector('.navButton__prev_services');
const nextButton = document.querySelector('.navButton__next_services');

let currentIndex = 0;
maxCounter.textContent = (servicesData.length).toString().padStart(2, '0');

function updateServiceContent(index) {
    const service = servicesData[index];
    currentCounter.textContent = (index + 1).toString().padStart(2, '0');
    currentTitle.textContent = service.title;
    serviceParagraph.textContent = service.description;
    serviceImage.src = service.image;

    serviceButtons.forEach(btn => btn.classList.remove('services__link_active'));
    serviceButtons[index].classList.add('services__link_active');
}

function changeService(direction) {
    currentIndex = (currentIndex + direction + servicesData.length) % servicesData.length;
    updateServiceContent(currentIndex);
}

prevButton.addEventListener('click', () => {
    changeService(-1);
});

nextButton.addEventListener('click', () => {
    changeService(1);
});

serviceButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        currentIndex = parseInt(e.currentTarget.getAttribute('data-index'));
        updateServiceContent(currentIndex);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    updateServiceContent(0);
});
