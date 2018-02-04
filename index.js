'use strict';

var Hapi = require("hapi");
var onoff = require("onoff");
var Gpio = require('onoff').Gpio;

var port = 3000;
var host = '0.0.0.0';

function toggleGpioPin(pinNumber){
    var gpioPin = new Gpio(pinNumber, "read");
    if (gpioPin.readSync() === 0) {
        gpioPin.writeSync(1);
        return 1;
    } else {
        gpioPin.writeSync(0);
        return 0;
    }
}

var server = new Hapi.Server();
server.connection({port: port, host: host, routes: {cors: true}});

server.route({
    method: 'GET',
    path: '/api/gpio/{pin}',
    handler: function(request, reply){
        var pin = encodeURIComponent(request.params.pin);
        console.log("GPIO endpoint called with pin number ", pin);
        var result = toggleGpioPin(pin);
        reply({value: result}).code(200);
    }
});

server.start(function(err){
    if(err){
        throw err;
    }

    console.log("Server started at " + port);
});
