import React from "react";


export function VerticalDivider(props) {
    const margin = props.margin ? props.margin : '15px';
    return <div className='VerticalDivider' style={{
        margin: margin,
        display: 'inline',
        borderRightStyle: 'solid',
        borderRightColor: 'black',
        borderRightWidth: '1px'
    }}></div>;
}
