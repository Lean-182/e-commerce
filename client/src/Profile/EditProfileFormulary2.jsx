import React, { useEffect, useState } from "react";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getAllUsers, putUser, ObtenerLogin, ObtenerImagenes } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import GoogleMapAdress from "./GoogleMapAdress";
import Swal from "sweetalert2";
import { TbWorldDownload } from "react-icons/tb";
import { IconContext } from "react-icons";
import { MdPhotoCamera } from "react-icons/md";
import Avatar from "./Avatares";

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
    // else if (!input.password || passwordValidator.test(input.password) === false)
    //     errors.password =
    //         "one digit,lowercase, uppercase, min least 8 characters max 20";
    // else if (!input.confirmPass || input.password !== input.confirmPass)
    //     errors.confirmPass = "Check that you have entered your password correctly";
    else if (!input.phone || isNaN(input.phone) === true)
        errors.phone =
            "Please enter your phone number";
    else if (!input.address) errors.address = "Please enter your address";
    else if (!input.image || urlValidator.test(input.image) == false)
        errors.image = "Image cannot be null or incorrect (png, gif, jpg)";

    return errors;
}

const EditProfileFormulary = () => {

    const [myAdress, setMyAdress] = useState({ name: "", address: "" })
    const history = useHistory();
    const allUsers = useSelector((state) => state.allUsers);
    const Avatares = useSelector((state) => state.imagesCloudinary);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const user_login = useSelector((state) => state.user_login);
    const [openModalWorld, setOpenModalWorld] = useState(false);
    const [openModalAvatar, setOpenModalAvatar] = useState(false);

    useEffect(() => {
        dispatch(ObtenerImagenes("Avatares"));
    }, [])


    function handleOpen(e) {
        e.preventDefault();
        setOpenModalWorld(true);
    }

    function handleModalClose(e) {
        e.preventDefault();
        setOpenModalWorld(false);
    }

    function handleOpenAvatar(e) {
        e.preventDefault();
        setOpenModalAvatar(true);
    }

    function handleModalCloseAvatar(e) {
        e.preventDefault();
        setOpenModalAvatar(false);
    }


    const [input, setInput] = useState({
        email: user_login.email,
        name: user_login.name,
        lastName: "",
        image: "",
        phone: null,
        loading: true,
        address: "",
        lat: -1,
        lng: -1,
    });

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(deleteUsers())
    }, [dispatch]);



    function handleChangeImage(image) {
        setInput({
            ...input,
            image: image
        })
        setOpenModalAvatar(false);
    }

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
    function handleSetAdress(e, MyAdress) {
        e.preventDefault();
        setInput({
            ...input,
            address: MyAdress.name,
            lat: MyAdress.address.lat,
            lng: MyAdress.address.lng,
        })
        setOpenModalWorld(false);
    }


    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);

        dispatch(putUser(input, user_login.id)).then((e) => {
            Swal.fire({
                title: e.payload,
                position: "center",
                icon: "success",
                showConfirmButton: false,
                timer: 1000,
            }).then(e => {
                dispatch(ObtenerLogin())
                history.push("/profile")
            })
        }).catch(e => console.log(e));
    }

    if (input.loading === true && user_login !== "Loading" && user_login !== false) {
        console.log(user_login)
        if (user_login.lat !== -1 && user_login.lng !== -1) {
            setInput({
                ...input,
                loading: false,
                email: user_login.email,
                name: user_login.name,
                lastName: user_login.lastName,
                image: user_login.image,
                phone: user_login.phone,
                address: user_login.address,
                lat: user_login.lat,
                lng: user_login.lng,
            })
            setMyAdress({
                ...myAdress,
                name: user_login.address,
                address: { lat: user_login.lat, lng: user_login.lng }
            })
        }
        else {
            setInput({
                ...input,
                loading: false,
                email: user_login.email,
                name: user_login.name,
                lastName: user_login.lastName,
                image: user_login.image,
                phone: user_login.phone,
            })
        }
    };

    return (

        <div className="profileContainer">
            {(openModalWorld || openModalAvatar) && <div className="ModalAbiertoBackground"></div>}
            {user_login !== false && user_login !== "Loading" ? (
                <div className="profileContainerForm">
                    <h1 className="titleCreate titleUpdateProfile">UPDATE PROFILE</h1>
                    <form className="profileForm">
                   
                        <div >
                            <input value={input.name} type="text" className="form-control"
                                placeholder="name" name="name"
                                onChange={(e) => handleChange(e)}
                            />
                            <div>
                                {errors.name && <p className="errorRegister">{errors.name}</p>}
                            </div>
                        </div>
                        <label>Name</label>
                        <div >
                            <input value={input.lastName} type="text" className="form-control"
                                placeholder="Lastname" name="lastName"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            {errors.lastName && <p className="errorRegister">{errors.lastName}</p>}
                        </div>
                        <label>Lastname</label>
                        <div>
                            <input value={input.address} type="text" className="form-control"
                                placeholder="Add your address" name="address" disabled
                            />
                            <button className="buttonEditProfile"  onClick={(e) => handleOpen(e)}>
                            <IconContext.Provider value={{ size: "18px" }}>
                            <TbWorldDownload />
                            </IconContext.Provider></button>
                        </div>
                        <label>Adress</label>
                        <div>
                            <input value={input.image} type="text" className="form-control"
                                placeholder="Add your Avatar" name="avatar" disabled
                            />
                            <button className="buttonEditProfile" onClick={(e) => handleOpenAvatar(e)}>
                            <IconContext.Provider value={{ size: "18px" }}>
                            <MdPhotoCamera />
                            </IconContext.Provider></button>
                        </div>
                        <label>Avatar</label>
                        <div>
                            <input value={input.phone} type="number" className="form-control"
                                placeholder="phone" name="phone"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <label>Phone</label>
                        <div>
                            {errors.phone && <p className="errorRegister">{errors.phone}</p>}
                        </div>
                        <button className="btnGlobal btnUpdateProfile" onClick={(e) => handleSubmit(e)}>Agregar o cambiar datos</button>
                    </form>
                    {openModalWorld && (
                        <div className={"ModalLogin"}>
                            <GoogleMapAdress myAdress={myAdress} setMyAdress={setMyAdress} handleModalClose={handleModalClose}
                                handleSetAdress={handleSetAdress} input={input} />
                        </div>
                    )}
                    {openModalAvatar&& (
                        <div className={"ModalLogin2Avatar"}>
                            <Avatar handleModalCloseAvatar={handleModalCloseAvatar} images={Avatares} 
                            handleChangeImage={handleChangeImage} imageInput={input.image} />
                        </div>
                    )}
                </div>
            ) : (
                <div className="cards">
                    <p>
                        <b>{"No found Profile"}</b>
                    </p>
                </div>
            )
            }
        </div>
    )
};

export default EditProfileFormulary;
