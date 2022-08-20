import { Notify } from 'notiflix/build/notiflix-notify-aio';

const submitBtn = document.querySelector('.submit');
const form = document.querySelector('.form');
const firstDelay = document.querySelector('[name="delay"]');
const delayStep = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

submitBtn.addEventListener('click', onSubmitClick);

function onSubmitClick(e) {
  e.preventDefault();
  for (let i = 0; i < amount.value; i++) {
    createPromise(i + 1, Number(firstDelay.value) + Number(delayStep.value) * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  form.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
