import React from "react";
import { authService } from 'fbase';
import { signOut } from 'firebase/auth';
import { redirect } from "react-router-dom";

const Profile = () => {
    const onLogOutClick = async () => {
        await signOut(authService)
        redirect('/')
    }
    return(
        <button onClick={onLogOutClick}>Log Out</button>
    )
};;
export default Profile;