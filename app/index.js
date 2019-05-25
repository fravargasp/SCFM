let document = require("document");
import { HeartRateSensor } from "heart-rate";

let hrLabel = document.getElementById("hrm");
let updatedLabel = document.getElementById("updated");

// Se inicializan las variables de el entorno del ususario
hrLabel.text = "--";
updatedLabel.text = "UDFJC";

// Se crea la instancia del objeto HeartRateSensor
var hrm = new HeartRateSensor();

// Se declara el controlador de eventos 
hrm.onreading = function() {
  // Ver los valores del sensor
  console.log("Frecuencia cardiaca actual: " + hrm.heartRate);
  hrLabel.text = hrm.heartRate;
}

// Iniciar el monitor
hrm.start();
