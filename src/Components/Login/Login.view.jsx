
import React, { Component } from 'react'
import './Login.css';
import axios from 'axios'
import history from './../../History';
import {loginapi} from './../../APIs/API'


// This component renders login page on browser
class Login extends Component {
    constructor(props) {
        super(props)
       
        this.state = {
             userName:'',
             passWord:''
             
             
        }
    }
   
    handleLogIN=event=>{

        const loginCredentials={
            username:this.state.userName,
            password:this.state.passWord
        }

       loginapi(loginCredentials).then(response=>{
           console.log('return response--',response)
       })
       .catch(error=>{
           console.log('error',error)
       })
        

    }

    // // Function to perform action on button click
    // handleEvent=event=>{

    //     localStorage.clear('token')
    //     axios
    //     .post('http://127.0.0.1:8020/minitwitter/login/',{'username':this.state.userName,'password':this.state.passWord}) // link of backend api
    //     .then(response=>{
    //         console.log('login response-',response);
           
    //             if(response['status'] == 200){
    //             const userToken=response.data['token']
    //             localStorage.setItem('token',userToken);
    //             axios.defaults.headers = {
    //                 'Content-Type': 'application/json',
    //                 Authorization: "token "+localStorage.getItem('token')
    //             }
    //             axios
    //             .get('http://127.0.0.1:8020/minitwitter/current_user/')
    //             .then(response=>{

    //                 console.log('response of current_user api-',response);
    //                 const userdata={
    //                     firstname:response.data.first_name,
    //                     lastname:response.data.last_name,
    //                     username:response.data.username,
    //                     id:response.data.id
    //                 }
    //                 console.log('data after logged in-',userdata)
    //                 localStorage.setItem('id',userdata.id);
    //                 history.push('/minitwitter/timeline/')

    //             })
    //             // alert(`Welcome ${this.state.userName}  !`)
    //             // event.preventDefault()
       
    //             }
    //             // event.preventDefault()
           


    //     })
    //     .catch(error=>{
    //         console.log(error.response['status']);
    //         if(error.response['status'] === 400){
    //             alert(`Empty feilds not allowed !`)
  
    //         }
    //         else if(error.response['status'] === 404){
    //            alert(`Please fill details again !`)
    //            history.push('/LoginPage')
  
    //        }
    //        else if(error.response['status'] === 401){
    //         // alert(`Please fill details again !`)
    //         history.push('/')

    //     }
           
           
    //     })

         
       
    //     event.preventDefault()
       
       
    // }
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

export default Login






