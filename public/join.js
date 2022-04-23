const socket = io()
const body = document.querySelector('.js-body')
const form = document.querySelector('.js-join')
const joined = document.querySelector('.js-joined')
const buzzer = document.querySelector('.js-buzzer')
const joinedInfo = document.querySelector('.js-joined-info')
const editInfo = document.querySelector('.js-edit')
const chevre = document.querySelector('.chevre')

const audioElement = new Audio('chevre.mp3');

let team = ''

const getUserInfo = () => {
  team = localStorage.getItem('team') || ''
  if (team) {
    form.querySelector('[name=team]').value = team
  }
}
const saveUserInfo = () => {
  localStorage.setItem('team', team)
}

joined.style.display = 'none'


form.addEventListener('submit', (e) => {
  e.preventDefault()
  team = form.querySelector('[name=team]').value
  socket.emit('join', team)
  saveUserInfo()
  joinedInfo.innerHTML = `<i>Equipe:</i>  ${team}`
  form.style.display = 'none'
  joined.style.display = 'flex'
  body.classList.add('buzzer-mode')

  body.addEventListener('click', (e) => {
    if(buzzer.style.display === 'none') return;
    socket.emit('buzz', team)
    chevre.classList.add('show-chevre')
    chevre.classList.remove('hide-chevre')
    buzzer.style.display = 'none'
    audioElement.currentTime = 0
    try {
      audioElement.play()
      navigator.vibrate([2000])
    } catch (err){
      console.error(err)
    }
  })
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
