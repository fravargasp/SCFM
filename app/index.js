import document from "document";
import { HeartRateSensor } from "heart-rate";
import * as messaging from "messaging";

let ritmo = document.getElementById("ritmo");
let label = document.getElementById("label");

ritmo.text = "---";
label.text = "UDFJC";

var ritmoc = new HeartRateSensor();

ritmoc.onreading = function() {
  ritmo.text = ritmoc.heartRate;
}

ritmoc.start();

function enviarRc(ritmo) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {    
    messaging.peerSocket.send({
      command: 'ritmo',
      dato: ritmoc.heartRate
    });
  }
}

messaging.peerSocket.onopen = function() {  
  enviarRc(ritmoc.heartRate);
}

messaging.peerSocket.onerror = function(err) {
  console.log("Error de conexion: " + err.code + " - " + err.message);
}

setInterval(enviarRc, 1 * 1000 * 60);