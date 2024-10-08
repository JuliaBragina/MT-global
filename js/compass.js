const compass = document.querySelector('.compass');
const needle = document.querySelector('.compass__needle');
const directionsContainer = document.querySelector('.compass__directions');
const ticksContainer = document.querySelector('.compass__ticks');
const listItemsContainer = document.querySelector('.whyWe');
const listItems = document.querySelectorAll('.whyWe__item');

const baseRadius = 65;
const outerRadius = 178;
const compassCenter = { x: 208, y: 208 };

const majorTickCount = 4;
const minorTickCount = 28;
const totalTicks = majorTickCount + minorTickCount;
const angleStep = 360 / totalTicks;

const initialAngle = 90;
let currentAngle = initialAngle;

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

// Utility function to calculate coordinates based on angle and radius
function calculateCoordinates(angle, radius, center = compassCenter) {
    const radian = angle * (Math.PI / 180);
    return {
        x: center.x + radius * Math.cos(radian),
        y: center.y + radius * Math.sin(radian)
    };
}

function createTicks() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < totalTicks; i++) {
        const isMajorTick = i % 8 === 0;
        const tickLength = isMajorTick ? 20 : 10;
        const tickAngle = i * angleStep;

        const { x: x1, y: y1 } = calculateCoordinates(tickAngle, outerRadius);
        const { x: x2, y: y2 } = calculateCoordinates(tickAngle, outerRadius - tickLength);

        const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
        tick.setAttribute('x1', x1);
        tick.setAttribute('y1', y1);
        tick.setAttribute('x2', x2);
        tick.setAttribute('y2', y2);
        tick.setAttribute('class', isMajorTick ? 'major-tick' : 'minor-tick');
        tick.dataset.angle = tickAngle;
        fragment.appendChild(tick);
    }
    ticksContainer.appendChild(fragment);
}

function createDirectionLabels() {
    const fragment = document.createDocumentFragment();
    directionLabels.forEach(({ label, angle }) => {
        const { x, y } = calculateCoordinates(angle, 215, { x: 0, y: 0 });
        const direction = document.createElement('div');
        direction.classList.add('compass__direction');
        direction.textContent = label;
        direction.style.left = `calc(50% + ${x}px)`;
        direction.style.top = `calc(50% + ${y}px)`;
        direction.style.transform = `translate(-50%, -50%) rotate(${angle + 90}deg)`;
        fragment.appendChild(direction);
    });
    directionsContainer.appendChild(fragment);
}

function positionListItems() {
    listItems.forEach((item, index) => {
        const { left, top } = positions[index];
        Object.assign(item.style, {
            position: 'absolute',
            left,
            top
        });
    });
}


function updateNeedlePosition(event) {
    const rect = compass.getBoundingClientRect();
    const compassCenterX = rect.left + rect.width / 2;
    const compassCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(event.clientY - compassCenterY, event.clientX - compassCenterX);
    const baseX = compassCenterX + baseRadius * Math.cos(angle);
    const baseY = compassCenterY + baseRadius * Math.sin(angle);

    const offsetX = -12;
    const offsetY = -12;
    needle.style.left = `${baseX - rect.left + offsetX}px`;
    needle.style.top = `${baseY - rect.top + offsetY}px`;

    currentAngle = (angle * (180 / Math.PI) + 90) % 360;
    needle.style.transform = `translate(-50%, -100%) rotate(${currentAngle}deg)`;

    updateActiveTicks();
}

function updateActiveTicks() {
    const adjustedAngle = (currentAngle + 270) % 360;
    document.querySelectorAll('.major-tick, .minor-tick').forEach(tick => {
        const tickAngle = parseFloat(tick.dataset.angle);
        tick.classList.toggle('active', Math.abs(adjustedAngle - tickAngle) < angleStep / 2);
    });
}

let animationFrameId;
function onMouseMove(event) {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(() => updateNeedlePosition(event));
}

function init() {
    createTicks();
    createDirectionLabels();
    positionListItems();

    listItemsContainer.addEventListener('mousemove', onMouseMove);

    needle.style.transform = `translate(-50%, -100%) rotate(${initialAngle}deg)`;
}

init();
