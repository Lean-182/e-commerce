import React, { Component } from "react";
import { connect } from "react-redux";
import { searchNameProduct, getCategorys } from '../../redux/actions'
import { AiFillEdit } from "react-icons/ai";
import { withRouter } from "react-router";
import MaterialReactTable from 'material-react-table';
import { IconContext } from "react-icons";
import './productAdmin.css';

export class ProductsAdmin extends Component {
    componentDidMount() {
        this.props.searchNameProduct("");
        this.props.getCategorys();
    }
    
  /*  constructor(props) {
        super(props);
        this.state = {filter:0};
      }
   */
    onClick(e, row) {
        e.stopPropagation(); // don't select this row after clicking
        this.props.history.push(`/productEdit/${row.original.id}`);
    };
 



    render() {  
        console.log(this.props.products)

        const columns = [
            { accessorKey: 'id', header: 'ID' ,
            Cell: ({ cell, row }) => {
                return (<p> <img src={row.original.image} alt="NotFound" style={{width:"80px" ,display:"flex"}}/>{row.original.id}</p>)
            }},
            {
                accessorFn: (row) => {
                    var found = this.props.categorys.find(element => element.id == row.categoryId);
                    return (found == undefined ? "Notfound" : found.name)
                }
                , header: 'categoryId',maxSize: 10
            },
            { accessorKey: 'name', header: 'Name',maxSize: 200 },
            { accessorKey: 'brand', header: 'Brand',maxSize: 10 },
            { accessorKey: 'price', header: 'Price' ,maxSize: 10},
            { accessorKey: 'gender', header: 'Gender',maxSize: 10 },
            {
                accessorFn: (row) => {
                    console.log(row);
                    var found = row.stocks.find(size => size.productSize == "XS");
                    return (found==undefined?0:found.stock)
                }
                , header: 'XS',maxSize: 10, //max size enforced during resizing
                Cell: ({ cell, row }) => {
                    var found = row.original.stocks.find(size => size.productSize == "XS");
                    var result=found==undefined?0:found.stock;
                    return (<p style={{color:result==0?"red":"blue"}}>{result}</p>)
                }
            },
            {
                accessorFn: (row) => {
                    console.log(row);
                    var found = row.stocks.find(size => size.productSize == "S");
                    return (found==undefined?0:found.stock)
                }
                , header: 'S',maxSize: 10, //max size enforced during resizing
                Cell: ({ cell, row }) => {
                    var found = row.original.stocks.find(size => size.productSize == "S");
                    var result=found==undefined?0:found.stock;
                    return (<p style={{color:result==0?"red":"blue"}}>{result}</p>)
                }
            },
            {
                accessorFn: (row) => {
                    console.log(row);
                    var found = row.stocks.find(size => size.productSize == "M");
                    return (found==undefined?0:found.stock)
                }
                , header: 'M',maxSize: 10, //max size enforced during resizing
                Cell: ({ cell, row }) => {
                    var found = row.original.stocks.find(size => size.productSize == "M");
                    var result=found==undefined?0:found.stock;
                    return (<p style={{color:result==0?"red":"blue"}}>{result}</p>)
                }
            },
            {
                accessorFn: (row) => {
                    console.log(row);
                    var found = row.stocks.find(size => size.productSize == "L");
                    return (found==undefined?0:found.stock)
                }
                , header: 'L', maxSize: 10, //max size enforced during resizing
                Cell: ({ cell, row }) => {
                    var found = row.original.stocks.find(size => size.productSize == "L");
                    var result=found==undefined?0:found.stock;
                    return (<p style={{color:result==0?"red":"blue"}}>{result}</p>)
                }
            },
            {
                accessorFn: (row) => {
                    console.log(row);
                    var found = row.stocks.find(size => size.productSize == "XL");
                    return (found==undefined?0:found.stock)
                }
                , header: 'XL',maxSize: 10, //max size enforced during resizing
                Cell: ({ cell, row }) => {
                    var found =row.original.stocks.find(size => size.productSize == "XL");
                    var result=found==undefined?0:found.stock;
                    return (<p style={{color:result==0?"red":"blue"}}>{result}</p>)
                }
            },
        ]

        return (
            <div className="productAdminContainer">
                {this.props.categorys.length == 0 ?
                    <div>LOADING</div> :
                    <div style={{ height: 2300, width: '100%', marginTop: '33px'}}>
                        <MaterialReactTable
                            columns={columns}
                            data={this.props.products}
                            initialState={{showGlobalFilter:true, density:  'comfortable'}} //show filters by defaults 
                            enableEditing
                            //onSortingChange={this.setState}
                            renderRowActions={({ row, table }) => (
                                <p onClick={(e) => this.onClick(e, row)}>Edit {" "}
                                    <IconContext.Provider value={{ size: "20px" }}>
                                        <AiFillEdit />
                                    </IconContext.Provider>
                                </p>
                            )}
                        />
                    </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        orders: state.orders,
        categorys: state.categorys,
    }
}

function mapDispatchToProps(dispatch) {
    //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
    return {
        searchNameProduct: (nameProduct) => dispatch(searchNameProduct(nameProduct)),
        getCategorys: () => dispatch(getCategorys()),
    };
}

const ProductsAdminRouter = withRouter(ProductsAdmin);

export default connect(mapStateToProps, mapDispatchToProps)(ProductsAdminRouter);


