const canvas = document.querySelector('#paint');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
context.lineCap='round';
context.lineJoin ='round';
let hue = 0;
let direction = true;
let width = 10;
context.lineWidth = width;
context.globalCompositeOperation='multiply';

let [lastX, lastY ] = [0, 0];
let isDrawing = false;
const draw = (e) => {
    if (isDrawing) {
        context.lineWidth = width;
        
        context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(e.offsetX,e.offsetY);
        context.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
        if(hue> 360){
            hue = 0;
        }
        else {
          hue++;
        }
        if (width > 100 || width < 10) {
            direction = !direction;
        }
        if(direction) {
            width++;
        }
        else {
            width--;
        }

    }
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});
canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});