import React from "react";

export class ShowResponse extends React.Component{
    render(){
        return <div className='ContentWithSmallMargin'>
            {this.props.msg}
        </div>
    }
}