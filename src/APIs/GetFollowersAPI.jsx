import React, { Component } from 'react'
import axios from 'axios'

export class GetFollowersAPI extends Component {



    componentDidMount(){

        const id=this.props.id

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("token"),
          };
          axios
            .get("http://127.0.0.1:8020/minitwitter/users/" + id + "/followers/", {'id': id,})
            .then((response) => {
              console.log("followers api response -->", response.data);
              this.props.returnResponse(response)
            })
            .catch((error) => {
                this.props.errorCode(error.response["status"])
           
            });

    }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default GetFollowersAPI
