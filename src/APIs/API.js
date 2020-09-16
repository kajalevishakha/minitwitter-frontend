
import axios from 'axios'

 class Calls {

    loginapi=credentials=>{

        console.log('in function call--',credentials)
    
        const name=credentials.username
        const pass=credentials.password
        
       return  axios
        .post("http://127.0.0.1:8020/minitwitter/login/", {
          username: name,
          password: pass,
        })
        .then((response) => {
          console.log("login-", response);
          
          if (response["status"] === 200) {
            console.log("token after rgtn ", response.data.token);
            localStorage.setItem("token", response.data.token);
            
               
          }
          return response.data
        })
        .catch(error=>{
    
            console.log(error.response.status)
           
        })
        
       
    }

    registrationAPI=userData=>{
        console.log('in registration api ',userData)
        const{firstname,lastname,username,email,password}=userData
        return axios
        .post("http://127.0.0.1:8020/minitwitter/users/", {
          first_name: firstname,
          last_name: lastname,
          email: email,
          username: username,
          password: password,
        }) 
        .then((response) => {
          console.log('registration response-->',response);
          return response['status']
  
        })
        .catch((error) => {
          console.log(error.response["status"]);
          return error.response["status"]
        });
    }

    currentUserAPI=()=>{

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }



        return axios
        .get('http://127.0.0.1:8020/minitwitter/current_user/')
        .then( response=>{
                console.log('response of current user api -->',response)
                return response
                

        })
        .catch(error=>{

            console.log(error)
            const errorCode=error['status']
            this.props.errorCode(errorCode)
           
            
        })
    }

    postTweetAPI=tweet=>{

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }

        console.log(' in post tweet api -- ',tweet)
        
        return axios
        .post('http://127.0.0.1:8020/minitwitter/tweets/',{'content':tweet})
        .then(response=>{
            console.log('posting tweet -->',response)
            return response['status']
        })
        .catch(error=>{
            console.log(error);
            return error['status']
        })

    }
    fetchAllUsersAPI=()=>{

        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: "token "+localStorage.getItem('token')
        }
        return axios
        .get('http://127.0.0.1:8020/minitwitter/users/')
        .then( response=>{
                console.log('response of all users api-->',response)
               return response
        })
        .catch(error=>{
           this.props.errorCode(error['status'])
            return error['status']
        })
        
    }

    editProfileAPI=userData=>{

        const{id,bio}=userData

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("token"),
          };

        return axios
        .put("http://127.0.0.1:8020/minitwitter/users/" + id + "/", {
        'bio': bio,
        })
        .then((response) => {
            console.log("response after edit-->", response);
            return response['status']
        })
        .catch((error) => {

           return error['status']
        })

    }

    fetchProfileAPI=id=>{

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("token"),
          };


        return axios
            .get("http://127.0.0.1:8020/minitwitter/users/" + id + "/")
            .then((response) => {
              console.log("response of edit api -->", response);
              return response
            })
            .catch((error) => {
              console.log(error["status"]);
              return error["status"]
              
            
            });

    }

    fetchTimelineAPI=id=>{

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("token")
        };
      
        return axios
            .get("http://127.0.0.1:8020/minitwitter/tweets/",{'id':id})
            .then((response) => {
              console.log("response of timeline-", response);
              return response
            })
            .catch((error) => {
              console.log(error.response["status"]);
              return error.response["status"]
            
            });

    }
    fetchFollowersAPI=id=>{

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("token"),
          };
        return axios
            .get("http://127.0.0.1:8020/minitwitter/users/" + id + "/followers/", {'id': id,})
            .then((response) => {
              console.log("followers api response -->", response.data);
              return response
            })
            .catch((error) => {
                return error.response["status"]
           
            });

    }
    fetchFollowingsAPI=id=>{

        console.log("id in get following api--",id)
        
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("token"),
          };
        return axios
            .get("http://127.0.0.1:8020/minitwitter/users/" + id + "/followings/", {'id': id,})
            .then((response) => {
              console.log("followings api response -->", response.data);
              return response
            })
            .catch((error) => {
                return error.response["status"]
           
            });
    }
    followUserAPI=id=>{

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("token"),
          };
          
        return axios
            .post("http://127.0.0.1:8020/minitwitter/users/" + id + "/followings/", {
              'following_id': id,
            })
            .then((response) => {
              console.log("successfully followed", response);
              return response['status']
            })
            .catch((error) => {
              console.log(error.response);
              return error.response['status']
            });

    }
    unfollowUserAPI=userData=>{


        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("token"),
          };
      
          const following_id = userData.unfollowid;
          const id = userData.logid;
      
          return axios
            .delete(
              "http://127.0.0.1:8020/minitwitter/users/" +
                id +
                "/followings/" +
                following_id +
                "/",
              { 'id': id, 'following_id': following_id }
            )
            .then((response) => {
              console.log(response);
              return response['status']
            })
            .catch((error) => {
              return error.response['status']
            });



    }
    

}
const API_Calls=new Calls()
export default API_Calls
