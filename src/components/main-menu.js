import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withStyles } from '@material-ui/core/styles';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { VerticalDivider } from "./utils/vertical-divider.component";
import DeleteIcon from '@material-ui/icons/Delete';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import BookIcon from '@material-ui/icons/Book';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Tooltip from '@material-ui/core/Tooltip';

import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

const StyledMenu = withStyles({
    paper: {
      border: '0px solid #d3d4d5',
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(105, 105, 135, .3)',
      padding: '0 30px',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      {...props}
    />
  ));

export class MainMenu extends React.Component {
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
      this.handleOnResize = this.handleOnResize.bind(this);
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
  
    handleOnResize(e){
      console.log(window.innerWidth)
    }
    handleClick(target, event) {
      this.setAnchor(target, event.currentTarget);
    };

    handleClose(target){
      this.setAnchor(target, null);
    }

    render() {
      return <nav className = "MainMenu">    
          <MainMenuAccess 
            handleClick={this.handleClick.bind(this, 'home')}
            text='EXAMPLES' 
            contentid='home' 
          />
          <VerticalDivider />
          <MainMenuAccess 
            handleClick={this.handleClick.bind(this, 'about')}
            text='ABOUT ME'  
            contentid='about'
          />
          <VerticalDivider  />
          <MainMenuAccess 
            handleClick={this.handleClick.bind(this, 'contact')}
            text='CONTACT ME'  
            contentid='contact'
          />
          <VerticalDivider/>
          <MainMenuAccess 
            handleClick={()=>window.open('https://github.com/mvieracanive', '_blank')}
            text='GITHUB'  
            contentid='github'
          />
          <ArrowRightIcon />
          <VerticalDivider/>
          <MainMenuAccess 
            handleClick={()=>window.open('https://www.linkedin.com/in/maia-viera-ca%C3%B1ive/', '_blank')}
            text='LINKEDIN'  
            contentid='linkedin'
          />
          <ArrowRightIcon />
          <VerticalDivider/>
          <MainMenuAccess 
            handleClick={()=>window.open('https://maiavieracanive.medium.com', '_blank')}
            text='BLOG'
            contentid='blog'
          />
          <ArrowRightIcon />
          
          
      </nav>;
    }
    
    componentDidMount() { 
      window.addEventListener("resize", this.handleOnResize);
    }
    componentWillUnmount() {  }
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
  return (
    <div className='MobileMenuAccess' 
      aria-controls="contact-menu" 
      aria-haspopup="false"
      onClick={props.handleClick}>
    <Tooltip title={props.text}>
      <IconButton aria-label="props.text">
        {props.contentid == 'home' ? <HomeIcon fontSize="small" /> : null}
        {props.contentid == 'about' ? <PersonIcon fontSize="small" /> : null}
        {props.contentid == 'contact' ? <EmailIcon fontSize="small" /> : null}
        {props.contentid == 'github' ? <GitHubIcon fontSize="small" /> : null}
        {props.contentid == 'linkedin' ? <LinkedInIcon fontSize="small" /> : null}
        {props.contentid == 'blog' ? <BookIcon fontSize="small" /> : null}
      </IconButton>
    </Tooltip>
    </div>
  );
}

function MainMenuAccess(props) {
  return (
    
    <MainMenuItem {...props} />
  );
}

function MaterialUIMenuStyle(){
  return <React.Fragment>
    <Button fontSize={40} aria-controls="home-menu" aria-haspopup="false" onClick={this.handleClick.bind(this, 'home')}>
            Home
          </Button>
          <Menu
            id="home-menu"
            anchorEl={this.state.anchorHome}
            keepMounted
            open={false}
            onClose={this.handleClose.bind(this, 'other')}
          >
          </Menu>

          <Button 
            aria-controls="other-menu" 
            aria-haspopup="true" 
            onClick={this.handleClick.bind(this, 'other')}
            endIcon={<ArrowDropDownIcon />}
          >
            Other links
          </Button>
          
          <StyledMenu
            id="other-menu"
            anchorEl={this.state.anchorOther}
            keepMounted
            open={this.state.anchorOther}
            onClose={this.handleClose.bind(this, 'other')}
          >
          
            <MenuItem onClick={this.handleClose.bind(this, 'other')}>
              <ListItemIcon>
                <GitHubIcon fontSize="small" />
              </ListItemIcon> 
              <a 
                href={'https://github.com/mvieracanive'} 
                target={'_blank'}
              >
                GitHub
              </a>
            </MenuItem>
            <MenuItem onClick={this.handleClose.bind(this, 'other')}>
              <ListItemIcon>
                <BookIcon fontSize="small" />
              </ListItemIcon>
              <a 
                href={'https://maiavieracanive.medium.com'} 
                target={'_blank'}
              >
                Blog
              </a>
            </MenuItem>
            <MenuItem onClick={this.handleClose.bind(this, 'other')}>
              <ListItemIcon>
                <LinkedInIcon fontSize="small" />
              </ListItemIcon>
              <a 
                href={'https://www.linkedin.com/in/maia-viera-ca%C3%B1ive/'} 
                target={'_blank'}
              >
                LinkedIn
              </a>
            </MenuItem>
          </StyledMenu>

          <Button aria-controls="about-menu" aria-haspopup="false" onClick={this.handleClick.bind(this, 'about')}>
            About me
          </Button>
          <Menu
            id="about-menu"
            anchorEl={this.state.anchorAbout}
            keepMounted
            open={false}
            onClose={this.handleClose.bind(this, 'about')}
          >
          </Menu>   
                
          <Button aria-controls="contact-menu" aria-haspopup="false" onClick={this.handleClick.bind(this, 'contact')}>
            Contact me
          </Button>
          <Menu
            id="contact-menu"
            anchorEl={this.state.anchorContact}
            keepMounted
            open={false}
            onClose={this.handleClose.bind(this, 'contact')}
          >
          </Menu>
          </React.Fragment>;
}