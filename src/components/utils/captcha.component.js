import React from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { FormControl, FormHelperText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ReactDOM from 'react-dom';

export class CaptchaFormControl extends React.Component {
    render(){
        return  <div id='formcontrolcaptcha'>                
                    <Captcha id='captcha-error'
                                sitekey={this.props.sitekey}
                                onVerify={this.props.onVerify}
                                error={this.props.error}
                                refresh={this.props.refresh}
                            />
                </div>;
    }

    shouldComponentUpdate(nextprops, nextstate){
      /*if(nextprops.refresh)
        ReactDOM.render(
          <Captcha id='captcha-error'
                                sitekey={this.props.sitekey}
                                onVerify={this.props.onVerify}
                                error={this.props.error}
                                refresh={this.props.refresh}
                            />, 
          document.getElementById("formcontrolcaptcha")
        );*/
      return true;
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        overflowX: "unset",
        overflowY: "unset",
        "&::before": {
            content: '""',
            position: "absolute",
            marginRight: "-0.71em",
            bottom: 0,
            right: 0,
            width: 10,
            height: 10,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[1],
            transform: "translate(-50%, 50%) rotate(135deg)",
            clipPath: "polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))",
        },
    },
    CaptchaError: {
        width: '100%',
        margin: '8px',
        borderBottom: '2px solid red',
        padding: 0,
        paddingLeft: '16px'
    },
    CaptchaNormal: {
        width: '100%',
        margin: '8px',
    }
  }));

function Captcha(props){
    const classes = useStyles();      
    return <FormControl error={props.error}>
                <div id='hcaptchaContainer' className={props.error ? classes.CaptchaError : classes.CaptchaNormal}>
                    <HCaptchaRefresh 
                        id='captcha'
                        sitekey={props.sitekey}
                        onVerify={props.onVerify}
                        refresh={props.refresh}
                      />                                          
                </div> 
                {props.error ? <FormHelperText id="my-helper-text">{props.error}</FormHelperText> : null}
            </FormControl>;
}

class HCaptchaRefresh extends React.Component{
  constructor(props){
    super(props);
    this.hcaptcha = React.createRef();
  }
  render(){
    const flag = this.props.refresh;
    return <HCaptcha 
        ref={this.hcaptcha} 
        {...this.props}
      />;
  }
  shouldComponentUpdate(nextprops, nextstate){
    if (this.hcaptcha && nextprops.refresh)
      this.hcaptcha.current.resetCaptcha();
    //console.log("houldcomponentUpdate Hcaptcha", this.hcaptcha);
    return true;
  }
}