import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../contexts/AuthContext";
import { PagesPaths } from "../../pages/types";
import { useSnackbar } from 'notistack';

const LogoutButton = () => {
    const { logOut } = useUserAuth();
    const navigate  = useNavigate();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const logOutHandler =  async() => {
        try{
            await logOut();
            navigate(PagesPaths.LANDING);
            enqueueSnackbar("Logged out successfully")
        }catch(err){
            enqueueSnackbar('couldnt log out');
            console.log(err)
        }
    }

    return(
        <button className="btn btn-grad" onClick={logOutHandler}>
            Log Out
        </button>
    )
}

export default LogoutButton;