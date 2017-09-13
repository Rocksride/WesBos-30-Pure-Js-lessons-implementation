const panels = document.querySelectorAll('.panel');

const toggleOpen = (panel) => () => {
    panel.classList.toggle('open');
};
const toggleActiveOpen = (panel) => (e) => {
    if (e.propertyName.includes('flex')){
        panel.classList.toggle('open-active');
    }
};
panels.forEach(panel => {
    panel.addEventListener('click', toggleOpen(panel));
    panel.addEventListener('transitionend', toggleActiveOpen(panel));
} );