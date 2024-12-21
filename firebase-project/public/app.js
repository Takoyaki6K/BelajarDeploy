// Complete Project Details at: https://RandomNerdTutorials.com/


// Database Paths
var dataDayaPath = 'data/Daya_Mixer(Watt)';
var dataSuhuPath = 'data/Suhu_Mixer(Celcius)';
var dataOvenPath = 'data/Suhu_Oven(Celcius)';
var kondisiOvenPath = 'kondisi/Oven';

// Get a database reference 
const databaseDaya = database.ref(dataDayaPath);
const databaseSuhu = database.ref(dataSuhuPath);
const databaseOven = database.ref(dataOvenPath);
const databasekondisiOven = database.ref(kondisiOvenPath);

// Variables to save database current values
let DayaReading;
let SuhuReading;
let OvenReading;
let KondisiOvenReading;



// Fungsi untuk menampilkan kotak peringatan
let alertShown = false;


// Attach an asynchronous callback to read the data
databaseSuhu.on('value', (snapshot) => {
  SuhuReading = snapshot.val();
  // SuhuReading = 91; // Nilai sementara untuk testing
  console.log(SuhuReading);
  
  // Cek jika SuhuReading lebih dari 40
  if (SuhuReading > 40) {
    // Tampilkan indikator "Off", sembunyikan "On"
    document.getElementById('indicator-mixer-on-1').style.display = "block"; // Diperbarui
    document.querySelector('#statusSuhuMixer').style.display = "block"; // Diperbarui
    
    document.getElementById('indicator-mixer-off-1').style.display = "none"; // Diperbarui
    document.querySelector('#indicator-mixer-off-1 + span').style.display = "none"; // Diperbarui
  } else {
    // Tampilkan indikator "On", sembunyikan "Off"
    document.getElementById('indicator-mixer-on-1').style.display = "none"; // Diperbarui
    document.querySelector('#statusSuhuMixer').style.display = "none"; // Diperbarui

    document.getElementById('indicator-mixer-off-1').style.display = "block"; // Diperbarui
    document.querySelector('#indicator-mixer-off-1 + span').style.display = "block"; // Diperbarui
  }

  // Jika SuhuReading lebih dari 90, panggil fungsi showCustomAlert()
  if (SuhuReading > 90 && !alertShown) {
    showCustomAlert("suhu mixer melebihi 90 derajat");  // Panggil fungsi alert khusus
  }

  // Update tampilan suhu
  document.getElementById("temperature-mixer").innerHTML = SuhuReading; // Diperbarui

  
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});


databaseDaya.on('value', (snapshot) => {
  DayaReading = snapshot.val();
  // DayaReading = 91
  console.log(DayaReading);
  if (DayaReading > 10) {
    // Tampilkan indikator "Off", sembunyikan "On"
    document.getElementById('indicator-mixer-on-2').style.display = "block"; // Diperbarui
    document.querySelector('#statusSpeedMixer').style.display = "block"; // Diperbarui

    document.getElementById('indicator-mixer-off-2').style.display = "none"; // Diperbarui
    document.querySelector('#indicator-mixer-off-2 + span').style.display = "none"; // Diperbarui
  } else {
    // Tampilkan indikator "On", sembunyikan "Off"
    document.getElementById('indicator-mixer-on-2').style.display = "none"; // Diperbarui
    document.querySelector('#statusSpeedMixer').style.display = "none"; // Diperbarui

    document.getElementById('indicator-mixer-off-2').style.display = "block"; // Diperbarui
    document.querySelector('#indicator-mixer-off-2 + span').style.display = "block"; // Diperbarui
  }
  document.getElementById("speed-value").innerHTML = DayaReading; // Diperbarui
  if (DayaReading >= 100 && !alertShown) {

    showCustomAlert('Daya Melampaui 100 persen kapasitas mesin');

  }
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});

databaseOven.on('value', (snapshot) => {
  OvenReading = snapshot.val();
  // OvenReading = 91
  console.log(OvenReading);
  if (OvenReading > 40) {
    // Tampilkan indikator "Off", sembunyikan "On"
    document.getElementById('oven-on').style.display = "block"; // Diperbarui
    document.querySelector('#statusSuhuOven').style.display = "block"; // Diperbarui
    

    document.getElementById('oven-off').style.display = "none"; // Diperbarui
    document.querySelector('#oven-off + span').style.display = "none"; // Diperbarui

  } else {
    // Tampilkan indikator "On", sembunyikan "Off"
    document.getElementById('oven-on').style.display = "none"; // Diperbarui
    document.querySelector('#statusSuhuOven').style.display = "none"; // Diperbarui

    document.getElementById('oven-off').style.display = "block"; // Diperbarui
    document.querySelector('#oven-off + span').style.display = "block"; // Diperbarui
  }
  document.getElementById("temperature-value-oven").innerHTML = OvenReading; // Diperbarui

  if (OvenReading >= 90 && !alertShown) {
    showCustomAlert('Suhu oven melebihi 90 derajat');

  }
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});

databasekondisiOven.on('value', (snapshot) => {
  KondisiOvenReading = snapshot.val();
  console.log(KondisiOvenReading);
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});


// Fungsi untuk menampilkan kotak peringatan
function showCustomAlert(message) {
  const customAlert = document.querySelector('.alert-box');
  const alertMessage = document.getElementById('alertMessage');
  alertMessage.innerText = message;
  customAlert.style.display = 'block';
  alertShown = true;
  playAudio();
}
function playAudio() {
  var audio1 = document.getElementById("audio1"); // Gunakan ID audio1
  audio1.volume = 0.1;
  audio1.play();

}

function pauseAudio() {
  var audio1 = document.getElementById("audio1"); // Gunakan ID audio1
  audio1.pause();
}

// Fungsi untuk menyembunyikan kotak peringatan
function hideCustomAlert() {
  const customAlert = document.getElementById('customAlert');
  customAlert.style.display = 'none';
  alertShown = false; // Reset agar alert bisa muncul lagi
  // pauseAudio()
}

// Event listener untuk tombol "OK" pada kotak peringatan
document.getElementById('okAlert').addEventListener('click', hideCustomAlert);

// Event listener untuk menutup alert saat klik di luar kotak
window.addEventListener('click', function (event) {
  const customAlert = document.getElementById('customAlert');
  if (event.target === customAlert) {
      hideCustomAlert();
      
  }
});

$(document).ready(function(){
  $(".slideBtn").click(function(){    
    if($("#sidenav").width() == 0){      
        document.getElementById("sidenav").style.width = "250px";
        document.getElementById("main").style.paddingRight = "250px";
        document.getElementById("slidebtn").style.paddingRight = "250px";
    }else{
        document.getElementById("sidenav").style.width = "0";
        document.getElementById("main").style.paddingRight = "0";
        document.getElementById("slidebtn").style.paddingRight = "0";
    }
  });
});
// Footer
function updateDateTime() {
    var liveDate = document.getElementById('live-date');

    var currentDate = new Date();

    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };

    var formattedDate = currentDate.toLocaleDateString('en-US', options);

    liveDate.textContent = formattedDate;
}

// Variabel global untuk data chart
var gauge1, gauge2, gauge3;

// Fungsi untuk menggambar chart
function drawChart() {
    // Inisialisasi gauge
    gauge1 = new Gauge(document.getElementById("gauge1")).setOptions({
        angle: 0.2, // The span of the gauge arc
        lineWidth: 0.44, // The line thickness
        radiusScale: 0.5, // Relative radius
        pointer: {
            length: 0.8, // Relative to gauge radius
            strokeWidth: 0.035, // The thickness
            color: '#000000' // Pointer color
        },
        limitMax: false, // If false, the max value will be the value of the max
        limitMin: false, // If true, the min value will be 0
        highDpiSupport: true, // High resolution support
        staticLabels: {
            font: "15px Helvetica, Arial", // Specifies font
            labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // Labels
            color: "#000000", // Label color
            fractionDigits: 0 // Optional: numerical precision
        },
        staticZones: [
            { strokeStyle: "#30B32D", min: 0, max: 40 }, // Green
            { strokeStyle: "#FFDD00", min: 40, max: 90 }, // Yellow
            { strokeStyle: "#F03E3E", min: 90, max: 100 } // Red
        ],
      
        strokeColor: "#000000" // Color of the gauge border
    });
    gauge1.set(0); // Set initial value

    gauge2 = new Gauge(document.getElementById("gauge2")).setOptions({
        angle: 0.2,
        lineWidth: 0.44,
        radiusScale:  0.5,
        pointer: {
            length: 0.8,
            strokeWidth: 0.035,
            color: '#000000'
        },
        limitMax: false,
        limitMin: false,
        highDpiSupport: true,
        staticLabels: {
            font: "15px Helvetica, Arial",
            labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110],
            color: "#000000",
            fractionDigits: 0
        },
        staticZones: [
            { strokeStyle: "#30B32D", min: 0, max: 10 }, // Green
            { strokeStyle: "#FFDD00", min: 10, max: 100 }, // Yellow
            { strokeStyle: "#F03E3E", min: 100, max: 110 } // Red
        ],
       
        strokeColor: "#000000"
    });
    gauge2.set(0); // Set initial value

    gauge3 = new Gauge(document.getElementById("gauge3")).setOptions({
        angle: 0.15,
        lineWidth: 0.44,
        radiusScale:  0.5,
        pointer: {
            length: 0.8,
            strokeWidth: 0.035,
            color: '#000000'
        },
        limitMax: false,
        limitMin: false,
        highDpiSupport: true,
        staticLabels: {
            font: "15px Helvetica, Arial",
            labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            color: "#000000",
            fractionDigits: 0
        },
        staticZones: [
            { strokeStyle: "#30B32D", min: 0, max: 40 }, // Green
            { strokeStyle: "#FFDD00", min: 40, max: 90 }, // Yellow
            { strokeStyle: "#F03E3E", min: 90, max: 100 } // Red
        ],
       
        strokeColor: "#000000"
    });
    gauge3.set(0); // Set initial value

    // Update the gauges every second
    setInterval(function() {
        if (typeof SuhuReading !== 'undefined') {
            gauge1.set(SuhuReading);
        }
    }, 1000);

    setInterval(function() {
        if (typeof DayaReading !== 'undefined') {
            gauge2.set(DayaReading);
        }
    }, 1000);

    setInterval(function() {
        if (typeof OvenReading !== 'undefined') {
            gauge3.set(OvenReading);
        }
    }, 1000);
}

window.addEventListener('resize', function() {
    drawChart();
});

// Call the drawChart function to initialize the gauges
drawChart();


// Update the date and time every second
setInterval(updateDateTime, 1000);
