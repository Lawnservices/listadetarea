let time = 14;
let momento;
if (time < 12){
   momento = 'Buenas días';
} else if (time < 18){
   momento = 'Buenas tardes';
} else{
   momento = 'Buenas noches';
}


let idioma = localStorage.getItem("idioma") || "es";

document.getElementById("time").textContent =
    traduccionesTareas[idioma].time[momento];


// let time = new Date().getHours();

// if (time < 12) {
//     document.getElementById('time').textContent = 'Buenos días';
// } else if (time < 18) {
//     document.getElementById('time').textContent = 'Buenas tardes';
// } else {
//     document.getElementById('time').textContent = 'Buenas noches';
// }
