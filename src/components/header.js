import React from 'react';

export class Header extends React.Component{

    render(){
        return <header>
            <div className="InlineFlexContainer">
                <div className="Logo">
                    <div className="Portfolio">
                        <h1>Portfolio</h1>
                    </div>                    
                    <div className="Name">
                        <h2>Maia Viera</h2>
                    </div>
                </div>                
            </div>
        </header>
    }        
}