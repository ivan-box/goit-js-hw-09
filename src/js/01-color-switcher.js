let btnStart = document.querySelector('[data-start]');
let btnStop = document.querySelector('[data-stop]');
let bodyColor = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let idInterval;
btnStart.addEventListener('click', changeColor);
btnStop.disabled = true;
function changeColor(event) {
  event.target.disabled = true;
  btnStop.disabled = false;
  idInterval = setInterval(
    () => (bodyColor.style.backgroundColor = getRandomHexColor()),
    1000
  );
}
// btnStart.disabled = true;

btnStop.addEventListener('click', stopColor);
function stopColor(event) {
  event.target.disabled = true;
  btnStart.disabled = false;
  clearTimeout(idInterval);
}
