import React, { Component } from 'react'
import axios from 'axios'

export class GetAllUserAPI extends Component {


    componentDidMount(){

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }
        axios
        .get('http://127.0.0.1:8020/minitwitter/users/')
        .then( response=>{
                console.log('response of all users api-->',response)
                
                this.props.returnResponse(response)
            
              
                
                

        })
        .catch(error=>{
           this.props.errorCode(error['status'])
            // if(error['status']===400 || error['status']===401){
            //     history.push('/')
            // }
        })
    }



    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default GetAllUserAPI
