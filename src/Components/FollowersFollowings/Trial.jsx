import React, { Component } from 'react'

export class Trial extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             foo:this.foo()
        }
    }

    foo=()=>{
        console.log('foo')
    }
    
    render() {
        return (
            <div>
                <h1>helooo</h1>
            </div>
        )
    }
}

export default Trial
