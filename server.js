// initialization of gpio headers
let Gpio = require('onoff').Gpio; 
let LED = new Gpio(4, 'out'); 
let blinkInterval = setInterval(blinkLED, 500); 

const blinkLED = () => {
  if (LED.readSync() === 0) {
    LED.writeSync(1); 
  } else {
    LED.writeSync(0); 
 }
}

const endBlink = () => { 
  clearInterval(blinkInterval); 
  LED.writeSync(0); 
  LED.unexport();
}
setTimeout(endBlink, 10000);


let express = require('express'); 
let app = express();
let path = require('path');
let gpio = require('rpi-gpio');

//setting output pin
gpio.setup(7, gpio.DIR_OUT);

//setting api engines and layouts
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));

app.get('/', function(req, res){ 
  res.sendFile('index.html')
});


// app.post('/api/led/on', function(req, res){

// gpio.write(7, true, function(err) {
//         if (err) throw err;
//         console.log('Written True to pin');

// console.log(path.join(__dirname, 'public'));

// return res.render('index', {status: "Led is On"});

//     });

// });


// app.post('/api/led/off', function(req, res){

// gpio.write(7, false, function(err) {


//         if (err) throw err;

//         console.log('Written False to pin');

// console.log(path.join(__dirname, 'public'));

// return res.render('index',{status: "Led is Off"});

//     });

// });


app.listen(3000, function () {

  console.log('Server Started on Port: 3000!')

})