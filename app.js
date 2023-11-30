// Ordenamiento de panel de instrumentos COCOS CAPITAL

// Desrrollado por Yago Pajariño yago.pajarino@outlook.com
// 2023-11-30

const cols = [
  "Especie",
  "Último Precio",
  "Var %",
  "CC",
  "PC",
  "PV",
  "CV",
  "Cierre",
  "Min",
  "Max",
  "Total",
  "Oper",
];
let ascending = new Array(cols.length).fill(true);

const get_value_from_index = (divs, index) => {
  let res;
  if (index == 0) {
    return divs[index].querySelector("span").textContent;
  }
  if (index == 2) {
    res = Number(
      divs[index].textContent.replaceAll("%", "").replaceAll("+", "")
    );
  } else {
    res = Number(
      divs[index].textContent.replaceAll(".", "").replaceAll(",", ".")
    );
  }
  return res;
};

const get_filas = () => {
  return Array(...document.querySelectorAll(".comp-desktop-market-row"));
};

const get_cols_from_fila = (fila) => {
  return Array(...fila.querySelectorAll(".grid-col")).slice(1, fila.length);
};

const filas_sorted = (index, ascendente) => {
  const filas = get_filas();
  const res = filas.sort((a, b) => {
    const cols_a = get_cols_from_fila(a);
    const cols_b = get_cols_from_fila(b);
    const value_a = get_value_from_index(cols_a, index);
    const value_b = get_value_from_index(cols_b, index);
    if (ascendente) {
      return value_a - value_b;
    }
    return value_b - value_a;
  });
  return res;
};

const borrar_nodos = (nodos) => {
  nodos.forEach((i) => i.parentNode.removeChild(i));
};

const agregar_nodos_ordenados = (nodos) => {
  const padre = document.querySelector(".markets-table-header").parentNode;
  nodos.forEach((i) => padre.append(i));
};

const ordenar_por_columna = (col, ascending) => {
  const items = filas_sorted(col, ascending);
  borrar_nodos(items);
  agregar_nodos_ordenados(items);
  cambiar_titulo_col(col, ascending);
};

const eliminar_todas_las_flechas = () => {
  const flechas = Array(...document.querySelectorAll("#flecha_orden"))
  flechas.map(i => i.remove())
}

const cambiar_titulo_col = (col, ascending) => {
  let titulos = Array(...document.querySelector(".markets-table-header").querySelectorAll(".grid-col"))
  titulos = titulos.slice(0, titulos.length)
  eliminar_todas_las_flechas()
  const new_span = document.createElement("span")
  new_span.id = "flecha_orden"
  new_span.className = "MuiTypography-root MuiTypography-textXS css-19g1xeo"
  new_span.textContent = ascending ? "▲" : "▼"
  titulos[col].appendChild(new_span)  
// titulos[col].querySelector("span").textContent = ascending ? cols[col] + " ▲" : cols[col] + " ▼"
}

// Click handler
const click_handler = (event) => {
  const target = event.target;
  const nombre_columna = target.textContent.replaceAll(" ▲", "").replaceAll(" ▼", "");
  const index_of_col = cols.indexOf(nombre_columna);
  const tipo_sort = !ascending[index_of_col];
  ascending[index_of_col] = !ascending[index_of_col];
  ordenar_por_columna(index_of_col, tipo_sort);
};

// Agrego listener a
const add_listener_to_headers = () => {
  const div_headers = document.querySelector(".markets-table-header");
  let cols_headers = div_headers.querySelectorAll("div");
  cols_headers = Array(...cols_headers);
  cols_headers.map((element) => {
    element.addEventListener("click", click_handler);
  });
};

add_listener_to_headers();

// Agrega estilo de flechas orden asc, desc
var styles = `
    #flecha_orden { 
        margin-left: 3px;
        font-size: 15px
    }
`

var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)