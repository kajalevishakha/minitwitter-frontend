import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import API_Calls from './../../APIs/API'
import TimelinePage from './Timeline.view'
import EmptyData from './../EmptyData/EmptyData'

export class Timeline extends Component {

    constructor(props) {
        super(props)
    
        const id=this.props.loggedUserId
        this.state = {
             timelineContent:[],
             id:id,
             
        }
    }

    componentDidMount(){

        const{id}=this.state
        const{history}=this.props

        API_Calls.fetchTimelineAPI(id).then(response=>{
            console.log('response from the time line api in parent--',response)
            this.setState(
                {
                  timelineContent: response.data,
                })

        })
        .catch(code=>{

            if (code === 401 || code===400) {
                history.push("/");
            }

        })

    }
    

    
    render() {
        
        const{timelineContent}=this.state
        
        return (
            <div>
                {
                    timelineContent.length>0 ?
                    <TimelinePage timelineContent={timelineContent}/>:
                    <EmptyData/>
                }
            </div>
        )
    }
}

export default withRouter(Timeline)
