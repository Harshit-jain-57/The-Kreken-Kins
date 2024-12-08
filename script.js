const depthRanges = [
    { id: 'sunlight-zone', min: 0, max: 200 },
    { id: 'twilight-zone', min: 200, max: 1000 },
    { id: 'midnight-zone', min: 1000, max: 3800 },
    { id: 'abyssal-zone', min: 3800, max: 6000 },
    { id: 'trenches-zone', min: 6000, max: 12000 },
];
const depthDisplay = document.getElementById('depth-display');
const container = document.querySelector('.container');
const sections = document.querySelectorAll('.container > div[data-zone]');
const scaleItems = document.querySelectorAll('.depth-scale li');
document.querySelector('.dive-deeper').addEventListener('click', () => {
    document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
});
const calculateDepth = (scrollTop, sectionOffsetTop, sectionHeight, rangeMin, rangeMax) => {
    const sectionScrollPosition = Math.max(0, scrollTop - sectionOffsetTop);
    const scrollFraction = Math.min(sectionScrollPosition / sectionHeight, 1);
    return Math.round(rangeMin + scrollFraction * (rangeMax - rangeMin));
};
const updateDepth = () => {
    const containerScrollTop = container.scrollTop;
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < container.clientHeight / 2 && rect.bottom > container.clientHeight / 2) {
            const { min, max } = depthRanges[index];
            const sectionHeight = section.offsetHeight;
            const sectionOffsetTop = section.offsetTop;
            const currentDepth = calculateDepth(
                containerScrollTop,
                sectionOffsetTop,
                sectionHeight,
                min,
                max
            );
            depthDisplay.textContent = `Depth: ${currentDepth}m`;
            scaleItems.forEach((item, idx) => {
                item.classList.toggle('active', idx === index);
            });
        }
    });
};

container.addEventListener('scroll', updateDepth);
updateDepth();
scaleItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const section = sections[index];
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
const scrollImage = document.getElementById('scroll-image');
const modal = document.getElementById('image-modal');
const closeModal = document.getElementById('close-modal');
window.addEventListener('scroll', () => {
    if (scrollImage) {
        const imagePosition = scrollImage.getBoundingClientRect();
        if (imagePosition.top < window.innerHeight && imagePosition.bottom >= 0) {
            scrollImage.classList.add('visible');
        }
    }
});
if (scrollImage) {
    scrollImage.addEventListener('click', () => {
        if (modal) modal.style.display = 'flex';
    });
}
if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
    });
}
if (modal) {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
