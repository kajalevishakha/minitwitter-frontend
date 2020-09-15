
import React, { Component } from 'react'
import axios from 'axios'

export class FollowUserAPI extends Component {



    componentDidMount(){


        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("token"),
          };
          const id = this.props.id;
          axios
            .post("http://127.0.0.1:8020/minitwitter/users/" + id + "/followings/", {
              'following_id': id,
            })
            .then((response) => {
              console.log("successfully followed", response);
              this.props.returnResponse(response)
            })
            .catch((error) => {
              console.log(error.response);
              this.props.errorCode(error.response['status'])
            });

    }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default FollowUserAPI
