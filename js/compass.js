
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

const initialAngle = 90;
let currentAngle = initialAngle;

function createTicks() {
    let currentAngle = 0;

    for (let i = 0; i < totalTicks; i++) {
        const isMajorTick = i % 8 === 0;
        const tickLength = isMajorTick ? 20 : 10;

        let x1 = 208 + outerRadius * Math.cos(currentAngle * Math.PI / 180);
        let y1 = 208 + outerRadius * Math.sin(currentAngle * Math.PI / 180);
        let x2 = 208 + (outerRadius - tickLength) * Math.cos(currentAngle * Math.PI / 180);
        let y2 = 208 + (outerRadius - tickLength) * Math.sin(currentAngle * Math.PI / 180);

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
needle.style.transform = `translate(-50%, -100%) rotate(${initialAngle}deg)`;

document.querySelector('.whyWe').addEventListener('mousemove', (event) => {
    const rect = compass.getBoundingClientRect();
    const compassCenterX = rect.left + rect.width / 2;
    const compassCenterY = rect.top + rect.height / 2;

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const angle = Math.atan2(mouseY - compassCenterY, mouseX - compassCenterX);

    const baseX = compassCenterX + baseRadius * Math.cos(angle);
    const baseY = compassCenterY + baseRadius * Math.sin(angle);

    const offsetX = -12;
    const offsetY = -12;
    needle.style.left = `${baseX - rect.left + offsetX}px`;
    needle.style.top = `${baseY - rect.top + offsetY}px`;

    currentAngle = angle * (180 / Math.PI) + 90; 
    needle.style.transform = `translate(-50%, -100%) rotate(${currentAngle}deg)`;

    document.querySelectorAll('.major-tick, .minor-tick').forEach(tick => {
        const tickAngle = parseFloat(tick.dataset.angle);
        const adjustedAngle = (currentAngle + 360 - 90) % 360;

        if (Math.abs(adjustedAngle - tickAngle) < angleStep / 2) {
            tick.classList.add('active');
        } else {
            tick.classList.remove('active');
        }
    });
});

const directionLabels = [
    { label: 'N', angle: 90 },
    { label: 'NE', angle: 45 },
    { label: 'E', angle: 0 },
    { label: 'SE', angle: 315 },
    { label: 'S', angle: 270 },
    { label: 'SW', angle: 225 },
    { label: 'W', angle: 180 },
    { label: 'NW', angle: 135 },
];

function createDirectionLabels() {
    directionLabels.forEach(({ label, angle }) => {
        const direction = document.createElement('div');
        direction.classList.add('compass__direction');
        direction.textContent = label;

        const radian = angle * (Math.PI / 180);
        const offset = 215;
        const x = Math.cos(radian) * offset;
        const y = Math.sin(radian) * offset;

        direction.style.left = `calc(50% + ${x}px)`;
        direction.style.top = `calc(50% + ${y}px)`;

        direction.style.transform = `translate(-50%, -50%) rotate(${angle + 90}deg)`;
        directionsContainer.appendChild(direction);
    });
}

createDirectionLabels();


const listItems = document.querySelectorAll('.whyWe__item');

const positions = [
    { left: '50%', top: '-120px' },
    { left: '130%', top: '10%' },
    { left: '140%', top: '46%' },
    { left: '130%', top: '85%' },
    { left: '50%', top: '120%' },
    { left: '-40%', top: '85%' },
    { left: '-40%', top: '12.7%' },
    { left: '-50%', top: '50%' }
];

listItems.forEach((item, index) => {
    const { left, top } = positions[index];
    item.style.position = 'absolute';
    item.style.left = left;
    item.style.top = top;
});

listItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.classList.add('whyWe__item_color_pink');
    });

    item.addEventListener('mouseout', () => {
        item.classList.remove('whyWe__item_color_pink');
    });
});
