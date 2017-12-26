/**
 * @brief Button
 * @author qyp
 */


class Button extends egret.DisplayObjectContainer {
    public static TOUCH_STATE_NORMAL = 1;
    public static TOUCH_STATE_PRESSED = 2;
    public static TOUCH_STATE_DISABLED = 3;
    private _normalImg : egret.Bitmap;
    private _selectedImg : egret.Bitmap;
    private _disableImg : egret.Bitmap;
    private _label : egret.TextField;
    private _scale9Enabled : boolean;
    private _zoomScale : number;
    private _enabled : boolean;
    private _scale9Grid : egret.Rectangle;
    private _dirty : boolean;
    private _touchState : number;

    constructor(resCfg?:{normalRes?:string, selectedRes?:string, disabledRes?:string}, 
                labCfg?:{text?:string, fontSize?:number, color?:number, font?:string}){
        super();
        resCfg = resCfg ? resCfg : {};
        labCfg = labCfg ? labCfg : {};
        this.zoomScale = 0.1;
        this.scale9Grid = new egret.Rectangle();
        this.scale9Enabled = false;
        this.enabled = true;
        this.dirty = true;
        this.touchEnabled = this.enabled;
        this._normalImg = new egret.Bitmap();
        this.addChild(this._normalImg);
        this._selectedImg = new egret.Bitmap();
        this.addChild(this._selectedImg);
        this._disableImg = new egret.Bitmap();
        this.addChild(this._disableImg);
        this.loadTexture(resCfg.normalRes, resCfg.selectedRes, resCfg.disabledRes);

        this._label = new egret.TextField;
        this.addChild(this._label);
        this.titleText = labCfg.text ? labCfg.text : "";
        this.textColor = labCfg.color ? labCfg.color : 0x000000;
        this.fontSize = labCfg.fontSize ? labCfg.fontSize : 30;
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onEnter, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
    }

    private onEnter(evt:egret.Event) {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    private onExit(evt:egret.Event) {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    public destroy(){
        this.removeChild(this._normalImg);
        this._normalImg = null;
        this.removeChild(this._selectedImg);
        this._selectedImg = null;
        this.removeChild(this._disableImg);
        this._disableImg = null;
        this.removeChild(this._label);
        this._label = null
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onEnter, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
    }

    public onTouchBegin(evt : egret.Event){
        if (this._touchState == Button.TOUCH_STATE_DISABLED) { 
            return
        }

        this._touchState = Button.TOUCH_STATE_PRESSED;
        this.dirty = true;
    }

    public onTouchEnd(evt : egret.Event){
        if (this._touchState == Button.TOUCH_STATE_DISABLED) { 
            return
        }

        this._touchState = Button.TOUCH_STATE_NORMAL;
        this.dirty = true;
    }

    public onTouchCancel(evt : egret.Event){
        if (this._touchState == Button.TOUCH_STATE_DISABLED) { 
            return
        }
        this._touchState = Button.TOUCH_STATE_NORMAL;
        this.dirty = true;
    }

    public loadTexture(normalRes?:string, selectedRes?:string, disabledRes?:string){
        this.loadTextureNormal(normalRes);
        this.loadTextureSelected(selectedRes);
        this.loadTextureDisabled(disabledRes);
    }

    public loadTextureNormal(res:string){
        if (res){
            let texture: egret.Texture = RES.getRes(res);
            this._normalImg.texture = texture;
            this._normalImg.anchorOffsetX = this._normalImg.width/2;
            this._normalImg.anchorOffsetY = this._normalImg.height/2;
        } else if (this._normalImg){
            this._normalImg.texture = null;
        }
       
        this.dirty = true;
    }

    public loadTextureSelected(res:string){
        if (res){
            let texture: egret.Texture = RES.getRes(res);
            this._selectedImg.texture = texture;
            this._selectedImg.anchorOffsetX = this._selectedImg.width/2;
            this._selectedImg.anchorOffsetY = this._selectedImg.height/2;

        } else if (this._selectedImg){
           this._selectedImg.texture = null;
        }
        this.dirty = true;
    }

    public loadTextureDisabled(res:string){
        if (res){
            let texture: egret.Texture = RES.getRes(res);
            this._disableImg.texture = texture;
            this._disableImg.anchorOffsetX = this._disableImg.width/2;
            this._disableImg.anchorOffsetY = this._disableImg.height/2;
        } else if (this._disableImg){
            this._disableImg.texture = null;
        }

        this.dirty = true;
    }

    public set titleText(str:string){
        this._label.text = str;
      
    }
    public get titleText(){
        return this._label.text;
    }

    public set textColor(color:number){
        this._label.textColor = color;
    }
    public get textColor(){
        return this._label.textColor;
    }

    public set fontSize(size:number){
        this._label.size = size;
    }
    public get fontSize(){
        return this._label.size;
    }

    public set scale9Enabled(boo : boolean) {
        this._scale9Enabled = boo;
        this.dirty = true;
    }
    public get scale9Enabled() : boolean {
        return this._scale9Enabled;
    }

    public set enabled(boo:boolean) {
        this._enabled = boo;
        this.touchEnabled = boo;
        if (boo) {
            this._touchState = Button.TOUCH_STATE_NORMAL;
        }else {
            this._touchState = Button.TOUCH_STATE_DISABLED;
        }
        this.dirty = true
    }
    public get enabled() : boolean{
        return this._enabled;
    }

    public set scale9Grid(rect:egret.Rectangle) {
        this._scale9Grid = rect;
        this.dirty = true;
    }
    
    public set zoomScale(zoomScale:number) {
        this._zoomScale = zoomScale;
    }
    public get zoomScale() : number {
        return this._zoomScale;
    }

    private set dirty(boo: boolean) {
        this._dirty = boo;
    }
    private get dirty() : boolean {
        return this._dirty;
    }

    public onEnterFrame(evt : egret.Event){
        if (this.dirty){
            this.dirty = false;
             this._label.anchorOffsetX = this._label.width/2;
             this._label.anchorOffsetY = this._label.height/2;

            if (this.scale9Enabled) {
                this._normalImg.scale9Grid = this.scale9Grid;
                this._selectedImg.scale9Grid = this.scale9Grid;
                this._disableImg.scale9Grid = this.scale9Grid;
            }else {
                this._normalImg.scale9Grid = null;
                this._selectedImg.scale9Grid = null;
                this._disableImg.scale9Grid = null;
            }

            switch(this._touchState) {
                case Button.TOUCH_STATE_NORMAL: // 普通状态
                    this._normalImg.visible = true;
                    this._selectedImg.visible = false;
                    this._disableImg.visible = false;
                    this._normalImg.scaleX = 1.0;
                    this._normalImg.scaleY = 1.0;
                    this._label.scaleX = 1.0;
                    this._label.scaleY = 1.0;
                    // TODO: 灰度图实现， 让normalImg变原色
                    break;
                case Button.TOUCH_STATE_PRESSED: // 按下的状态
                    if (this._selectedImg.texture){
                        this._normalImg.visible = false;
                        this._selectedImg.visible = true;
                        this._disableImg.visible = false;
                    }else{
                        this._normalImg.scaleX = 1.0 + this._zoomScale;
                        this._normalImg.scaleY = 1.0 + this._zoomScale;
                        this._label.scaleX = 1.0 + this._zoomScale;
                        this._label.scaleY = 1.0 + this._zoomScale;
                    }
                    break;
                case Button.TOUCH_STATE_DISABLED: // 禁用状态
                    if (this._disableImg.texture){
                        this._normalImg.visible = false
                        this._selectedImg.visible = false;
                        this._disableImg.visible = true;
                    }else{
                         // TODO: 灰度图实现， 让normalImg变灰
                    }
                    break;
            }
        }
    }

   
}
