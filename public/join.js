const socket = io()
const body = document.querySelector('.js-body')
const form = document.querySelector('.js-join')
const joined = document.querySelector('.js-joined')
const buzzer = document.querySelector('.js-buzzer')
const joinedInfo = document.querySelector('.js-joined-info')
const editInfo = document.querySelector('.js-edit')
const chevre = document.querySelector('.chevre')

const audioElement = new Audio('sheep.mp3');

let user = {}

const getUserInfo = () => {
  user = JSON.parse(localStorage.getItem('user')) || {}
  if (user.name) {
    form.querySelector('[name=name]').value = user.name
    form.querySelector('[name=team]').value = user.team
  }
}
const saveUserInfo = () => {
  localStorage.setItem('user', JSON.stringify(user))
}

joined.style.display = 'none'


form.addEventListener('submit', (e) => {
  e.preventDefault()
  user.name = form.querySelector('[name=name]').value
  user.team = form.querySelector('[name=team]').value
  if (!user.id) {
    user.id = Math.floor(Math.random() * new Date())
  }
  socket.emit('join', user)
  saveUserInfo()
  joinedInfo.innerHTML = `<i>Joueur:</i> ${user.name}<br/><i>Equipe:</i>  ${user.team}`
  form.style.display = 'none'
  joined.style.display = 'flex'
  body.classList.add('buzzer-mode')
})

buzzer.addEventListener('click', (e) => {
  socket.emit('buzz', user)
  buzzer.style.display = 'none'
  navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100])
  audioElement.currentTime = 0
  audioElement.play()
  chevre.classList.remove('show-chevre')
  chevre.classList.add('show-chevre')
})

socket.on('clear', () => {
  chevre.classList.remove('show-chevre')
  chevre.classList.add('hide-chevre')
  buzzer.style.display = 'block'
})
// editInfo.addEventListener('click', () => {
//   joined.classList.add('hidden')
//   form.classList.remove('hidden')
//   body.classList.remove('buzzer-mode')
// })

getUserInfo()
