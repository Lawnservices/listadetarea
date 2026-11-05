let time = 14;

if (time < 12){
  document.getElementById('time').textContent = 'Buenos días';
} else if (time < 18){
  document.getElementById('time').textContent = 'Buenos tardes';
} else{
  document.getElementById('time').textContent = 'Buenos noches';
}


 
