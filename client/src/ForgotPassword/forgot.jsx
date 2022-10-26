import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { forgotPassword, getAllUsers } from "../../redux/actions";
import Swal from "sweetalert2";
import { useEffect } from "react";
import "./forgot.css";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState({
    email: "",
  });
  const allUsers = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const usersEmails = allUsers.map((n) => {
    return n.email;
  });

  console.log(usersEmails);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (usersEmails.includes(input.email)) {
      dispatch(forgotPassword(input))
        .then((e) => {
          Swal.fire({
            title:
              "Check your email, and follow the instructions to change the password",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Yes",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/");
            }
          });
        })
        .catch((e) =>
          Swal.fire({
            title: e.response.data,
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok",
            icon: "error",
          }).then((result) => {
            console.log(result);
          })
        );
      setInput({
        email: "",
      });
    } else {
      Swal.fire({
        title: `The email ${input.email} does not correspond to an existing user, please enter a correct email`,
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Yes",
        icon: "info",
      }).then((result) => {
        console.log(result);
      });
      setInput({
        email: "",
      });
    }
  }

  return (
    <div className="forgotContainer">
      <h1 className="titleCreate titleForgot">Password recovery</h1>
      <br />
      <div className="txtForgot">
        <p>Write your email address used to create your account</p>
      </div>
      <form className="forgotForm">
        <input
          type="text"
          value={input.email}
          name="email"
          placeholder="email@email.com"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <button
          className="btnGlobal btnSubmitForgot"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
