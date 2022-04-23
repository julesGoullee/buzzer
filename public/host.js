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
    .map(buzz => {
      const p = buzz.split('-')
      return { name: p[0], team: p[1] }
    })
    .map(user => `<li>${user.name} on Team ${user.team}</li>`)
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

