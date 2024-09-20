const compass = document.querySelector('.compass');
const needle = document.querySelector('.compass__needle');
const directionsContainer = document.querySelector('.compass__directions');

const baseRadius = 65;
const outerRadius = 178;

const ticksContainer = document.querySelector('.compass__ticks');

const majorTickCount = 4;
const minorTickCount = 28;
const totalTicks = majorTickCount + minorTickCount;
const angleStep = 360 / totalTicks;

function createTicks() {
    let currentAngle = 0;

    for (let i = 0; i < totalTicks; i++) {
        const isMajorTick = i % 8 === 0;
        const tickLength = isMajorTick ? 20 : 10;

        let x1 = 200 + outerRadius * Math.cos(currentAngle * Math.PI / 180);
        let y1 = 200 + outerRadius * Math.sin(currentAngle * Math.PI / 180);
        let x2 = 200 + (outerRadius - tickLength) * Math.cos(currentAngle * Math.PI / 180);
        let y2 = 200 + (outerRadius - tickLength) * Math.sin(currentAngle * Math.PI / 180);

        const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
        tick.setAttribute('x1', x1);
        tick.setAttribute('y1', y1);
        tick.setAttribute('x2', x2);
        tick.setAttribute('y2', y2);
        tick.setAttribute('class', isMajorTick ? 'major-tick' : 'minor-tick');
        tick.dataset.angle = currentAngle;
        ticksContainer.appendChild(tick);

        currentAngle += angleStep;
    }
}

createTicks();

document.querySelector('.whyWe').addEventListener('mousemove', (event) => {
    const rect = compass.getBoundingClientRect();
    const compassCenterX = rect.left + rect.width / 2;
    const compassCenterY = rect.top + rect.height / 2;

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const angle = Math.atan2(mouseY - compassCenterY, mouseX - compassCenterX);

    const baseX = compassCenterX + baseRadius * Math.cos(angle);
    const baseY = compassCenterY + baseRadius * Math.sin(angle);

    const offsetX = -10;
    const offsetY = -10;
    needle.style.left = `${baseX - rect.left + offsetX}px`;
    needle.style.top = `${baseY - rect.top + offsetY}px`;

    const rotateAngle = angle * (180 / Math.PI) + 90;
    needle.style.transform = `translate(-50%, -100%) rotate(${rotateAngle}deg)`;

    document.querySelectorAll('.major-tick, .minor-tick').forEach(tick => {
        const tickAngle = parseFloat(tick.dataset.angle);
        const adjustedAngle = (rotateAngle + 360 - 90) % 360;

        if (Math.abs(adjustedAngle - tickAngle) < angleStep / 2) {
            tick.classList.add('active');
        } else {
            tick.classList.remove('active');
        }
    });
});

const directionLabels = [
    { label: 'N', angle: -90},
    { label: 'NE', angle:-45},
    { label: 'E', angle: 0},
    { label: 'SE', angle: 45},
    { label: 'S', angle: 90},
    { label: 'SW', angle: 135},
    { label: 'W', angle: 180},
    { label: 'NW', angle: 235},
];

function createDirectionLabels() {
    directionLabels.forEach(({ label, angle }) => {
        const direction = document.createElement('div');
        direction.classList.add('compass__direction');
        direction.textContent = label;

        const radian = angle * (Math.PI / 180);
        const offset = 207;
        const x = Math.cos(radian) * offset;
        const y = Math.sin(radian) * offset;

        direction.style.left = `calc(50% + ${x}px)`;
        direction.style.top = `calc(50% + ${y}px)`;
        const styleAngle = angle + 90;
        direction.style.transform += `rotate(${styleAngle}deg)`;
        directionsContainer.appendChild(direction);
    });
}

createDirectionLabels();

/*const listItems = document.querySelectorAll('.whyWe__item');
const radius = 460;

listItems.forEach((item, index) => {
    const angle = (index / listItems.length) * (2 * Math.PI);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    item.style.left = `calc(50% + ${x}px)`;
    item.style.top = `calc(50% + ${y}px)`;
});*/

const listItems = document.querySelectorAll('.whyWe__item');

// Указываем фиксированные значения left и top для каждого элемента
const positions = [
    { left: '50%', top: '-15%' },     // "Наша цель"
    { left: '130%', top: '10%' },    // "Ответственность"
    { left: '140%', top: '46%' },   // "Под ключ"
    { left: '130%', top: '85%' },     // "Специалисты"
    { left: '50%', top: '120%' },   // "Качество"
    { left: '-40%', top: '85%' },    // "Проактивная позиция"
    { left: '-40%', top: '12.7%' },      // "Наша позиция"
    { left: '-50%', top: '50%' }
];

listItems.forEach((item, index) => {
    // Установка позиции для каждого элемента
    const { left, top } = positions[index];
    item.style.position = 'absolute'; // Убедитесь, что элемент имеет абсолютное позиционирование
    item.style.left = left;
    item.style.top = top;
});
