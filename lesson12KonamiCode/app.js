const { log } = console;
const secretFunc = () => {
    let song = null;
    return () => {
       if (song){
            song.currentTime = 0; 
       }
       else {
       song = new Audio('Balthazar - Decency.mp3');
       }
       song.play();
    }
}
const audioPlayerFunc = secretFunc();
const eventHandler = () => {
    const secretCode = 'playsong';
    let pressed = [];
    return (e) => {
        pressed.push(e.key);
        pressed.splice(-secretCode.length-1 , pressed.length-secretCode.length);
        if(pressed.join('').includes(secretCode)){
            console.log('%c Balthazar - Decency is currently playing', 'background-color:olive; font-size:20px;color:blue;text-transform:uppercase');
            audioPlayerFunc();
        }
    }
}
document.addEventListener('keyup', eventHandler());