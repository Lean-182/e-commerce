import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, getAllUsers ,ObtenerImagenes} from "../../redux/actions";
import Swal from "sweetalert2";
import "./register.css";

function validate(input, allUsers) {
    let errors = {};
    //const allUsers = useSelector((state) => state.allUsers)

    let urlValidator = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    let emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let usernameValidator =
        /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){4,18}[a-zA-Z0-9]$/;
    let passwordValidator = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

    if (!input.username || usernameValidator.test(input.username) === false)
        errors.username = "It should have between 4 and 18 characters, only contain letter,number";
    else if (!input.email || emailValidator.test(input.email) === false)
        errors.email = "Please Enter a valid email direction";
    else if (!input.name || input.name < 1 || input.name > 20)
        errors.name = "It should have between 2 and 20 characters";
    else if (!input.lastName || input.lastName < 1 || input.lastName > 20)
        errors.lastName = "It should have between 2 and 20 characters";
    else if (!input.password || passwordValidator.test(input.password) === false)
        errors.password =
            "one digit,lowercase, uppercase, min least 8 characters max 20";
    else if (!input.confirmPass || input.password !== input.confirmPass)
        errors.confirmPass = "Check that you have entered your password correctly";
    else if (!input.phone || isNaN(input.phone) === true)
        errors.phone =
            "Please enter your phone number";

    return errors;
}


export default function Register() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const allUsers = useSelector((state) => state.allUsers);
    console.log(allUsers);
    const [input, setInput] = useState({
        email: "",
        username: "",
        name: "",
        lastName: "",
        password: "",
        confirmPass: "",
        phone: "",
        address: "",
        image:"",
    });

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(ObtenerImagenes("Avatares")).then(e=>{
            if(e.payload.length>0){
                var element=e.payload[Math.floor(Math.random() * e.payload.length)]  
                console.log(element.url)
                setInput({
                    ...input,
                   image: element.url
                })
            }
        });
    }, [])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        )
    }

    function handleChangePhone(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.valueAsNumber
        })
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.valueAsNumber,
            })
        )
    }

    const usersNames = allUsers.map(n => {
        return n.username
    })
    console.log(usersNames)

    function handleSubmit(e) {
        e.preventDefault()
        console.log("ALLUSERS", allUsers)
        console.log("INPUT:username", input.username)
        if (usersNames.includes(input.username)) {
            Swal.fire({
                title: `The username ${input.username} is already registered. Please enter a different one`,
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "Yes",
                icon: "info",
            }).then((result) => {console.log(result)})
            setInput({
                email: '',
                username: '',
                name: '',
                lastName: '',
                password: '',
                confirmPass: '',
                phone: null,
                address: '',
            })
        } else {
            register(input).then(e => {
                Swal.fire({
                    title: 'User successfully created, check your email to verify the account',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: "Yes",
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push('/')
                    }
                })
            }).catch(e =>
                Swal.fire({
                    title: e.response.data,
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: "Ok",
                    icon: "error",
                }).then((result) => { console.log(result) })
            )
        }
    }

    return (
        <div className="registerContainer">
            <div className="tltleRegister">Create your account</div>
            <div className="formContainer">
                <form className="formRegister">
                    <div>
                        <div>
                            <label>Name:</label>
                        </div>
                        <input
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                        />
                        <div>
                            {errors.name && <p className="errorRegister">{errors.name}</p>}
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Last Name:</label>
                        </div>
                        <input
                            type="text"
                            value={input.lastName}
                            name="lastName"
                            onChange={(e) => handleChange(e)}
                        />
                        <div>
                            {errors.lastName && <p className="errorRegister">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Username:</label>
                        </div>
                        <input
                            type="text"
                            value={input.username}
                            name="username"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        {errors.username && <p className="errorRegister">{errors.username}</p>}
                    </div>
                    <div>
                        <div>
                            <label>Email:</label>
                        </div>
                        <input
                            type="text"
                            value={input.email}
                            name="email"
                            onChange={(e) => handleChange(e)}
                        />
                        <div>
                            {errors.email && <p className="errorRegister">{errors.email}</p>}
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Password:</label>
                        </div>
                        <input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={(e) => handleChange(e)}
                        />
                        <div>
                            {errors.password && <p className="errorRegister">{errors.password}</p>}
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Confirm password:</label>
                        </div>
                        <input
                            type="password"
                            value={input.confirmPass}
                            name="confirmPass"
                            onChange={(e) => handleChange(e)}
                        />
                        <div>
                            {errors.confirmPass && <p className="errorRegister">{errors.confirmPass}</p>}
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Phone:</label>
                        </div>
                        <input
                            type="number"
                            value={input.phone}
                            name="phone"
                            onChange={(e) => handleChangePhone(e)}
                        />
                        <div>
                            {errors.phone && <p className="errorRegister">{errors.phone}</p>}
                        </div>
                    </div>
                    {!Object.keys(errors).length ? (
                        <button
                            type="submit"
                            className="btnGlobal"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Create
                        </button>
                    ) : (
                        <button hidden={true}>Create</button>
                    )}
                </form>
            </div>
        </div>
    );
}
