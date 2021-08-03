import React from 'react';
import { About } from './content-about';
import { Contact } from './content-contact';
import { ModalAsyncWait } from './utils/modal-wait.component';
import { JobExamplesContainer } from './content-examples';
import { ShowResponse } from './utils/response.component';

export class Content extends React.Component {

    constructor(props){
        super(props);

        this.state={
            content: ''
        }
    }
    
    handleInternalLinks(){

    }
    render() {
        let scontent = "";
        switch (this.props.content_id) {
            case 'home':
                scontent = <JobExamplesContainer />;
                break;
            case 'response':
                scontent = <ShowResponse msg={this.props.msg}/>;
                break;
            case 'about':
                scontent = <About />;
                break;
            case 'contact':
                scontent = <Contact 
                    handleResponse={this.props.handleResponse}
                    />;
                break;
            default:
                scontent = <JobExamplesContainer />;
        }

        return <div className = "container">                    
                    {scontent}
                </div>;
    }
    
    componentDidMount() {  }
    componentWillUnmount() {  }
} 