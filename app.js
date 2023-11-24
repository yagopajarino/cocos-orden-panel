// Js Script que ordena los items de la view

const headers = () => {
  const div_headers = document.querySelector(".markets-table-header");
  let cols_headers = div_headers.querySelectorAll("div");
  cols_headers = Array(...cols_headers);
};

const get_value_from_index = (divs, index) => {
  let res;
  if (index == 1) {
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
  return Array(...fila.querySelectorAll(".grid-col")).slice(2, fila.length);
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

const play = (col) => {
  const items = filas_sorted(col, false);
  borrar_nodos(items);
  agregar_nodos_ordenados(items);
};
