
// Capturando los datos de la api
let valorDolar
let valorEuro

async function getConversorMonedas(){
    try{
    const res = await fetch("https://mindicador.cl/api/")
    const dataConversor = await res.json()
    valorDolar = dataConversor.dolar.valor
    valorEuro = dataConversor.euro.valor
    }
    catch(error){
        imprimirResultado.innerHTML=`Error en el sistema: ${error.message}`
    }
}

getConversorMonedas()

// Declarando variables y creando el evento click en el botón

let buscarDato = document.getElementById("btn_buscar")
let imprimirResultado = document.getElementById("resultado")
let valorEndpointGrafica = ""

buscarDato.addEventListener("click", ()=>{

let selectMoneda = document.getElementById("select_moneda").value
let pesos = document.getElementById("ingresar_pesos").value
let resultado


// Empleando las condiciones, calculando el valor y cambiando el DOM mediante innerHTML

if (selectMoneda=="dolar"){
    resultado = pesos / valorDolar
    imprimirResultado.innerHTML=`Resultado: $ ${resultado}`
}
else if (selectMoneda=="euro"){
    resultado = pesos / valorEuro
    imprimirResultado.innerHTML=`Resultado: € ${resultado}`
}
})

// Creando el gráfico Dólares
async function getDataHistorica(){ 
    const endpoint = "https://mindicador.cl/api/dolar";
    const res = await fetch(endpoint);
    const monedas = await res.json();
    return monedas;
}

function ConfiguracionGrafica(monedas){
    const tipoDeGrafica = "line";
    // se usa substr para tomar solo los 10 primeros dígitos de la fecha considerando que el primer dígito está en la ubicación 0
    const fechas = monedas.serie.map((moneda)=>moneda.fecha.substr(0,10));
    const titulo = "Últimos 10 Registros";
    const colorDeLinea = "rgb(0, 139, 220)";
    const valores = monedas.serie.map((moneda)=>{
        const valor = moneda.valor;
        return Number(valor);
    });
    // se sustrae sólo 10 registros en copias de los array y se usa reverse para mostrarlos de izquierda a derecha
    const fechas10 = fechas.slice(0,10).reverse();
    const valores10 = valores.slice(0,10).reverse();

const config = {
    type: tipoDeGrafica,
    data: {
        labels: fechas10,
        datasets: [{
            label: titulo,
            backgroundColor: colorDeLinea,
            data: valores10
        }]
    }
}

return config;

}

async function renderGrafica(){
    const monedas = await getDataHistorica();
    const config = ConfiguracionGrafica(monedas);
    const chartDOM = document.getElementById("myChart");
    new Chart(chartDOM, config);
}

renderGrafica();


// creando gráfico Euros

async function getDataHistoricaE(){ 
    const endpoint = "https://mindicador.cl/api/euro";
    const res = await fetch(endpoint);
    const monedas = await res.json();
    return monedas;
}

function ConfiguracionGraficaE(monedas){
    const tipoDeGrafica = "line";
    // se usa substr para tomar solo los 10 primeros dígitos de la fecha considerando que el primer dígito está en la ubicación 0
    const fechas = monedas.serie.map((moneda)=>moneda.fecha.substr(0,10));
    const titulo = "Últimos 10 Registros";
    const colorDeLinea = "rgb(0, 139, 220)";
    const valores = monedas.serie.map((moneda)=>{
        const valor = moneda.valor;
        return Number(valor);
    });
    // se sustrae sólo 10 registros en copias de los array y se usa reverse para mostrarlos de izquierda a derecha
    const fechas10 = fechas.slice(0,10).reverse();
    const valores10 = valores.slice(0,10).reverse();

const config = {
    type: tipoDeGrafica,
    data: {
        labels: fechas10,
        datasets: [{
            label: titulo,
            backgroundColor: colorDeLinea,
            data: valores10
        }]
    }
}

return config;

}

async function renderGraficaE(){
    const monedas = await getDataHistoricaE();
    const config = ConfiguracionGraficaE(monedas);
    const chartDOM = document.getElementById("myChartE");
    new Chart(chartDOM, config);
}

renderGraficaE();
