import React, { Component, Fragment } from 'react'
import LoginPage from './Login.view'
import API_Calls from './../../APIs/API.js'

export class Login extends Component {

    setCurrentUser=token=>{
        console.log('token after submit-->',token)
        // API_Calls.currentUserAPI().then(response=>{
        //     console.log('response of login api --',response)
        // })
        // .catch(error=>{
        //     console.log('erros status',error.status)
        // })

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
