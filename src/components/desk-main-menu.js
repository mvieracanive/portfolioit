import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import BookIcon from '@material-ui/icons/Book';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import { VerticalDivider } from "./utils/vertical-divider.component";



export class DeskMainMenu extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        anchorHome: null,
        anchorOther: null,
        anchorAbout: null,
        anchorContact: null,
      };
      // This binding is necessary to make `this` work in the callback    
      this.handleClick = this.handleClick.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.setAnchorEl = this.setAnchor.bind(this);
    }

    setAnchor(anchor, value){
      switch (anchor) {
        case 'home':
          this.setState({anchorHome: value});
          this.props.onChangeContent(anchor);
          break;
        case 'other':
          this.setState({anchorOther: value});
          break;
        case 'about':
          this.setState({anchorAbout: value});
          this.props.onChangeContent(anchor);
          break;
        case 'contact':
          this.setState({anchorContact: value});
          this.props.onChangeContent(anchor);
          break;
      }       
    }
    
    handleClick(target, event) {
      this.setAnchor(target, event.currentTarget);
    };

    handleClose(target){
      this.setAnchor(target, null);
    }

    render() {
      console.log(window.innerWidth);
      return <nav className = "MainMenu">    
          <MainMenuAccess 
            handleClick={this.handleClick.bind(this, 'home')}
            text='EXAMPLES' 
            contentid='home' 
          />
          <VerticalDivider margin='8px' />
          <MainMenuAccess 
            handleClick={this.handleClick.bind(this, 'about')}
            text='ABOUT ME'  
            contentid='about'
          />
          <VerticalDivider margin='8px' />
          <MainMenuAccess 
            handleClick={this.handleClick.bind(this, 'contact')}
            text='CONTACT ME'  
            contentid='contact'
          />
          <VerticalDivider margin='8px'/>
          <MainMenuAccess 
            handleClick={()=>window.open('https://github.com/mvieracanive', '_blank')}
            text='GITHUB'  
            contentid='github'
          />
          <ArrowRightIcon />
          <VerticalDivider margin='8px'/>
          <MainMenuAccess 
            handleClick={()=>window.open('https://www.linkedin.com/in/maia-viera-ca%C3%B1ive/', '_blank', 'noreferrer')}
            text='LINKEDIN'  
            contentid='linkedin'
          />
          <ArrowRightIcon />
          <VerticalDivider margin='8px'/>
          <MainMenuAccess 
            handleClick={()=>window.open('https://www.npmjs.com/~mvieracanive', '_blank', 'noreferrer')}
            text='NPM'  
            contentid='npm'
          />
          <ArrowRightIcon />
          <VerticalDivider margin='8px'/>
          <MainMenuAccess 
            handleClick={()=>window.open('https://maiavieracanive.medium.com', '_blank', 'noreferrer')}
            text='BLOG'
            contentid='blog'
          />          
          <ArrowRightIcon />         
          
      </nav>;
    }
  
}

function MainMenuItem(props) {  
  return (
    <div 
      className='MainMenuAccess' 
      aria-controls="contact-menu" 
      aria-haspopup="false"
      onClick={props.handleClick}>
      {props.text}
    </div>
  );
}

function MainMenuAccess(props) {
  return (    
    <MainMenuItem {...props} />
  );
}

