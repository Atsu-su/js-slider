'use strict';

// 残り移動距離の一般化（オブジェクトからの取得）

const buttons = document.querySelectorAll('.button');
const buttonLeft = document.querySelector('.button-left');
const buttonRight = document.querySelector('.button-right');
const outer = document.querySelector('.outer');
const outerWidth = parseInt(window.getComputedStyle(outer).width);
const inner = document.querySelector('.inner');
const innerGap = parseInt(window.getComputedStyle(inner).gap);
const elements = document.querySelectorAll('.element').length;
const element = document.querySelector('.element');
const elementWidth = parseInt(window.getComputedStyle(element).width);
const distance = innerGap + elementWidth;
const circleWrapper = document.querySelector('.circle-wrapper');
const innerInitPos = -(elementWidth * 3 + innerGap * 2) / 2;

const duration = 0.5;

let count = 0;

// -----------------------
// Function
// -----------------------

const setProp = (direction) => {
  document.documentElement.style.setProperty('--start', - distance * count + 'px');
  direction === 'left' ?
  document.documentElement.style.setProperty('--end', (-distance * count - distance) + 'px') :
  document.documentElement.style.setProperty('--end', (-distance * count + distance) + 'px')
}

const btnDisabled = (bool) => {
  bool === true ?
  buttons.forEach((button) => { button.disabled = true }):
  buttons.forEach((button) => { button.disabled = false });
}

const slide = () => {
  btnDisabled(true);
  inner.classList.add('animation-slide');
  setTimeout(() => {
    inner.style.transform = 'translate(' + innerInitPos + 'px, -50%)' +' translateX(' + - distance * count + 'px)';
    inner.classList.remove('animation-slide');
    btnDisabled(false);
  }, duration * 1000);
}

const createCircles = () => {
  for (let i = 1; i <= elements - 2; ++i) {
    const newCircle = document.createElement('div');
    newCircle.classList.add('circle', 'circle' + i);
    circleWrapper.appendChild(newCircle);
  }
}

const setOpacity = () => {
  const circleSelected = document.querySelector('.circle-selected');
  const circle = document.querySelector('.circle' + (count + 1));
  if (circleSelected !== null) {
    circleSelected.classList.remove('circle-selected');
  }
  circle.classList.add('circle-selected');
}

const setBtnStatus = () => {
  if (count === elements - 3) buttonLeft.style.visibility = 'hidden';
  if (count === 0) buttonRight.style.visibility = 'hidden';

  if (count < elements - 3 && count > 0) {
    buttonLeft.style.visibility = 'visible';
    buttonRight.style.visibility = 'visible';
  }
}

// -----------------------
// Main
// -----------------------

window.onload = () => {

  setPageTitle();

  document.documentElement.style.setProperty('--duration', duration + 's');
  document.documentElement.style.setProperty('--position', innerInitPos + 'px');
  createCircles();
  setOpacity();
  setBtnStatus();

  // -----------------------
  // イベントの追加
  // -----------------------

  buttonLeft.addEventListener('click', () => {
    if (count < elements - 3) {
      setProp('left');
      ++count;
      slide();
      setOpacity();
    }
    setBtnStatus();
  });

  buttonRight.addEventListener('click', () => {
    if (count > 0) {
      setProp('right');
      --count;
      slide();
      setOpacity();
    }
    setBtnStatus();
  });
}