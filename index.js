const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express();
const server = http.Server(app);
const io = socketio(server);

const title = 'Buffer Buzzer'

let data = {
  teams: new Set(),
  buzzes: new Set(),
}

const getData = () => ({
  teams: [...data.teams],
  buzzes: [...data.buzzes],
})

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('index', { title }))
app.get('/host', (req, res) => res.render('host', Object.assign({ title }, getData())))

io.on('connection', (socket) => {
  socket.on('join', (team) => {
    data.teams.add(team)
    io.emit('active', [...data.teams].length)
    console.log(`${team} joined!`)
  })

  socket.on('buzz', (team) => {
    data.buzzes.add(team)
    io.emit('buzzes', [...data.buzzes])
    console.log(`${team} buzzed in!`)
  })

  socket.on('host-clear', () => {
    data.buzzes = new Set()
    io.emit('clear')
    console.log(`Clear buzzes`)
  })
})

server.listen(80, () => console.log('Listening on 80'))
