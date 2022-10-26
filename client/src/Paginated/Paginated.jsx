import React, { Component } from "react";
import { connect } from "react-redux";
import { changePaginatedPage,changePaginatedByPage } from "../../redux/actions";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import './paginated.css'

const SizeEnumeracionPaginado = 10;
const SizeEnumeracionCards_byPage = 8;
class Paginated extends Component {

  Actualizar() {
   let NumeracionMaximaPaginas = this.props.NumMaxPag == undefined ? SizeEnumeracionPaginado : this.props.NumMaxPag;
   let NumeracionMaximoTarjetas = this.props.NumMaxtarg == undefined ? SizeEnumeracionCards_byPage : this.props.NumMaxtarg;

    let IndiceFinal =
      Math.floor(this.props.paginated.productsView.length / NumeracionMaximoTarjetas) +
      (this.props.paginated.productsView.length % NumeracionMaximoTarjetas === 0 ? 0 : 1);
    let PaginaStart =
      this.props.paginated.page - Math.floor(NumeracionMaximaPaginas / 4) < 1
        ? 1
        : this.props.paginated.page - Math.floor(NumeracionMaximaPaginas / 2);
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
    
    IndiceFinal = IndiceFinal == 0 ? 1 : IndiceFinal;
  
    return {IndiceFinal: IndiceFinal,IndicesArray:IndicesArray};
  }

  changePage(page, IndiceFinal) {
    if (page > 0 && page <= IndiceFinal) this.props.changePaginatedPage(page);
    this.props.changePaginatedByPage(this.obtenerCountriesPagina(this.props.paginated.productsView))
  }

  obtenerCountriesPagina(productos) {
    let NumeracionMaximoTarjetas=this.props.NumMaxtarg==undefined?SizeEnumeracionCards_byPage:this.props.NumMaxtarg;
    console.log(NumeracionMaximoTarjetas) 
    if (productos !== undefined) {
      let Inicio = (this.props.paginated.page - 1) * NumeracionMaximoTarjetas;
      return productos.slice(Inicio, Inicio + NumeracionMaximoTarjetas);
    }
    return [];
  }


  render() {
    const { IndiceFinal, IndicesArray }=this.Actualizar()
    let NewPageProducts=this.obtenerCountriesPagina(this.props.paginated.productsView);
    if(JSON.stringify(NewPageProducts)!==JSON.stringify(this.props.paginated.productsViewPage)){
    this.props.changePaginatedByPage(NewPageProducts)}

    return (
      <div className="paginationGlobal">
        {IndiceFinal!=1 &&
        <ul className="pagination">
          <li
            key={0}
            className="page-item"
            id={this.props.paginated.page === 1 && "Inhabilitado"}
            onClick={() =>
              this.changePage(this.props.paginated.page - 1, IndiceFinal)
            }
          >
            <AiFillCaretLeft/>
          </li>
          {IndicesArray.map((page, index) => {
            return (
              <li
                key={index + 1}
                className="page-item"
                id={this.props.paginated.page === page && "pagSeleccionada"}
                onClick={() => this.changePage(page, IndiceFinal)}
              >
                {page}
              </li>
            );
          })}
          <li
            key={IndiceFinal + 1}
            className="page-item"
            id={this.props.paginated.page === IndiceFinal && "Inhabilitado"}
            onClick={() =>
              this.changePage(this.props.paginated.page + 1, IndiceFinal)
            }
          >
            <AiFillCaretRight />
          </li>
        </ul>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    paginated: state.paginated,
  };
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getcountries
  return {
    changePaginatedPage: (page) => dispatch(changePaginatedPage(page)),
    changePaginatedByPage:(productsByPage) => dispatch(changePaginatedByPage(productsByPage)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginated);

