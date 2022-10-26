import React, { Component } from "react";
import { connect } from "react-redux";
import {
    deleteUsers, getAllUsers, putUserType
} from '../../redux/actions'

import { FcViewDetails } from "react-icons/fc";
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import { withRouter } from "react-router";
import { height, style } from "@mui/system";
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Swal from "sweetalert2";
import MaterialReactTable from 'material-react-table';
import { IconContext } from "react-icons";

export class UserAdmin extends Component {
    componentDidMount() {
        this.props.getAllUsers();
    }

    handleButtonClick(Link) {
        console.log(Link)
        this.props.history.push(Link)
    }


    changeUser(typeUser, idUser) {
        Swal.fire({
            title: "Do you want to change the user type?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: "No",
            icon: "question",
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.putUserType("typeUser", idUser, typeUser).then((e) => {
                    console.log(e)
                    Swal.fire({
                        title: e.data,
                        position: "center",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1000,
                    }).then(e => { this.props.getAllUsers() })
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
        this.props.history.push(`/userAdminDetail/${row.original.id}`);
    };

    render() {
        console.log(this.props.allUsers)
        const columns = [
            {
                accessorKey: 'username',
                header: 'Username',
                Cell: ({ cell, row }) => {
                    console.log(row, "  ", cell)
                    return (
                        <p> 
                        <img
                            src={row.original.image ? `${row.original.image}` :
                                "https://i.pinimg.com/236x/eb/51/5a/eb515a18027411cdf9a41de23fe0083b.jpg"}
                            alt="imagen"
                            height={30}
                            width={30}
                            loading="lazy"
                            style={{ borderRadius: '50%'}}
                        />
                        {row.original.username}
                        </p>
                    )
                },
                enableColumnFilterModes: false,
                enableColumnOrdering: false,
                enableColumnDragging: false,
            },
            { accessorKey: 'id', header: 'ID' },
            { accessorKey: 'email', header: 'Email' },
            { accessorKey: 'name', header: 'Name' },
            { accessorKey: 'lastName', header: 'Last name' },
            { accessorKey: 'phone', header: 'Phone' },
            {
                accessorKey: "typeUser",
                header: 'Type User',
                editable: true,
                Cell: ({ cell, row }) => {
                    var booleano=this.props.user!=="Loading" && this.props.user!==false && this.props.user.id=== row.original.id
                    return (
                        <Select disabled={booleano}
                            labelId="demo-simple-select-label"
                            value={row.original.typeUser}
                            onChange={(e) => this.changeUser(e.target.value, row.original.id)}
                            style={{
                                width: "100px", color: row.original.typeUser == "Admin" ? "blue" : (
                                    row.original.typeUser == "User" ? "green" : "red")
                            }}
                        >
                            <MenuItem value={"Admin"} style={{ color: "blue" }}>Admin</MenuItem>
                            <MenuItem value={"User"} style={{ color: "green" }}>User</MenuItem>
                            <MenuItem value={"Banned"} style={{ color: "red" }}>Banned</MenuItem>
                        </Select>)
                },
            },
        ]

        return (
            <div style={{ height: 800, width: '100%', marginTop: '33px' }}>
                <MaterialReactTable
                    columns={columns}
                    data={this.props.allUsers}
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
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        allUsers: state.allUsers,
        user:state.user_login
    }
}

function mapDispatchToProps(dispatch) {
    //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
    return {
        deleteUsers: () => dispatch(deleteUsers()),
        getAllUsers: () => dispatch(getAllUsers()),
        putUserType: (type, id, anotherParam) => dispatch(putUserType(type, id, anotherParam)),
    }
}

const UserAdminRouter = withRouter(UserAdmin);

export default connect(mapStateToProps, mapDispatchToProps)(UserAdminRouter);






