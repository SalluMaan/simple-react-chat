import React, { Component } from 'react'

class Counter extends Component {
    state = { 
        count:2
     }

     formatCount(){
         return this.state.count===0?"Zero":this.state.count;
     }
    render() { 
        return ( 
            <React.Fragment>
                 <span>{this.state.count}</span>
                 <button className="btn btn-danger">Increment</button>
            </React.Fragment>
           
         );
    }
}
 
export default Counter;