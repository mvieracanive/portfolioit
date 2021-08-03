import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { TimerSharp } from '@material-ui/icons';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export class  SnackbarResponse extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      open: props.open,
      clickClose: false
    }

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(event, reason){
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false});
  };

  render(){
    return (     
        <Snackbar open={this.state.open} autoHideDuration={2000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity={this.props.severity}>
            {this.props.msg}
          </Alert>
        </Snackbar>
    );
  } 
  
  shouldComponentUpdate(nextprops, nextstate){
    console.log('Snackbar shouldComponentUpdate', this.state.open);
    if (this.state.open != nextprops.open){
      this.setState({open: nextprops.open});
      return false;
    }
    return true;
  }
}