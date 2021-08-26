import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import BookSharpIcon from '@material-ui/icons/BookSharp';
import EmailSharpIcon from '@material-ui/icons/EmailSharp';
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import '../sass/mobile-main-menu.scss';
import { makeStyles } from '@material-ui/core';
import { VerticalDivider } from './utils/vertical-divider.component';


export class MobileMainMenu extends React.Component {
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
      return <nav className = "MobileMainMenu">    
          <MainMenuAccess 
            handleClick={this.handleClick.bind(this, 'home')}
            text='EXAMPLES' 
            contentid='home' 
          />
          
          <MainMenuAccess 
            handleClick={this.handleClick.bind(this, 'about')}
            text='ABOUT ME'  
            contentid='about'
          />
          
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
         
          
          <MainMenuAccess 
            handleClick={()=>window.open('https://www.linkedin.com/in/maia-viera-ca%C3%B1ive/', '_blank', 'noreferrer')}
            text='LINKEDIN'  
            contentid='linkedin'
          />
          
          <MainMenuAccess 
            handleClick={()=>window.open('https://www.npmjs.com/~mvieracanive', '_blank', 'noreferrer')}
            text='NPM'  
            contentid='npm'
          />
          
          <MainMenuAccess 
            handleClick={()=>window.open('https://maiavieracanive.medium.com', '_blank', 'noreferrer')}
            text='BLOG'
            contentid='blog'
          />          
         
          
          
      </nav>;
    }
    
    componentWillUnmount() {  }
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '10px',
        borderRadius: 100,
        boxShadow: '0px 5px 10px rgb(226, 226, 226)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        color: 'black',
    },
    square: {
        padding: '10px',
        boxShadow: '0px 5px 10px rgb(226, 226, 226)',
        color: 'rgba(80, 1, 14, 0.7)',
        borderRadius: 100,
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
    }
  }));

function MainMenuItem(props) { 
    const classes = useStyles(); 
    let cls = classes.square;
    switch (props.contentid) {
        case 'home':
            cls = classes.root
            break;
        case 'about':
            cls = classes.root
            break;
        case 'contact':
            cls = classes.root
            break;
    }
  return (
    <div className='MobileMenuAccess' 
      aria-controls="contact-menu" 
      aria-haspopup="false"
      onClick={props.handleClick}>
    <Tooltip title={props.text}>
      <div aria-label="props.text" className={cls}>
        {props.contentid == 'home' ? <HomeSharpIcon fontSize="small" /> : null}
        {props.contentid == 'about' ? <PersonSharpIcon fontSize="small" /> : null}
        {props.contentid == 'contact' ? <EmailSharpIcon color='small' fontSize="small" /> : null}
        {props.contentid == 'github' ? <GitHubIcon fontSize="small" /> : null}
        {props.contentid == 'linkedin' ? <LinkedInIcon fontSize="small" /> : null}
        {props.contentid == 'blog' ? <BookSharpIcon fontSize="small" /> : null}
        {props.contentid == 'npm' ? 
            <SvgIcon viewBox="0 0 2500 2500" fontSize='small'>            
            <path d="M1241.5 268.5h-973v1962.9h972.9V763.5h495v1467.9h495V268.5z"/>
            </SvgIcon>
         : null}
      </div>
    </Tooltip>
    </div>
  );
}

function MainMenuAccess(props) {
  return (    
    <MainMenuItem {...props} />
  );
}

/*const StyledMenu = withStyles({
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
*/
/*function MaterialUIMenuStyle(){
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
}*/