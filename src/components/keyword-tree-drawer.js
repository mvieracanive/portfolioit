import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SearchSharp from '@material-ui/icons/SearchSharp';
import React from "react";
import { KeywordTree } from './keyword-tree.js';

export class KeywordTreeDrawer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            drawer: false
        }
        // This binding is necessary to make `this` work in the callback    
        this.handleToogleDrawer = this.handleToogleDrawer.bind(this);
    }

    handleToogleDrawer(state, event=null){        
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    
        this.setState({ drawer: state });
    }

    render(){
        return <React.Fragment>
            <FilterButton toggleDrawer={this.handleToogleDrawer} />
            <Drawer 
                state={this.state.drawer} 
                toggleDrawer={this.handleToogleDrawer} 
                selection = {this.props.selection}
                keywords = {this.props.keywords}
                onKeywordSelect = {this.props.onKeywordSelect}   
            />
        </React.Fragment>
            
    }        
}

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: 'inherit',
        background: 'inherit',
        '&:hover': {
            //background: 'radial-gradient(circle, pink 0%,  white 100%)'
            fontSize: 'inherit',
            color: 'rgb(50, 0, 10)'
        },
        color: 'rgb(53, 0, 10)',
    },
}));

function FilterButton(props) {
    const classes = useStyles();

    return <div className='KeywordDrawerButton'>
        <IconButton 
            aria-label="Reduce examples" 
            className={classes.root} 
            onClick={(e) => props.toggleDrawer(true, e)}>
            <SearchSharp fontSize="inherit" color='inherit' />
        </IconButton>
    </div>
    
}

function Drawer(props){
    return <SwipeableDrawer
                anchor='left'
                open={props.state}
                onClose={() => props.toggleDrawer(false)}
                onOpen={() => props.toggleDrawer(true)}
                >
                <KeywordTree
                    selection = {props.selection}
                    keywords = {props.keywords}
                    onKeywordSelect = {props.onKeywordSelect}
                />
            </SwipeableDrawer>
}