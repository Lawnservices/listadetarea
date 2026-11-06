let time = 14;
let momento;
if (time < 12){
   momento = 'manana';
} else if (time < 18){
   momento = 'tarde';
} else{
   momento = 'noche';
}


let idioma = localStorage.getItem("idioma") || "es";

document.getElementById("time").textContent =
    traduccionesTareas[idioma].time[momento];


// let time = new Date().getHours();

 