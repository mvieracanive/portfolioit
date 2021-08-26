import React from "react";
import leftDoubleArrowIco from '../images/double_left_icon.svg';
import rightDoubleArrowIco from '../images/double_right_icon.svg';
import { SlideEvent } from "./utils/slide-event";
import { VerticalDivider } from "./utils/vertical-divider.component";

export class KeywordBanner extends React.Component{
    constructor(props){
        super(props);

        this.coordinates = [];  
        this.right = null;
        this.left = null;
        this.touchSurfaceID = 'keysTouchBanner';

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
        this.handleOnResize = this.handleOnResize.bind(this);
        this.handleMoveByTouch = this.handleMoveByTouch.bind(this);
    }

    handleOnResize(e){        
        const itemsContainer = document.querySelector('.KeywordBannerItems');
        const rect = itemsContainer.getBoundingClientRect();

        this.right = rect.right;
        this.left = rect.left;
        
        if (this.isLastVisible())
            this.setState({controlLeft: false});
        else
            this.setState({controlLeft: true});
        
        if (this.isFirstVisible())
            this.setState({controlRight: false});
        else
            this.setState({controlRight: true});
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
    handleMoveByTouch(dist){ 
        const itemsContainer = document.querySelector('.KeywordBannerItems');
        itemsContainer.scrollLeft = itemsContainer.scrollLeft + dist;

        const fv = this.isFirstVisible();
        const lv = this.isLastVisible();

        if (fv){this.setState({controlRight: false}); }            
        if (!this.state.controlLeft){this.setState({controlLeft: true}); }
        
        if (lv){this.setState({controlLeft: false}); }            
        if (!this.state.controlRight && !fv){this.setState({controlRight: true}); } 
            
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
                <div id={this.touchSurfaceID} className='KeywordBannerItems'>
                    {items} 
                </div>
                <OffsetControl type='right' state={this.state.controlLeft} handle={this.handleMoveLeft}/>
           
        </div>
    }

    componentDidMount(){
        window.addEventListener("resize", this.handleOnResize);
        const itemsContainer = document.querySelector('.KeywordBannerItems');
        const rect = itemsContainer.getBoundingClientRect();

        this.right = rect.right;
        this.left = rect.left;
        if (this.isLastVisible())
            this.setState({controlLeft: false});
        
        this.slideEvent = new SlideEvent(this.touchSurfaceID, null, null, this.handleMoveByTouch);
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
                <img alt="Right offseting control" src={rightDoubleArrowIco} />
            </div>
      }
      if (props.type == 'right' && !props.state){
        return <div className='KeywordBannerSliders HideElement'>
                <img alt="Right offseting control" src={rightDoubleArrowIco} />
            </div>
      }
      if (props.type == 'left' && props.state){
        return <div className='KeywordBannerSliders' onClick={props.handle}>
                <img alt="Left offseting control" src={leftDoubleArrowIco} />
            </div>
      }
      if (props.type == 'left' && !props.state){
        return <div className='KeywordBannerSliders HideElement'>
                <img alt="Left offseting control" src={leftDoubleArrowIco} />
            </div>
      }
      return null
  }