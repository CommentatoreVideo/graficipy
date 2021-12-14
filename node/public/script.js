function creaGrafico(labels,datasets) {
  //crea grafico a linee usando chart js
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    
    // The data for our dataset
    data: {
      labels,
      datasets,
    },

    // Configuration options go here
    options: {
    }
  });
}


async function getData() {
  const response=await fetch("/dati");
  const dati=await response.json();
  return dati;
}

(async function() {
  const dati=await getData();
  let date=[];
  const datasets=[];
  for(const nazione in dati) {
    const coppie=dati[nazione];
    date.push(...coppie.map(o=>o.data));
    const dataset={}
    dataset.label=nazione;
    dataset.data=coppie.map(o=>o.casi);
    dataset.backgroundColor=randomColor();
    dataset.borderColor=randomColor();
    dataset.fill=false;
    datasets.push(dataset);
  }
  date=Array.from(new Set(date)).sort();
  creaGrafico(date,datasets);
})();

function randomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
