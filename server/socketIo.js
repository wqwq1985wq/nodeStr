var server = require('http').createServer()
var io = require('socket.io')(server)

server.listen(3001, function () {
  console.log('server starting...3001')
})

// 监听连接
io.on('connection', function (socket) {
    console.log("connected")
    // 玩家登陆
    socket.on('login', function (name) {
      var flag = players.some(function (value) {
        return value.name === name
      })
      if (flag) {
        socket.emit('home', {'flag': true})
      } else {
        console.log(name + '已登陆')
        // 创建玩家
        new Player(socket, name)
        // 将玩家放进数组中
        // players.push(player)
        socket.emit('home', {'playerCount': playerCount, 'name': name})
      }
    })
    
  })
// 当服务器关闭的时候
io.on('close', function (socket) {
    console.log('服务器关闭')
  })