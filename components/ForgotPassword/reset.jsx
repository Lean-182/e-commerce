import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetPassword } from "../../redux/actions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import './reset.css';

function validate(input) {
    let errors = {}

    let passwordValidator = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

    if (!input.password || passwordValidator.test(input.password) === false)
        errors.password = "one digit,lowercase, uppercase, min least 8 characters max 20";
    else if (!input.confirmPass || input.password !== input.confirmPass)
        errors.confirmPass = "Check that you have entered your password correctly";

    return errors    
}

export default function ResetPassword(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [input, setInput] = useState({
        password: "",
        confirmPass: "",
    })
    console.log("history", history)
    var token = props.match.params.token;
     console.log("token",token)
    const [errors, setErrors] = useState({})

    
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

    function handleSubmit(e) {
        e.preventDefault()
        console.log(input)
        dispatch(resetPassword(input.password,token)).then(e => {
            Swal.fire({
                title: 'Your password has been changed successfully',
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
        
        setInput({
            password: "",
            confirmPass:""
        })
        
    }

    return (
        <div className="resetContainer">
            <form className="resetForm">
                <div>
                    <label>Your new Password:</label>
                </div>
                <input
                    type="password"
                    value={input.password}
                    name="password"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                />
                <div>
                    {errors.password && <p className="errorRegister">{errors.password}</p>}
                </div>

                <div>
                    <label>Confirm Password:</label>
                </div>
                <input
                    type="password"
                    value={input.confirmPass}
                    name="confirmPass"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                />
                <div>
                    {errors.confirmPass && <p className="errorRegister">{errors.confirmPass}</p>}
                </div>

                <button
                    className="btnGlobal btnSubmitReset"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >Submit
                </button>
            </form>
        </div>
    )
}
