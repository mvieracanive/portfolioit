import React from 'react';
import * as keys from '../content/keywords';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

export class KeywordTree extends React.Component {

  render() {
    const items = [];
    for (let i = 0; i < this.props.keywords.length; i++){
      items.push(
        <TreeRow
          selected= {this.props.selection[i]}
          keyword={this.props.keywords[i].keyword}
          index = {i} 
          onKeywordSelect = {this.props.onKeywordSelect}
        />
      );
    }
    return <div className="KeywordTree" role="presentation">
      {items}
    </div>;
  }

  componentDidMount() {  }
  componentWillUnmount() {  }
}

const GreenCheckbox = withStyles({
  root: {
    color: 'rgba(5, 0, 73, 0.7)',
    '&$checked': {
      color: 'rgba(5, 0, 73)',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

class TreeRow extends React.Component {
  constructor(props){
    super(props);

    // This binding is necessary to make `this` work in the callback    
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const cls = this.props.selected ? "Selected": "NoSelected";
    return <div className='row'>
    <GreenCheckbox checked={this.props.selected} onChange={(e) => this.handleClick(this.props.index, e)} />
        <div className = 'Keyword' onClick={(e) => this.handleClick(this.props.index, e)}>
          
          <img width= '20px' src={keys.getIco(this.props.keyword)}></img>
          <span> </span>
          <span> {this.props.keyword} </span>          
        </div>
        </div>;

  }

  handleClick(id,e) { 
    this.props.onKeywordSelect(id);
  }
}