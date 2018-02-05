var fs = require('fs');

var gpioPath = '/sys/class/gpio/';

// Create a GPIO file access:
//   echo 11 > /sys/class/gpio/export
//
// Configure the Pin Direction (In/Out):
// echo out > /sys/class/gpio/gpio11/direction
//
// Write a value to turn on the LED using the GPIO11:
//   echo 1 > /sys/class/gpio/gpio11/value

function write(pin, value) {
  var pinString = String(pin);
  var valueString = String(value);

  // open access for specific pin
  var filePath = gpioPath + 'export';
  var fd = fs.openSync(filePath, 'w');
  fs.writeSync(fd, pinString, 0, pinString.length, 0);
  closeSync(fd);

  // configure direction
  filePath = gpioPath + 'gpio' + pinString + '/direction';
  fd = fs.openSync(filePath, 'w');
  fs.writeSync(fd, 'out', 0, 3, 0);
  closeSync(fd);

  // write a value
  filePath = gpioPath + 'gpio' + pinString + '/value';
  fd = fs.openSync(filePath, 'w+');
  fs.writeSync(fd, valueString, 0, valueString.length, 0);
  closeSync(fd);
  return;
}

module.exports = {
  write: write
};
