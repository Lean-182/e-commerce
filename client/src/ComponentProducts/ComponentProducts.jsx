import ProductCards from "../Products/ProductCards.jsx";
import Filter from "../Filter/Filter.jsx";
import FilterDetail from "../FilterDetail/FilterDetail.jsx";
import Paginated from "../Paginated/Paginated.jsx";
import s from "./ComponentProducts.module.css"
// import styleFilter from "./Filter.module.css";
import stylePaginated from "../Paginated/paginated.css";
import styleCards from "./ProductCards.module.css";
import styleCard from "./ProductCard.module.css";
import styleFilterDetail from "./FilterDetail.module.css";

export const ComponentProducts = () => {
    return (
        <div className={s.containerProductsGlobal}>
            <div>
            <Filter />
            {/* styleFilter={styleFilter}  stylePaginated={stylePaginated}*/}
            </div>
            <div className={s.containerProductsGlobal2}>
            <FilterDetail styleFilterDetail={styleFilterDetail}/>
            <Paginated stylePaginated={stylePaginated} />
            <ProductCards styleCards={styleCards} styleCard={styleCard}/>
            <Paginated stylePaginated={stylePaginated}/>
            </div>
        </div>
    )
}
export default ComponentProducts