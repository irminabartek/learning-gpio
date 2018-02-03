'use strict';

var Hapi = require("hapi");
var onoff = require("onoff");
var Gpio = require('onoff').Gpio;

var server = new Hapi.Server();
var port = 3000;

function toggleGpioPin(mode, pinNumber, value){
    var direction;
    if(mode === 'write'){
        direction = 'out';
    }else if(mode === 'read'){
        direction = 'in';
    }else{
        throw new Error('Unsupported GPIO mode');
    }
    var gpioPin = new Gpio(pinNumber, direction);
    if (gpioPin.readSync() === 0) {
        gpioPin.writeSync(value);
    } else {
        gpioPin.writeSync(0);
    }
    //gpioPin.unexport();
}

server.connection({port: port, host: '0.0.0.0'});

server.route({
    method: 'GET',
    path: '/api/gpio/{mode}/{pin}/{value}',
    handler: function(request, reply){
        var mode = encodeURIComponent(request.params.mode);
        var pin = encodeURIComponent(request.params.pin);
        var value = parseInt(encodeURIComponent(request.params.value));
	toggleGpioPin(mode, pin, value);
        reply({mode: mode, pin: pin}).code(200);
    }
});

server.start(function(err){
    if(err){
        throw err;
    }

    console.log("Server started at "+port);
});
