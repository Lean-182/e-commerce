import React, { Component } from "react";
import { connect } from "react-redux";
import {
  searchNameProduct, changeFilterGender, changeFilterCategory, changeFilterBrand,
  getCategorys, changeFilterMin, changeFilterMax, changeFilterPrice, changePaginatedProducts,
  changeFilternameProductSearched, changeFilterURL
} from '../../redux/actions'
import { withRouter } from "react-router";
import './filter.css';

export class Filter extends Component {

  componentDidMount() {
    this.props.searchNameProduct(this.props.filters.nameProductSearched)
    this.props.getCategorys()
  }

  handleChange(event) {
    event.preventDefault();
    this.props.changeFilternameProductSearched(event.target.value)
    this.props.searchNameProduct(event.target.value)
    this.props.getCategorys()
  }

  obtenerMarcas(productosNuevos) {
    var Brands = [];
    for (let index = 0; index < productosNuevos.length; index++) {
      const element = productosNuevos[index].brand;
      if (!Brands.includes(element))
        Brands.push(element);
    }
    return Brands
  }

  filtradoProductos(products, paginated, categorys, filterBrand, filterCategory, filterForPrice, min, max, gender, filterGender) {

    let productosNuevos = products.filter(element => element.gender === (gender == undefined ? this.props.filters.filterGender : gender));
    console.log(categorys)
    let IDsGender = categorys.filter(element => element.gender === (gender == undefined ? this.props.filters.filterGender : gender));
    let Brands = [];
    const DetectarID = IDsGender.find(element => element.name == filterCategory);
    if (IDsGender.length > 0 && filterCategory == 0) {
      this.props.changeFilterCategory(IDsGender[0].name);
    }

    let ID_Category = (DetectarID === undefined) ? (IDsGender.length > 0 ? (`${IDsGender[0].id}`) : 0) : DetectarID.id;
    productosNuevos = productosNuevos.filter(element => `${element.categoryId}` === ID_Category);
    Brands = this.obtenerMarcas(productosNuevos);

    if (filterBrand.length !== 0)
      productosNuevos = productosNuevos.filter(element => filterBrand.includes(element.brand));
    if (filterForPrice)
      productosNuevos = productosNuevos.filter(element => (min <= element.price && element.price <= max));
    //console.log(productosNuevos);

    if (gender !== undefined) {
      productosNuevos = productosNuevos.filter(element => (element.stocks.some((stock) => stock.stock > 0)));
      if (filterGender !== gender)
        this.props.changeFilterGender(gender)
    }

    if (JSON.stringify(paginated.productsView) !== JSON.stringify(productosNuevos))
      this.props.changePaginatedProducts(productosNuevos)


    return { Brands: Brands, IDsGender: IDsGender }
  }

  render() {
    var getGenderbyMatch = this.props.match.params.gender
    const { nameProductSearched, filterBrand, filterGender, filterCategory, filterForPrice, min, max, filterUrl } = this.props.filters;
    const { categorys, products, paginated } = this.props;
    if (this.props.match.url != filterUrl)
      this.props.changeFilterURL(this.props.match.url)
    console.log(categorys)
    let values = this.filtradoProductos(products, paginated, categorys, filterBrand,
      filterCategory, filterForPrice, min, max, getGenderbyMatch, filterGender)

    return (
      <div className="containerFilter">
        <nav className="NavFilter">
          <div className="contentFilter">
            <ul >
              <li className="ItemFilter">
                <label className="NameFilter">Search Product Name: </label>
                <input
                  type="text"
                  id="nombreProducto"
                  autoComplete="off"
                  value={nameProductSearched}
                  onChange={(e) => this.handleChange(e)}
                />
              </li>
              {getGenderbyMatch == undefined &&
                <li className="ItemFilter">
                  <p><label className="NameFilter"  >Gender: </label>
                    <select value={filterGender} onChange={(e) => this.props.changeFilterGender(e.target.value)}>
                      <option key={"Men"} value={"Men"}>Men</option>
                      <option key={"Women"} value={"Women"}>Women</option>
                    </select></p>
                </li>
              }

              <li className="ItemFilter">
                <p><label className="NameFilter"  >Category: </label>
                  <select value={filterCategory} onChange={(e) => this.props.changeFilterCategory(e.target.value)}>
                    {values.IDsGender.map((elemento) => {
                      return (
                        <option key={elemento.id} value={elemento.name}>{elemento.name}</option>)
                    })
                    }
                  </select></p>
              </li>

              <li className="ItemFilter">
                <label className="NameFilter" > BrandName</label>
                {
                  values.Brands.map((elemento) => {
                    return (
                      <div>
                        <input type="checkbox" id={elemento} name={elemento} value={elemento} checked={filterBrand.includes(elemento)}
                          onChange={(e) => this.props.changeFilterBrand(e.target)} className="checkboxBrand" />
                        <label for={elemento} className="lblBrand"> {elemento}</label>
                      </div>)
                  })
                }
              </li>

              <li className="ItemFilter">
                <input type="checkbox" id={"ActivateFilterPrice"} name={"ActivateFilterPrice"} value={"ActivateFilterPrice"} checked={filterForPrice}
                  onChange={(e) => this.props.changeFilterPrice(e.target.checked)} />
                <label className="NameFilter" for={"ActivateFilterPrice"}> Filter for Price</label>
                <input type="number" min="0" step="50" placeholder="Precio Minimo" value={min} onChange={(e) => this.props.changeFilterMin(e)} />
                <br />
                <div className="priceA">{" to "}</div>
                <br />
                <input type="number" min="0" step="50" placeholder="Precio Maximo" value={max} onChange={(e) => this.props.changeFilterMax(e)} />
              </li>

            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
// Se usa esto para envolver el componente con withRouter que esta definido en la linea 7 para que pueda 
//sacar los parametros del url donde esta parado // Ya que es un componente tipo Clase, se debe de hacer esto a diferencia de 
//Component Funcional
const FilterWithRouter = withRouter(Filter);

function mapStateToProps(state) {
  return {
    products: state.products,
    categorys: state.categorys,
    filters: state.filters,
    paginated: state.paginated,
  }
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
  return {
    searchNameProduct: (nameProduct) => dispatch(searchNameProduct(nameProduct)),
    changeFilterGender: (gender) => dispatch(changeFilterGender(gender)),
    changeFilterCategory: (category) => dispatch(changeFilterCategory(category)),
    changeFilterBrand: (brand) => dispatch(changeFilterBrand(brand)),
    getCategorys: () => dispatch(getCategorys()),
    changeFilterMin: (e) => dispatch(changeFilterMin(e)),
    changeFilterMax: (e) => dispatch(changeFilterMax(e)),
    changeFilterPrice: (e) => dispatch(changeFilterPrice(e)),
    changePaginatedProducts: (e) => dispatch(changePaginatedProducts(e)),
    changeFilternameProductSearched: (nameSearch) => dispatch(changeFilternameProductSearched(nameSearch)),
    changeFilterURL: (url) => dispatch(changeFilterURL(url))
  }
}



//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default connect(mapStateToProps, mapDispatchToProps)(FilterWithRouter);
