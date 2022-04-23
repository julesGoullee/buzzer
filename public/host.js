const socket = io()
const active = document.querySelector('.js-active')
const buzzList = document.querySelector('.js-buzzes')
const clear = document.querySelector('.js-clear')

const audioElement = new Audio('buzz.mp3');

socket.on('active', (numberActive) => {
  active.innerText = `${numberActive} joined`
})

socket.on('buzzes', (buzzes) => {
  clear.style.display = 'block'
  audioElement.currentTime = 0;
  audioElement.play();

  buzzList.innerHTML = buzzes
    .map(team => `<li>${team}</li>`)
    .join('')
})

socket.on('clear', () => {
  clear.style.display = 'none'
  buzzList.innerHTML = ''
})

clear.addEventListener('click', () => {
  audioElement.play();
  audioElement.pause();
  socket.emit('host-clear')
})

