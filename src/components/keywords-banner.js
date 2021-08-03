import React from "react";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import * as keys from '../content/keywords';
import { VerticalDivider } from "./utils/vertical-divider.component";
import { TimerSharp } from "@material-ui/icons";
import leftDoubleArrowIco from '../images/double_left_icon.svg';
import rightDoubleArrowIco from '../images/double_right_icon.svg';

export class KeywordBanner extends React.Component{
    constructor(props){
        super(props);

        this.coordinates = [];  
        this.right = null;
        this.left = null;

        this.state={
            firstVisible: 0,
            controlRight: false,
            controlLeft: true,
        }

        // This binding is necessary to make `this` work in the callback    
        this.handleInformVisibility = this.handleInformVisibility.bind(this);
        this.handleMoveRight = this.handleMoveRight.bind(this);
        this.handleMoveLeft = this.handleMoveLeft.bind(this);
        this.isLastVisible = this.isLastVisible.bind(this);
        this.isFirstVisible = this.isFirstVisible.bind(this);
    }

    handleMoveRight(e){
        const itemsContainer = document.querySelector('.KeywordBannerItems');
        itemsContainer.scrollLeft = itemsContainer.scrollLeft - 100;
        if (this.isFirstVisible())
            this.setState({controlRight: false});  
        if (!this.state.controlLeft)
            this.setState({controlLeft: true}); 
    }

    handleMoveLeft(e){ 
        const itemsContainer = document.querySelector('.KeywordBannerItems');
        itemsContainer.scrollLeft = itemsContainer.scrollLeft + 100;
        if (this.isLastVisible())
            this.setState({controlLeft: false});  
        if (!this.state.controlRight)
            this.setState({controlRight: true});               
    }

    handleInformVisibility(index, left, right){
        this.coordinates[index] = {left: left, right: right};  
    }

    isLastVisible(){
        const id = this.props.keywords.length-1;
        const item = document.querySelector('#keyID'+id.toString());
        const rect = item.getBoundingClientRect();

        return rect.right <= this.right + 1;
    }

    isFirstVisible(){
        const item = document.querySelector('#keyID0');
        const rect = item.getBoundingClientRect();

        return rect.left >= this.left;
    }

    render(){   
        let items = [];
        for (let i = this.state.firstVisible; i < this.props.keywords.length; i++){
            if (i < this.state.firstVisible)
                continue;
            items.push(<React.Fragment key={i}>
                <KeywordComponent
                    selected= {this.props.selection[i]}
                    keyword={this.props.keywords[i].keyword}
                    index = {i} 
                    onKeywordSelect = {this.props.onKeywordSelect}
                />
                
                {i == this.props.keywords.length-1 ?  null : <VerticalDivider  margin='10px'/>} 

            </React.Fragment>
            );
        }           
        
        return <div id='keywordsBanner' className='KeywordBanner'> 
              
                <OffsetControl type='left' state={this.state.controlRight} handle={this.handleMoveRight}/>      
                <div className='KeywordBannerItems'>
                    {items} 
                </div>
                <OffsetControl type='right' state={this.state.controlLeft} handle={this.handleMoveLeft}/>
           
        </div>
    }

    componentDidMount(){
        const itemsContainer = document.querySelector('.KeywordBannerItems');
        const rect = itemsContainer.getBoundingClientRect();

        this.right = rect.right;
        this.left = rect.left;
        if (this.isLastVisible())
            this.setState({controlLeft: false});
    }
}

class KeywordComponent extends React.Component {
    constructor(props){
      super(props);
  
      // This binding is necessary to make `this` work in the callback    
      this.handleClick = this.handleClick.bind(this);
    }  
   
    render() {
        let classSelected = 'KeywordComponentSelected';
        if (!this.props.selected)
            classSelected = '';

        return <div id={'keyID'+this.props.index}
            className = {'KeywordComponent '+classSelected}
            onClick={(e) => this.handleClick(this.props.index, e)}
            >
            <pre>
                {this.props.keyword}
            </pre>             
        </div>;  
    }
  
    handleClick(id,e) { 
      this.props.onKeywordSelect(id);
    }
  }

  function OffsetControl(props){
      if (props.type == 'right' && props.state){
          return <div className='KeywordBannerSliders' onClick={props.handle}> 
                <img src={rightDoubleArrowIco} />
            </div>
      }
      if (props.type == 'right' && !props.state){
        return <div className='KeywordBannerSliders HideElement'>
                <img src={rightDoubleArrowIco} />
            </div>
      }
      if (props.type == 'left' && props.state){
        return <div className='KeywordBannerSliders' onClick={props.handle}>
                <img src={leftDoubleArrowIco} />
            </div>
      }
      if (props.type == 'left' && !props.state){
        return <div className='KeywordBannerSliders HideElement'>
                <img src={leftDoubleArrowIco} />
            </div>
      }
      return null
  }