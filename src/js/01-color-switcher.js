let btnStart = document.querySelector('[data-start]');
let btnStop = document.querySelector('[data-stop]');
let bodyColor = document.querySelector('body');

let idInterval;
btnStart.addEventListener('click', changeColor);
btnStop.disabled = true;
function changeColor(event) {
  event.target.disabled = true;
  btnStop.disabled = false;
  idInterval = setInterval(
    () =>
      (bodyColor.style.backgroundColor = `#${Math.floor(
        Math.random() * 16777215
      ).toString(16)}`),
    1000
  );
}

btnStop.addEventListener('click', stopColor);
function stopColor(event) {
  event.target.disabled = true;
  btnStart.disabled = false;
  clearTimeout(idInterval);
}
