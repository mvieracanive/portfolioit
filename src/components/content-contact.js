import React from "react";
import emailjs from 'emailjs-com';
import env from '../env';
import { TextFieldValidator } from "./utils/input-text.component";
import { CaptchaFormControl } from "./utils/captcha.component";
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
import { ModalAsyncWait } from "./utils/modal-wait.component";
import {SnackbarResponse} from './utils/snackbar-response.component';
import ReactDOM from 'react-dom';

export class Contact extends React.Component{
    constructor(props){
        super(props);

        this.executionMsg = null;
        this.sender = '';
        this.refreshComponent=false;

        this.valid = [];
        this.state={
                captchaNeeded: null,
                execute: null,                
                forceValidation: false,
            };

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleInformValidity = this.handleInformValidity.bind(this);
        this.handleSender = this.handleSender.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
        this.handleCaptchaVerification = this.handleCaptchaVerification.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.refresh = this.refresh.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
    }

    refresh(){        
        //this.executionMsg = null;
        this.sender = '';        

        this.valid = [];
        this.refreshComponent = true;
        this.setState({
            captchaNeeded: null,
            execute: null,                
            forceValidation: false,
        });        
    }

    handleResponse(res){
        this.executionMsg = res;
        //request refresh the form
        this.sender = ''; 
        this.valid = [];
        this.refreshComponent = true;
        this.setState({
            captchaNeeded: null,
            execute: null,                
            forceValidation: false,
        });
        console.log('handleResponse', this.executionMsg);
    }
    handleInformValidity(component, state){
        this.valid[component] = state;     
    }
    handleSender(sender){
        this.sender = sender;
    }
    handleOnKeyPress(e){
        if (e.charCode == 13 && e.target.id != 'form_message')
            this.handleOnClick();
    }
    handleCaptchaVerification(token, ekey){
        this.setState({captchaNeeded: ''});        
    }
    handleOnSubmit(e){
        e.preventDefault();       
    }

    async handleSendEmail(service, template, form, user, sender){
        try{
            const response = await emailjs.sendForm(service, template, form, user);
            return {
                msg: `SUCCESS! Thanks for your message${sender ? ' ' + sender : ''}. I will answer as soon as possible.`,
                severity: 'success'
            };
        }
        catch(error){
            console.log('FAILED...', error);
            return {
                msg:'FAILED! Please communicate with admin to understand what happend.',
                severity:'error',
            };
        };
    }
    handleOnClick(){
        let valid = true;
        this.valid.forEach(element => {
            valid = valid && element;
            if (!valid){
                this.setState({validationErrors: 'Please check information, there are unsupported input data.'})
                return;
            }
        });
        if (this.state.captchaNeeded == null){
            this.setState({captchaNeeded: 'Please I need you to tell me you are not a bot.'});
        }
        valid = valid && !this.state.captchaNeeded;
        console.log('handleclic antes de captcha', valid);
        if (!valid){
            this.setState({forceValidation: true});
            return;
        }
        console.log('paso validacion de captcha')
        if (valid){
            this.setState({execute: true});
        }          
    }
/*{this.executionMsg ? 
                            <SnackbarResponse
                                msg={this.executionMsg.msg}
                                severity={this.executionMsg.severity}
                            /> 
                            : null
                }*/
    render(){  
        /*if (this.refreshComponent){
            ReactDOM.unmountComponentAtNode(document.getElementById('hcaptchaContainer'));
          } */
            return <div className='Contact ContentWithSmallMargin col-lg-6'> 
                {this.state.execute ?  
                    <ModalAsyncWait 
                        onExeAsyncFun={this.handleSendEmail}
                        args={[env.SERVICE_ID, env.TEMPLATE_ID, document.getElementById('formContactMe'), env.USER_ID, this.sender]}
                        handleShowResponse={this.handleResponse}
                    />  
                    : null } 
                {this.executionMsg != null ?
                    <SnackbarResponse severity={this.executionMsg.severity} msg={this.executionMsg.msg} open={true}/>
                    : null
                }
                
                    
                <h3>You can contact me by sending me an email</h3>
                <form 
                    id='formContactMe' 
                    className='FormContact' 
                    onSubmit={ this.handleOnSubmit}
                    onKeyPress={this.handleOnKeyPress}
                >
                    <div className='FormContainer'>
                        <input type='hidden' name='to_name' value='Maia'></input>
                        <input type='hidden' name='accessToken' value={env.TOKEN}></input>
                    
                        <TextFieldValidator 
                            label='Your name' 
                            name='from_name'
                            required
                            validations={[
                                {
                                    handle: 'isEmpty',
                                    errorMsg: 'Field is mandatory',
                                    not: true
                                }
                            ]}
                            componentId={0}
                            informValidity={this.handleInformValidity}
                            informData={this.handleSender}
                            forceValidation={this.state.forceValidation}
                            refresh={this.refreshComponent}
                        />
                        <TextFieldValidator 
                            label='Your email' 
                            name='reply_to'
                            required
                            validations={[
                                {
                                    handle: 'isEmpty',
                                    errorMsg: 'Field is mandatory',
                                    not: true
                                }
                            ]}
                            componentId={1}
                            informValidity={this.handleInformValidity}
                            forceValidation={this.state.forceValidation}
                            refresh = {this.refreshComponent}
                        />
                        <TextFieldValidator 
                            id='form_message'
                            label='Your message' 
                            name='message'
                            required
                            rows={5}
                            validations={[
                                {
                                    handle: 'isEmpty',
                                    errorMsg: 'Field is mandatory',
                                    not: true
                                }
                            ]}
                            componentId={2}
                            informValidity={this.handleInformValidity}
                            forceValidation={this.state.forceValidation}
                            refresh = {this.refreshComponent}
                        />
                        <CaptchaFormControl 
                            sitekey={env.hCAPTCHA}
                            onVerify={this.handleCaptchaVerification}
                            error={this.state.captchaNeeded}
                            refresh = {this.refreshComponent}
                        />            
                    </div>  
                                      
                </form> 
                <div style={{marginTop:7}}>
                    <ColorButton 
                        variant='contained'
                        color='black' 
                        onClick={this.handleOnClick}
                        endIcon={<SendIcon />}
                    >
                        Send email
                    </ColorButton>
                </div>         
            </div>;
    }

    componentDidUpdate(props, state){
        if (this.refreshComponent){
            this.refreshComponent = false;
        } 
        if (this.executionMsg != null){
            this.executionMsg = null
        }
        console.log('componentDidUpdate', this.executionMsg);
    }
    /*loadJs(url, implementationCode, location){
    
        var scriptTag = document.createElement('script');
        scriptTag.src = url;
    
        scriptTag.onload = implementationCode;
        scriptTag.onreadystatechange = implementationCode;
    
        location.appendChild(scriptTag);
        scriptTag.onload();
    };*/

    /*handleOnLoadScript(){
           
        this.state = {loadedEmailjs: true};
        alert('loaded script');
    }   */    

    componentDidMount(){
        /*this.loadJs('https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js', 
            this.handleOnLoadScript, document.body);*/
    }
}

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('rgb(0,0,0)'),
      backgroundColor: 'rgb(0,0,0)',
      '&:hover': {
        backgroundColor: 'rgb(0, 0 , 0, 0.7)',
      },
    },
  }))(Button);
