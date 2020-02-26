const butAgregar = document.getElementById("butAgregar");
const butEliminar = document.getElementById("butEliminar");

const divAgregar = document.getElementById("content-input-agregar");
const divEliminar = document.getElementById("content-input-eliminar");

const butEnviar = document.getElementById("butEnviar");

butEnviar.addEventListener("click", () => {
  addData();
});

butEliminar.addEventListener("click", () => {
  butEliminar.classList.toggle("true");

  if (butEliminar.getAttribute("add") === "true") {
    console.log("true");
    divEliminar.setAttribute("style", "display: block;");
    butEliminar.setAttribute("add", "false");
    butAgregar.setAttribute("disabled", "disabled");
    let trs = document.querySelectorAll("tbody > tr");
    let iSemanaCotizada = document.getElementById("iSemanaCotizada");
    if (trs.length === 0) {
      iSemanaCotizada.setAttribute("disabled", "disabled");
    }
    else{
      iSemanaCotizada.removeAttribute("disabled");
    }
  }
  else {
    console.log("false");
    divEliminar.setAttribute("style", "display: none;");
    butEliminar.setAttribute("add", "true");
    butAgregar.removeAttribute("disabled");
  }
});

butAgregar.addEventListener("click", () => {
  butAgregar.classList.toggle("true");

  if (butAgregar.getAttribute("add") === "true") {
    butAgregar.setAttribute("add", "false");
    divAgregar.setAttribute("style", "display: block;");
    butEliminar.setAttribute("disabled", "disabled");
  }
  else {
    divAgregar.setAttribute("style", "display: none;");
    butAgregar.setAttribute("add", "true");
    butEliminar.removeAttribute("disabled");
  }

});

function addData() {

  let tbody = document.getElementById("table-content");
  let tr = document.createElement("tr");
  tbody.appendChild(tr);

  let tds = [
    document.createElement("td"),
    document.createElement("td"),
    document.createElement("td"),
    document.createElement("td"),
    document.createElement("td"),
  ];

  //tds[0] = cotizacion
  console.log();
  tds[0].textContent = parseInt(document.getElementById("iCotizacion").value);

  let anio_mes = document.getElementById("iMesAnio").value;
  const arrAnioMes = darAnioMes(anio_mes);
  // Anio
  tds[1].textContent = arrAnioMes[0];
  // Mes
  tds[2].textContent = arrAnioMes[1];


  fetch("../files/pension.json")
    .then(res => res.json())
    .then((data) => {
      let ipc = data[2020 - arrAnioMes[0] + arrAnioMes[1] - 1].inflacion_mensual;
      // IPC cargado desde el archivo pension.json
      tds[3].textContent = ipc;
    });

  let tdList = document.querySelectorAll("tbody > tr");
  tds[4].textContent = tdList.length;

  tds.forEach((td) => {
    tr.appendChild(td);
  });
}

// Split from "2019-10" to arr = [2019, 10]
const darAnioMes = anioMes => {
  let arr = anioMes.split("-");
  arr[0] = parseInt(arr[0]);
  arr[1] = parseInt(arr[1]);
  return arr;
};