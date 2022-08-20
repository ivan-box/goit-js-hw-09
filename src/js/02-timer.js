import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      Notify.success('thank');
    }
  },
};

refs.startBtn.addEventListener('click', timerGo);
function timerGo() {
  const intervalId = setInterval(() => {
    const dataTime = new Date(refs.inputDate.value).getTime() - Date.now();
    const { days, hours, minutes, seconds } = convertMs(dataTime);
    if (dataTime >= 0) {
      refs.dataDays.textContent = addLeadingZero(days);
      refs.dataHours.textContent = addLeadingZero(hours);
      refs.dataMinutes.textContent = addLeadingZero(minutes);
      refs.dataSeconds.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}

flatpickr(refs.inputDate, options);
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
