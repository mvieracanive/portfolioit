import React from 'react';

export class Header extends React.Component{

    render(){
        const cls = this.props.mobile ? 'Smaller' : null
        return <header className={cls}>
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