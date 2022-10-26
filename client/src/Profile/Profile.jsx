import React, { useEffect } from "react";
import "./profile.css";
import ProfileCard from "./ProfileCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getAllUsers } from "../../redux/actions";


export default function Profile () {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUsers);
    const user_login = useSelector((state) => state.user_login);


    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(deleteUsers())
    }, [dispatch]);

    const userConected = users.find(user => user.id === user_login.id)
    console.log(userConected)
    
        return (
 
            <div className="mainContainerProfile">
                {userConected ? (
                    <div className="containCarry">
                        <div>
                            <ProfileCard
                                email={userConected.email}
                                name={userConected.name}
                                lastName={userConected.lastName}
                                image={userConected.image}
                                address={userConected.address}
                                phone={userConected.phone}
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
            </div>
        )
    };
