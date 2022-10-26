import React, { Component } from "react";
import { connect } from "react-redux";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const SizeEnumeracionPaginado = 10;
const SizeEnumeracionCards_byPage = 10;

export default function Paginated(props) {

function Actualizar() {
   let NumeracionMaximaPaginas=props.NumMaxPag==undefined?SizeEnumeracionPaginado:props.NumMaxPag;
   let NumeracionMaximoTarjetas=props.NumMaxtarg==undefined?SizeEnumeracionCards_byPage:props.NumMaxtarg;

    let IndiceFinal =
      Math.floor(props.paginated.productsView.length / NumeracionMaximoTarjetas) +
      (props.paginated.productsView.length % NumeracionMaximoTarjetas === 0 ? 0 : 1);
    let PaginaStart =
      props.paginated.page - Math.floor(NumeracionMaximaPaginas / 4) < 1
        ? 1
        : props.paginated.page - Math.floor(NumeracionMaximaPaginas / 2);
    PaginaStart =
      IndiceFinal - PaginaStart > NumeracionMaximaPaginas - 1
        ? PaginaStart
        : IndiceFinal - (NumeracionMaximaPaginas - 1);
    PaginaStart = PaginaStart < 1 ? 1 : PaginaStart;

    let IndicesArray = [];
    IndicesArray.push(1);
    let Longitud =
      IndiceFinal > NumeracionMaximaPaginas - 1
        ? NumeracionMaximaPaginas
        : IndiceFinal;
    for (let i = 1; i < Longitud; i++) {
      if (i !== Longitud - 1) IndicesArray.push(PaginaStart + i);
      else IndicesArray.push(IndiceFinal);
    }
    IndiceFinal=IndiceFinal==0?1:IndiceFinal;
  
    return {IndiceFinal: IndiceFinal,IndicesArray:IndicesArray};
  }

  function changePage(page, IndiceFinal) {
    if (page > 0 && page <= IndiceFinal) props.changePaginatedPage(page);
  }

  function  obtenerCountriesPagina(productos) {
    let NumeracionMaximoTarjetas=props.NumMaxtarg==undefined?SizeEnumeracionCards_byPage:props.NumMaxtarg;
    console.log(NumeracionMaximoTarjetas) 
    if (productos !== undefined) {
      let Inicio = (props.paginated.page - 1) * NumeracionMaximoTarjetas;
      return productos.slice(Inicio, Inicio + NumeracionMaximoTarjetas);
    }
    return [];
  }


    console.log(props)
    const { IndiceFinal, IndicesArray }=Actualizar()
    let NewPageProducts=obtenerCountriesPagina(props.paginated.productsView);
    if(JSON.stringify(NewPageProducts)!==JSON.stringify(props.paginated.productsViewPage)){
    props.changePaginatedByPage(NewPageProducts)}

    return (
      <nav aria-label="Countries Pagination" className={props.stylePaginated.paginationGlobal}>
        {IndiceFinal!==1 &&
        <ul className={props.stylePaginated.pagination}>
          <li
            key={0}
            className="page-item"
            id={props.paginated.page === 1 && props.stylePaginated.Inhabilitado}
            onClick={() =>
              changePage(props.paginated.page - 1, IndiceFinal)
            }
          >
            <AiFillCaretLeft/>
          </li>
          {IndicesArray.map((page, index) => {
            return (
              <li
                key={index + 1}
                className="page-item"
                id={props.paginated.page === page && props.stylePaginated.pagSeleccionada}
                onClick={() => changePage(page, IndiceFinal)}
              >
                {page}
              </li>
            );
          })}
          <li
            key={IndiceFinal + 1}
            className="page-item"
            id={props.paginated.page === IndiceFinal && props.stylePaginated.Inhabilitado}
            onClick={() =>
              changePage(props.paginated.page + 1, IndiceFinal)
            }
          >
            <AiFillCaretRight />
          </li>
        </ul>}
      </nav>
    );
}
