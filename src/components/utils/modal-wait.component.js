import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PlayCircleFilledWhite } from '@material-ui/icons';

export class ModalAsyncWait extends React.Component{
  constructor(props){
    super(props);

    this.state = {open: true};

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(msg){
    this.setState({open: false});
    this.props.handleShowResponse(msg);
  }

  render(){
    return <FullModal 
        open={this.state.open}        
      />;
  }

  async componentDidMount(){
    let msg;
    if (this.props.onExeAsyncFun){
      msg=await this.props.onExeAsyncFun(...this.props.args);
    }
    this.handleClose(msg);
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgb(100,100,100, 0.5)',
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    top: 0,
    left: 0,
  },
  content: {
    textAlign: 'center',
    color: 'white',
  }
}));

export default function FullModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
    
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal+' ContentWithSmallMargin'}
      >
        <div className={classes.paper}>          
          <p className={classes.content} id="simple-modal-description">       
            <h3>Please, wait...</h3>
            <CircularProgress />
          </p>
        </div>
      </Modal>
    </div>
  );
}