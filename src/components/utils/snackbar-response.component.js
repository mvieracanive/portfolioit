import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export class  SnackbarResponse extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      open: props.open
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
    console.log('SNACKBAR RENDER ', this.state);
    return (     
        <Snackbar 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open} 
          autoHideDuration={2000} 
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity={this.props.severity}>
            {this.props.msg}
          </Alert>
        </Snackbar>
    );
  }   
}