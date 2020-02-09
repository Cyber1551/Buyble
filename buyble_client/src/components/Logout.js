import { auth } from "./auth";
import { Redirect } from "react-router-dom";
import React from 'react';


export class Logout extends React.Component
{
    constructor()
    {
        super();
        auth.logout();
        
    }
    render()
    {
        return(
            <Redirect to='/' />
        )
    }
    
}