#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./server');
var debug = require('debug')('express-mysql-rest:server');
var http = require('http');
require("dotenv").config();
var Logger = require("./logger");
var log = new Logger();


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
var io = require('socket.io')(server);

const ChatApplication = require('./models/appModel');
var users = [];
var connections = [];
var allUsers =  ChatApplication.getAllusersAsync();
var admin = ChatApplication.adminUserAsync();

io.on('connection', function(socket){
    console.log('User Conncetion');
    socket.on('connect user', function(user){
        console.log("Connected user ");
        io.emit('connect user', user);
    });
  
    socket.on('on typing', function(typing){
        console.log("Typing.... ");
        io.emit('on typing', typing);
    });
  
    socket.on('chat message', function(msg){
        console.log("Message " + msg['message']);
        io.emit('chat message', msg);
    });
});
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            log.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            log.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
    log.info('Listening on ' + bind);
}