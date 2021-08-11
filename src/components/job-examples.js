import React from 'react';
import { isKeywordSelected } from '../content/keywords';
import { Examples as Exs } from '../content/examples/examples'
import { styled } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GitHubIcon from '@material-ui/icons/GitHub';
import PublicIcon from '@material-ui/icons/Public';
import SvgIcon from '@material-ui/core/SvgIcon';

export class Examples extends React.Component {
    
  render() {
    const res = [];
    Exs.forEach(element => {
      res.push(
        <Example
          selectedKeywords = {this.props.selectedKeywords}
          keywords = {this.props.keywords}
          example = {element}
        />)
    });
    return res;
  }    
}

const TypographyTheme = styled(Typography)({  
  
});

class Example extends React.Component { 
    constructor(props){
      super(props);

      this.state = {
        code: null,
        image: null
      }
    }   

    render() {
      for (let i = 0; i < this.props.example.keywords.length; i++){
        const key = this.props.example.keywords[i];
        if (isKeywordSelected(this.props.keywords, this.props.selectedKeywords, key))
          return <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <TypographyTheme className='HeadingExample' component='h4' variant='h4' >{this.props.example.heading}</TypographyTheme>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div>
                    <Text ex = {this.props.example} />
                    <Code code={this.state.code} />
                    <Image ex={this.props.example} />
                    <Links ex = {this.props.example} />                    
                    <Keyword ex = {this.props.example} />
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>;
          
          
      }
      return null;
    }    

    componentDidMount(){
      if (this.props.example.code != undefined){
        const fetchCode = async () => {        
          const response = await fetch(this.props.example.code);  
          const code = await response.text();  
          this.setState({code: code});
    
        };    
        fetchCode();
      }          
    }
}

function Keyword(props){
      return <p className='KeywordsExample'>
        {props.ex.keywords.join(", ")}
      </p>
}
function Text(props){
  return <p className='TextExample'>
    {props.ex.text}
  </p>
} 
function Code(props){
  if (!props.code)
    return null
  return <p className='CodeExample'>
        {props.code}
      </p>;  
}
function GitHub(props){
  if (!props.ex.github)
    return null;
  return <div className='GitHubExample'>
      <GitHubIcon style={{ color: 'inherit', width: '19px', height: '19px' }} fontSize="small" />
      <span> </span>
      <a href={props.ex.github}>Repositorio</a>
    </div>
}
function Website(props){
  if (!props.ex.websiteurl)
    return null;
  return <div className='WebsiteExample'>
      <PublicIcon style={{ color: 'inherit', width: '23px', height: '23px' }} fontSize="small" />
      <span> </span>
      <a href={props.ex.websiteurl}>{props.ex.websitetitle}</a>
    </div>
}
function Sandbox(props){
  if (!props.ex.sandbox)
    return null;
  return <div className='WebsiteExample'>
      <svg style={{ color: 'inherit', width: '23px', height: '23px' }}
        enable-background="new 0 0 24 24" viewBox="0 0 24 24">
          <path fill="#fd6107" d="M22.5,17.95L22.41,6L11.955,0L1.5,6v12l10.455,6L22.5,17.95z M20.327,13.239L16.982,15.1v3.514L13.01,20.91v-8.272l7.317-4.157V13.239z M10.905,20.91l-3.972-2.296v-3.516l-3.345-1.86V8.481l7.317,4.157V20.91z M4.634,6.601L4.633,6.6l3.913-2.255l3.43,1.968l3.41-1.945l3.871,2.197l-7.32,4.18L4.634,6.601z"/></svg>
      <span> </span>
      <a href={props.ex.sandbox}>{props.ex.sandboxtitle}</a>
    </div>
}
function Links(props){
  if (!props.ex.github || !props.ex.websiteurl){
    return <div className='LinksExample row'>
      <GitHub ex={props.ex} />      
      <Website ex={props.ex} />
      <Sandbox ex={props.ex} />
    </div>
  }
  return <div className='LinksExample row'>
      <GitHub ex={props.ex} />
      <SvgIcon style={{ width: '8px', height: '8px' }} viewBox="0 0 24 24">
        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z" />
      </SvgIcon>
      <Website ex={props.ex} />
    </div>
}
function Image(props){
  if (!props.ex.img)
    return null;
  return <div className='ImageExample'>
      <img src={props.ex.img} width = '80%' ></img>
    </div>
}
