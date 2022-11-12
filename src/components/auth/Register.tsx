import React, { FC, SyntheticEvent, Dispatch, SetStateAction } from "react";
import { AuthModals } from "./types";
import { UserTypes } from "./types";
import './auth-styles.css';
import { connectFirestoreEmulator } from "firebase/firestore";

const Register: FC<{ setModalOpen: Dispatch<SetStateAction<AuthModals>>; }> = ({
    setModalOpen,
}) => {
    const onSubmit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            const target = e.target as typeof e.target & {
                [key: string]: { value: string; };
            };
            console.log(target);
            const email = target.email.value;
            const password = target.password.value;
            const confirmPassword = target.confirmPassword.value;
            const name = target.firstName.value;
            const phoneNumber = target.phoneNumber.value;
            const userType = target["user-type-radio"].value;
            // Custom validation
            if (password.length < 5) {
                alert('Password is too short');
                return;
            }
            if(password != confirmPassword) {
                alert('Password and Confirm password must be the same!');
                return;
            }
            if (name.length < 7) {
                alert('Name should be at least 7 characters');
                return;
            }
            setModalOpen(AuthModals.CLOSED);
            alert('Registered succesfully');
        } catch (err) {
            console.error(err);
            alert(err);
        }
    };
    return (
        <div className="modal-well">
            <div className="h-inset">
                <h2 className="title-style">Register</h2>
            </div>
            <form onSubmit={onSubmit} className="auth-form">
                <div className="d-flex">
                    <i className="fa-solid fa-envelope bg-secondary"></i>
                    <input
                        className="style-input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email address "
                        required
                    />
                </div>
                <div className="d-flex">
                    <i className="fa-solid fa-user bg-secondary"></i>
                    <input
                        className="style-input"
                        name="firstName"
                        id="firstName"
                        placeholder="Your Name"
                        required
                    />
                </div>
                <div className="d-flex">
                    <i className="fa-solid fa-phone bg-secondary"></i>
                    <input
                        className="style-input"
                        type="tel"
                        pattern="[0-9]{4}[0-9]{3}[0-9]{3}"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        required
                    />
                </div>
                <div className="d-flex">
                    <i className="fa-solid fa-lock bg-secondary"></i>
                    <input
                        className="style-input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="d-flex">
                    <i className="fa-solid fa-lock bg-secondary"></i>
                    <input
                        className="style-input"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <span className="span-style mt-10">I want to register as a:</span>
                <div className="mt-10">
                    <input
                        type="radio"
                        name="user-type-radio"
                        value={UserTypes.CLIENT}
                        defaultChecked
                    />
                    <label className="label-style" htmlFor="client-radio">
                        <i className="fa-regular fa-circle-user bg-secondary"></i> Client
                    </label>
                    <input
                        type="radio"
                        name="user-type-radio"
                        value={UserTypes.RESTAURANT}
                    />
                    <label className="label-style" htmlFor="restaurant-radio">
                        <i className="fa-solid fa-utensils bg-secondary"></i> Restaurant
                    </label>
                </div>
                <input className="btn-grad" type="submit" value="Register" />
            </form>
            <div className="br"></div>
        </div>
    );
};

export default Register;