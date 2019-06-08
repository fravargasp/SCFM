import * as messaging from "messaging";

function guardarRitmo(dato) {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://ritmocardiaco.fr-1.paas.massivegrid.net:8080/rest/rc";

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.response;
			//console.log(JSON.parse(result));
			mostrarMensaje(JSON.parse(result));
		}
	};
	
	xmlhttp.open("POST", url, true);
	xmlhttp.withCredentials = false;
	xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	
	var data = {};
	data.id = 1;
	data.medicion = dato;
	var jsonRitmo = JSON.stringify(data);
	console.log(jsonRitmo);
	xmlhttp.send(jsonRitmo);
}

function mostrarMensaje(result) {
	// Se obtiene el mensaje del JSON: 
	console.log('Mensaje: ' + result.message);
}

messaging.peerSocket.onmessage = function(evt) {
  if (evt.data && evt.data.command == "ritmo") {
    console.log("dato: " + evt.data.dato);
    guardarRitmo(evt.data.dato);
  }
}

messaging.peerSocket.onerror = function(err) {  
  console.log("Error de conexion: " + err.code + " - " + err.message);
}