
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './Login.css';
import API_Calls from './../../APIs/API.js'


// This component renders login page on browser
class Login extends Component {
    constructor(props) {
        super(props)
       
        this.state = {
             userName:'',
             passWord:'',
        }
    }
   
    handleLogIN=event=>{

        const{userName,passWord,token}=this.state

        const loginCredentials={
            username:userName,
            password:passWord
        }

        API_Calls.loginapi(loginCredentials)
       .then(response=>{
           console.log('return response--',response.token)
           this.props.getCurrentUser(response.token)
           this.props.history.push('/minitwitter/timeline/')
       })
       .catch(error=>{
           console.log('error',error)
           alert('Please enter valid credentials!')
       })
        
       

    }
    // Function to perform action onChange event for feild of username
    changeEventUserName=event=>{
        this.setState({
           userName:event.target.value
        })
    }
    // Function to perform action onChange event for feild of username
    changeEventPassWord=event=>{
            this.setState({
              passWord:event.target.value
            })

    }
   
    render() {

        const { userName, passWord} = this.state
        return (
        <div className="loginPage">
            <form>
               
                <img src={require("./../../logo.gif")}  />
                <div id="textLogin">Login to Twitter</div><br></br><br></br>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter username "
                    value={userName}
                    name={userName}
                    required="text"
                    onChange={this.changeEventUserName}>
                </input><br></br>
                <br></br>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    value={passWord}
                    name={passWord}
                    required="password"
                    onChange={this.changeEventPassWord}>
                </input><br></br>
                <br></br><br></br>
                <button id="btnLogIn" type="button" onClick={this.handleLogIN} >Log In</button>
            </form>  
     
        </div>
        )
    }
}

export default withRouter(Login)






