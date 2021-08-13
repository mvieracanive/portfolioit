import React from "react";
import * as aboutInfo from '../content/about'

export class About extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            about: null
        }
    }

    render(){
        return <div className='About ContentWithSmallMargin'>
                <img src={aboutInfo.photoProfile} className='Photo'></img>
                <p>                    
                    {this.state.about}
                </p> 
                <Certificates certificates={aboutInfo.certificates} />  
                <br />  
                <Awards awards={aboutInfo.awards} />
            </div>;
    }

    componentDidMount(){
        const fetchAbout = async () => {        
            const response = await fetch(aboutInfo.aboutText);  
            const about = await response.text();  
            this.setState({about: about});    
        };
    
        fetchAbout();
        //certificates
        for(let i=0; i<aboutInfo.certificates.length; i++){
            const image = document.querySelector('#imgcert'+i.toString());
            image.addEventListener('transitionstart', function() {
                this.style.zIndex = "1000";
            });
            
            image.addEventListener('transitioncancel', function() {
                this.style.zIndex = "auto";
            });
            
            image.addEventListener('transitionend', function() {
                this.style.zIndex = "auto";
                const rect = this.getBoundingClientRect();
                const flag = rect.width != 32;
                flag ? this.style.zIndex = "1000" : this.style.zIndex = "auto";
                /*const zindex = this.style.zIndex;
                let a = zindex + 1;*/
            });
        }
        //awards
        for(let i=0; i<aboutInfo.awards.length; i++){
            const image = document.querySelector('#imgawr'+i.toString());
            image.addEventListener('transitionstart', function() {
                this.style.zIndex = "1000";
            });
            
            image.addEventListener('transitioncancel', function() {
                this.style.zIndex = "auto";
            });
            
            image.addEventListener('transitionend', function() {
                this.style.zIndex = "auto";
                const rect = this.getBoundingClientRect();
                const flag = rect.width >= 70;
                flag ? this.style.zIndex = "1000" : this.style.zIndex = "auto";
                /*const zindex = this.style.zIndex;
                let a = zindex + 1;*/
            });
        }
    }
}

function Certificates(props){
    if (!props.certificates)
        return null;

    let list = [];
    for(let i=0; i < props.certificates.length; i++){
        list.push(
            <div class='col-lg-4 col-md-6 col-sm-12'>
                <img id={'imgcert'+i} src={props.certificates[i].cert} className='CertificateImg'></img>
                <h6 className='CertificateTitle'>{props.certificates[i].title}</h6>
            </div>
        )
    }
    
    return <div>
        <h4>Postgraduate qualifications</h4>   
            <div className='CertificateList'>
                {list}
            </div>
    </div>
     
}

function Awards(props){
    if (!props.awards)
        return null;

    let list = [];
    for(let i=0; i < props.awards.length; i++){
        list.push(
            <div class='col-lg-4 col-md-6 col-sm-12'>
                <img id={'imgawr'+i} src={props.awards[i].cert} className='CertificateImg'></img>
                <h6 className='CertificateTitle'>{props.awards[i].title}</h6>
            </div>
        )
    }
    
    return <div>
        <h4>Awards</h4>   
            <div className='CertificateList'>
                {list}
            </div>
    </div>;
}