import React, { Component } from "react";
import { connect } from "react-redux";


class FilterDetail extends Component {
    render() {
        const { nameProductSearched, filterBrand, filterGender, filterCategory, filterForPrice, min, max, filterUrl } = this.props.filters;
        const { styleFilterDetail } = this.props;
        console.log(filterGender)
        return (
            <div className={styleFilterDetail.Component}>
                {nameProductSearched !== "" &&
                    <p className={styleFilterDetail.filterC} >Contains Phrase: {nameProductSearched}</p>}
                {<p className={styleFilterDetail.filterC} >Gender: {filterGender}</p>}
                <p className={styleFilterDetail.filterC} >Category: {filterCategory}</p>
                {filterForPrice &&
                    (<p className={styleFilterDetail.filterC} >Price: Min: ${min}  Max: ${max}</p>)
                }

                {filterBrand.length !== 0 &&
                    (<p className={styleFilterDetail.filterC} >Brands :{
                        filterBrand.map((Marcas, index) => {
                            return (
                                <label> {Marcas}{index < filterBrand.length - 1 && " || "}</label>
                            );
                        })}
                    </p>)
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        filters: state.filters,
    };
}

export default connect(mapStateToProps)(FilterDetail);
