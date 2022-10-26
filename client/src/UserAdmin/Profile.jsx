import React, { useEffect } from "react";
import style from "./Profile.module.css";
import ProfileCard from "./ProfileCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getAllUsers } from "../../redux/actions";


export default function Profile(props) {

    const user_login = useSelector((state) => state.user_login);

    console.log(props.match.params.id)

    return (
        <div>
            {user_login != "Loading" ?
                <div className={style.mainContainer}>
                    {user_login ? (
                        <div className={style.containCarry}>
                            <div>
                                <ProfileCard
                                    email={user_login.email}
                                    name={user_login.name}
                                    lastName={user_login.lastName}
                                    image={user_login.image}
                                    address={user_login.address}
                                    phone={user_login.phone}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="cards">
                            <p>
                                <b>{"No found Profile"}</b>
                            </p>
                        </div>
                    )
                    }
                </div> :
                <p>LOADING</p>}
        </div>
    )
};
