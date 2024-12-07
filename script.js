const sections = document.querySelectorAll('.container > div[data-zone]');
const scaleItems = document.querySelectorAll('.depth-scale li');
const updateActiveZone = () => {
    let currentIndex = -1;
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            currentIndex = index;
        }
    });
    scaleItems.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
};
document.querySelector('.container').addEventListener('scroll', updateActiveZone);
updateActiveZone();
