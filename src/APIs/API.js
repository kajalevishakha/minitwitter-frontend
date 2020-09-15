
import axios from 'axios'




export function loginapi(credentials){

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
        const userToken = response.data.token;
        console.log("token after rgtn ", response.data.token);
        localStorage.setItem("token", userToken);
        
           
      }
      return response.data
    })
    .catch(error=>{

        console.log(error.response.status)
        if(error.response.status===400){
            alert('wrong credentials!')
        }
       
        
    })
    
   
}