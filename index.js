// dependencies
const SerialPort = require('serialport')
const robot = require('robotjs')

// definition for consts
const targetCommPortPrefix = '';

// Find the Serial Port
let targetPort = '';
SerialPort.list((err, ports) => {
    if (err) console.error('error occured while loading the serial port list', err);

    // Find Arduino Port
    ports.forEach(port => {
        if (~port.comName.indexOf(targetCommPortPrefix)) {
            targetPort = port.comName
        }
    })
})

// Open Serial Port
const port = new SerialPort(targetPort, {
    baudRate: 9600,
    autoOpen: true
})

// Receive Data and Space Key event accordingly
port.on('data', (data) => {
    if (data === 0x20) {
        robot.keyTap('space')
    }
})

// setTimeout(() => {
//     // robot.keyToggle('command', 'down');
//     robot.keyTap('space');
// }, 3000)
