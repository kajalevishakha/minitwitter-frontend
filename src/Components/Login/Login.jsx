import React, { Component, Fragment } from 'react'
import LoginPage from './Login.view'


export class Login extends Component {

    setCurrentUser=token=>{
        console.log('token after submit-->',token)
    }


    render() {
        return (
            <Fragment>
                <LoginPage getCurrentUser={this.setCurrentUser}/>
            </Fragment>
        )
    }
}

export default Login
