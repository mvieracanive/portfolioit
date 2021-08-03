import React from "react";
import { Content } from './content';
import { Footer } from './footer';
import { Header } from './header';
import { MainMenu } from './main-menu';

export class Template extends React.Component{
    constructor(props){
        super(props);
        this.state = {content_id: 'home'};
        this.fresh = true;
        this.responseMsg = '';

        // This binding is necessary to make `this` work in the callback    
        this.funOnChangeContent = this.funOnChangeContent.bind(this);
        this.funOnScroll = this.funOnScroll.bind(this);
        this.funShowResponse = this.funShowResponse.bind(this);
    }

    funShowResponse(msg){
        //const text = await asyncHandle(...args);
        //console.log(text);
        this.responseMsg = msg;
        this.setState({content_id: 'response'});
    }

    funOnChangeContent(content_id){
        if (content_id != this.state.content_id)
            this.setState({content_id: content_id});
    }

    funOnScroll() {
        if (this.state.content_id != 'home'){
            const headerEl = document.getElementById("banner");
            headerEl.classList.add("Smaller");
            return;
        }
           
        const distanceY = window.pageYOffset || document.documentElement.scrollTop;
        const shrinkOn = 120;
        const headerEl = document.getElementById("banner");
        const keywordHeader = document.getElementById("keywordsBanner");
    
        if (distanceY > shrinkOn) {
          headerEl.classList.add("Smaller");
          if (keywordHeader)
            keywordHeader.classList.add("Smaller");
        } else {
          if(headerEl!=null){
            headerEl.classList.remove("Smaller");
          }           
          if (keywordHeader)
            keywordHeader.classList.remove("Smaller");
        }
    }

    render(){
        return <div>
                    <div id='banner' className={'Header Clearfix'}>
                        <MainMenu 
                            onChangeContent = {this.funOnChangeContent}
                        />
                        <Header />                        
                    </div>

                    <div className='Content'>
                        <Content 
                            content_id = {this.state.content_id}
                            handleResponse = {this.funShowResponse}
                            msg = {this.responseMsg}
                        />
                    </div>  

                    <div>
                        <Footer />
                    </div>
                </div>            
    }

    shouldComponentUpdate(nextprops, nextstate){
        if (this.state.content_id != 'home')
            document.documentElement.scrollTop = 0;
        //window.removeEventListener("scroll", this.funOnScroll, true)
        return true;
    }
    componentDidUpdate(props, state){
        this.funOnScroll();
    }
    componentDidMount() {
        window.addEventListener("scroll", this.funOnScroll, true);
        this.fresh = false;
    }
}
