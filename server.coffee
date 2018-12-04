express = require('express')
socket = require('socket.io')
app = express()
server = app.listen(process.env.PORT or 8080)
console.log 'Server listening on port 8080'
app.use express.static('public')
io = socket(server)
io.sockets.on 'connection', connection
text = text: ''
connection = (socket) ->
    console.log 'a new user with id ' + socket.id + ' has entered'
    socket.emit 'newUser', text
    socket.on 'text', handleTextSent

    handleTextSent = (data) ->
        text.text = data.text
        io.sockets.emit 'text', data
        return
    return