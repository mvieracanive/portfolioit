import React from 'react';
import { keywordSorted } from '../content/keywords';
import { Examples } from './job-examples.js';
import { KeywordBanner } from './keywords-banner.js';

export class JobExamplesContainer extends React.Component {
    constructor(props){
      super(props);
      this.keywords = keywordSorted();

      const selection = [];
      this.keywords.forEach(element => {
        selection.push(true);
      });

      this.state = {selection: selection};
      // This binding is necessary to make `this` work in the callback    
      this.funOnKeywordSelect = this.funOnKeywordSelect.bind(this);
    }
  
    funOnKeywordSelect(index){
      this.setState(function(state, props) {
        let slc = [...state.selection];   
        slc[index] = !state.selection[index];
        return {selection: slc};
      });
    }

    render() {
      let voidEx = null;
      if (this.state.selection.indexOf(true)<0){
        voidEx = <p style=
          {{fontStyle: 'italic', color: 'red'}}>
            Please, choose a keyword in upper banner to see some examples</p>;
      }
      return <React.Fragment>
          <KeywordBanner 
              selection = {this.state.selection}
              keywords = {this.keywords}
              onKeywordSelect = {this.funOnKeywordSelect}/>
             
        <div className = "ExamplesContainer row ContentWithMargin">  
          <div className='col-md-1'>
          </div>
          <div className='col-md-10'>
            {voidEx}
            <Examples className="Examples"
              selectedKeywords = {this.state.selection}
              keywords = {this.keywords}           
            />
          </div> 
          <div className='col-md-1'>
          </div>
      </div>
    </React.Fragment>;
    }
    
    componentDidMount() {  }
    componentWillUnmount() {  }
}