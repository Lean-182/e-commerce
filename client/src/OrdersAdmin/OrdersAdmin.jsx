import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrders, ActualiceOrder } from '../../redux/actions'

import { FcViewDetails } from "react-icons/fc";
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import { withRouter } from "react-router";
import { height, style } from "@mui/system";
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Swal from "sweetalert2";
import MaterialReactTable from 'material-react-table';
import { IconContext } from "react-icons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export class OrdersAdmin extends Component {
    componentDidMount() {
        console.log(this.props.getOrders())
    }

    changeStateOrder(value, orderId) {
        Swal.fire({
            title: "Do you want to change the status of the order?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.ActualiceOrder("stateOrder", orderId, value).then((e) => {
                    console.log(e)
                    Swal.fire({
                        title: e.data,
                        position: "center",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1000,
                    }).then(e => { this.props.getOrders() })
                })
            }
        }).catch(e =>
            Swal.fire({
                title: e.response.data,
                position: "center",
                icon: "error",
                showConfirmButton: true,
            }))
    }

    onClick(e, row) {
        e.stopPropagation(); // don't select this row after clicking
        this.props.history.push(`/orderAdminDetail/${row.original.id}`);
    };

    render() {
        const columns = [
            { accessorKey: 'id', header: 'ID' },
            { accessorKey: 'userId', header: 'UserID' },
            {
                accessorKey: 'createdAt', header: 'Create',
                Cell: ({ cell, row }) => {
                    let Date_ = new Date(row.original.createdAt)
                    var Horario = Date_.toLocaleString()
                    return (<p>{Horario}</p>)
                }
            },
            {
                accessorKey: 'price', header: 'Price Total',
                Cell: ({ cell, row }) => {
                    return (<p>${row.original.price.toFixed(2)}</p>)
                }
            },
            {
                accessorKey: "stateOrder",
                header: 'State Order',
                editable: true,
                Cell: ({ cell, row }) => {
                    return (
                        <Select
                            labelId="demo-simple-select-label"
                            value={row.original.stateOrder}
                            onChange={(e) => this.changeStateOrder(e.target.value, row.original.id)}
                            style={{
                                width: "100px", color: row.original.stateOrder == "Created" ? "orange" : (
                                    row.original.stateOrder == "Paid" ? "green" : "blue")
                            }}
                        >
                            <MenuItem value={"Created"} style={{ color: "orange" }}>Created</MenuItem>
                            <MenuItem value={"Paid"} style={{ color: "green" }}>Paid</MenuItem>
                            <MenuItem value={"Dispatched"} style={{ color: "blue" }}>Dispatched</MenuItem>
                        </Select>)
                },
            },
        ]

        console.log(this.props.orders)
        return (
            <div className="orderAdminContainer" style={{ height: 800, width: '100%', marginTop: '33px' }}>
                <MaterialReactTable
                    columns={columns}
                    data={this.props.orders}
                    enableColumnFilterModes //enable changing filter mode for all columns unless explicitly disabled in a column def
                    initialState={{ showColumnFilters: true }} //show filters by defaults 
                    enableEditing
                    renderRowActions={({ row, table }) => (
                        <p onClick={(e) => this.onClick(e, row)}>Details {" "}
                            <IconContext.Provider value={{ size: "20px" }}>
                                <FcViewDetails />
                            </IconContext.Provider>
                        </p>
                    )}
                    renderDetailPanel={({ row }) => {
                        var Stocks = (JSON.parse(row.original.stocks));
                        console.log(Stocks)
                        return (
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    size="small"
                                    aria-label="a dense table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Image</TableCell>
                                            <TableCell align="center">Name</TableCell>
                                            <TableCell align="center">Size</TableCell>
                                            <TableCell align="center">Amount</TableCell>
                                            <TableCell align="center">Price</TableCell>
                                            <TableCell align="center">Subtotal</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Stocks.map((stock) => (
                                            <TableRow 
                                                key={stock.name}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align="center">
                                                    <img src={stock.image} alt="no found" style={{width:"40px"}}/>
                                                </TableCell >
                                                <TableCell align="center" component="th" scope="row">
                                                    {stock.name}
                                                </TableCell>
                                                <TableCell align="center">{stock.size}</TableCell>
                                                <TableCell align="center">{stock.amount}</TableCell>
                                                <TableCell align="center">${stock.value.toFixed(2)}</TableCell>
                                                <TableCell align="center">
                                                    ${(stock.amount * stock.value).toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )
                    }}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        orders: state.orders,
    }
}

function mapDispatchToProps(dispatch) {
    //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
    return {
        getOrders: () => dispatch(getOrders()),
        ActualiceOrder: (type, id, data) => dispatch(ActualiceOrder(type, id, data)),
    };
}

const OrdersAdminRouter = withRouter(OrdersAdmin);

export default connect(mapStateToProps, mapDispatchToProps)(OrdersAdminRouter);


