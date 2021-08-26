export class SlideEvent{
    constructor(domId, handleRS, handleLS, handleM){
        this.startX = null;
        this.startY = null;
        this.prevX = null;
        this.endX = null;
        this.endY = null;
        this.threshold = 20; //required min distance traveled to be considered swipe
        this.allowedTime = 1000; // maximum time allowed to travel that distance
        this.verticalOffset = 40;
        this.elapsedTime = null;
        this.startTime = null;
        this.handleRightSwipe = handleRS;
        this.handleLeftSwipe = handleLS;
        this.handleMove = handleM;

        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMoves = this.handleTouchMoves.bind(this);
        this.isRightSwipe = this.isRightSwipe.bind(this);
        this.onRightSwipe = this.onRightSwipe.bind(this);
        this.isLeftSwipe = this.isLeftSwipe.bind(this);
        this.onLeftSwipe = this.onLeftSwipe.bind(this);

        this.touchsurface = document.getElementById(domId);
        this.touchsurface.addEventListener('touchstart', this.handleTouchStart, false);
        this.touchsurface.addEventListener('touchmove', this.handleTouchMoves, false);
        //this.touchsurface.addEventListener('touchend', this.handleTouchEnd, false);        
    }

    handleTouchMoves(e){
        const touchobj = e.changedTouches[0];

        const flag = Math.abs(this.startY - touchobj.pageY) <= this.verticalOffset;
        if(!flag || !this.handleMove)
            return;
        
        const dist = this.prevX - touchobj.pageX;
        this.prevX = touchobj.pageX;
        this.handleMove(dist);
        //e.preventDefault() // prevent scrolling when inside DIV
    }
    handleTouchStart(e){
        const touchobj = e.changedTouches[0];
        this.startX = touchobj.pageX;
        this.prevX = this.startX;
        this.startY = touchobj.pageY;
        this.startTime = e.timeStamp; // record time when finger first makes contact with surface
    }
    handleTouchEnd(e){
        const touchobj = e.changedTouches[0];
        this.endX = touchobj.pageX;
        this.endY = touchobj.pageY;
        this.elapsedTime = e.timeStamp - this.startTime; // get time elapsed        
        this.onRightSwipe();
        this.onLeftSwipe();
    }
    
    isRightSwipe() {
        //console.log(this.elapsedTime, Math.abs(this.endX - this.startX), Math.abs(this.startY - this.endY))
        return this.elapsedTime <= this.allowedTime 
            && this.endX - this.startX >= this.threshold 
            && Math.abs(this.startY - this.endY) <= this.verticalOffset;
    }

    isLeftSwipe() {
        //console.log(this.elapsedTime, Math.abs(this.endX - this.startX), Math.abs(this.startY - this.endY))
        return this.elapsedTime <= this.allowedTime 
            && this.startX - this.endX >= this.threshold 
            && Math.abs(this.startY - this.endY) <= this.verticalOffset;
    }

    onRightSwipe() {
        if(!this.isRightSwipe() || !this.handleRightSwipe)
            return;
        this.handleRightSwipe(Math.abs(this.endX - this.startX));
    }

    onLeftSwipe(){
        if(!this.isLeftSwipe() || !this.handleLeftSwipe)
            return;
        this.handleLeftSwipe(Math.abs(this.endX - this.startX));
    }
}