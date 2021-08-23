import React from "react";
import { DeskMainMenu } from "./desk-main-menu";
import { MobileMainMenu } from './mobile-main-menu';

export class MainMenu extends React.Component {
    constructor(props){
        super(props);
        this.brk = 866;
        this.state = { viewport: window.innerWidth};
        // This binding is necessary to make `this` work in the callback    
        this.handleOnResize = this.handleOnResize.bind(this);
    }
    handleOnResize(e){
        console.log(window.innerWidth);
        if (window.innerWidth < this.brk && this.state.viewport >= this.brk)
            this.setState({viewport: window.innerWidth});
        else if (window.innerWidth > this.brk && this.state.viewport <= this.brk)
            this.setState({viewport: window.innerWidth}); 
    }
    render(){
        let cmp = <MobileMainMenu
                    onChangeContent = {this.props.onChangeContent}
                />
        if (this.state.viewport >= this.brk) 
            cmp = <DeskMainMenu 
                    onChangeContent = {this.props.onChangeContent}
                />;
        return cmp;
    }
    componentDidMount() { 
        window.addEventListener("resize", this.handleOnResize);
    }
}