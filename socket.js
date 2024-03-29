var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var redis = new Redis();

redis.subscribe('BattleplanChange', function(err, count) {});
redis.subscribe('BattlefloorDraw', function(err, count) {});
redis.subscribe('BattlefloorDelete', function(err, count) {});
redis.subscribe('ChangeOperatorSlot', function(err, count) {});

redis.on('message', function(channel, message) {
    // console.log('Message Received: ' + message);
    message = JSON.parse(message);
    io.emit(channel + '.' + message.data.identifier + ':' + message.event, message.data);
});

http.listen(3000, function() {
    console.log('Node server is live!');
});