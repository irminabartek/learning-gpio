'use strict';

var Hapi = require("hapi");
var onoff = require("onoff");
var Gpio = require('onoff').Gpio;

var port = 3000;
var host = '0.0.0.0';

function setGpioValue(pinNumber, value) {
  var gpioPin = new Gpio(pinNumber, "out");
  return gpioPin.writeSync(value);
}

var server = new Hapi.Server();
server.connection({port: port, host: host, routes: {cors: true}});

server.route({
  method: 'GET',
  path: '/api/gpio/{pin}/{value}',
  handler: function (request, reply) {
    var pin = encodeURIComponent(request.params.pin);
    var value = encodeURIComponent(request.params.value);
    console.log("GPIO endpoint called with pin number ", pin);
    var result = setGpioValue(pin, value);
    reply({ value: result }).code(200);
  }
});

server.start(function (err) {
  if (err) {
    throw err;
  }

  console.log("Server started at " + port);
});
