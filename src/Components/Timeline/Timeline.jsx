import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import API_Calls from './../../APIs/API'
import TimelinePage from './Timeline.view'

export class Timeline extends Component {

    constructor(props) {
        super(props)
    
        const id=this.props.loggedUserId
        this.state = {
             timelineContent:[],
             id:id,
             shouldCallUI:false
        }
    }

    componentDidMount(){

        const{id}=this.state

        API_Calls.fetchTimelineAPI(id).then(response=>{
            console.log('response from the time line api in parent--',response)
            this.setState(
                {
                  timelineContent: response.data,
                  shouldCallUI:true
                })

        })
        .catch(code=>{

            if (code === 401 || code===400) {
                this.props.history.push("/");
            }

        })

    }
    

    
    render() {
        
        const{shouldCallUI}=this.state
        
        return (
            <div>
                {
                    shouldCallUI===true ?
                    <TimelinePage timelineContent={this.state.timelineContent}/>:
                    null  
                }
            </div>
        )
    }
}

export default withRouter(Timeline)
