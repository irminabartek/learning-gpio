var onoff = require("onoff");
var Gpio = require('onoff').Gpio;

var gpioPin = new Gpio(7, "out");
console.log(gpioPin.read());