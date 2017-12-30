/**
 * @brief Role
 * @author qyp
 */

enum ROLE_JUMP_STATE {
    NORMAL,
    UP,
    DOWN,
}

class Role extends egret.DisplayObjectContainer {
    private static DEFAULT_SPEED:number = 200; // 每秒跑多少像素
    private static DEFAULT_VSPEED:number = 400; // 每秒跳多高
    private static DEFAULT_JUMP_TIME:number = 1; // 多少秒跳到最高点

    
    private _lastFrameTime:number;
    private _speed:number;
    private _jumpState:ROLE_JUMP_STATE;
    private _jumpStartTime:number;

    get jumpState() : ROLE_JUMP_STATE {
        return this._jumpState;
    }
    set jumpState(state:ROLE_JUMP_STATE)   {
        this._jumpState = state;
    }

    constructor(res) {
        super();
        let data = RES.getRes(res + "_json");
        let txtr = RES.getRes(res + "_png");
        let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        let mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData("role")); 
        setAnchorPoint(mc1, 0.5, 0.5);
        this.addChild(mc1);
        this._speed = 0;
        this.jumpState = ROLE_JUMP_STATE.NORMAL;
        mc1.gotoAndPlay("run", -1);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onEnter, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
    }

     public destroy(){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onEnter, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
    }

    private onEnter(evt:egret.Event) {
        EventCenter.instance.addEventListener(EventConst.JOY_STICK,  this.onJoyStick, this);
        EventCenter.instance.addEventListener(EventConst.JUMP_BTN, this.onJump, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    private onExit(evt:egret.Event) {
        EventCenter.instance.removeEventListener(EventConst.JUMP_BTN, this.onJump, this);
        EventCenter.instance.removeEventListener(EventConst.JOY_STICK,  this.onJoyStick, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    private onJoyStick(evt:egret.Event) {
        if (evt.data == JOY_STICK_DIRECTION.LEFT) {
            this._speed = -Role.DEFAULT_SPEED;
        } else if (evt.data == JOY_STICK_DIRECTION.RIGHT) {
            this._speed = Role.DEFAULT_SPEED;
        } else {
            this._speed = 0
        }
    }

    private onEnterFrame(evt:egret.Event) {
        let now = egret.getTimer();
        if (this._lastFrameTime) {
            let deltaT = (now - this._lastFrameTime)/1000;
            if (this._speed != 0){
                if (this._lastFrameTime) {
                    this.x = this.x + this._speed * deltaT;
                }
            }

            if (this.jumpState == ROLE_JUMP_STATE.UP) { // 检测跳到最高点没有
                this.y = this.y - Role.DEFAULT_VSPEED*deltaT;
                if (now - this._jumpStartTime >= Role.DEFAULT_JUMP_TIME*1000){
                    this.jumpState = ROLE_JUMP_STATE.DOWN;
                }
            } else if (this.jumpState == ROLE_JUMP_STATE.DOWN) { // 检测落到地没有
                this.y = this.y + Role.DEFAULT_VSPEED*deltaT;
                if (this.y >= 1000){
                    this.jumpState = ROLE_JUMP_STATE.NORMAL;
                }
            }
        }
        this._lastFrameTime = now;
    }

    private onJump() {
        if (this.jumpState == ROLE_JUMP_STATE.NORMAL) {
            this.jumpState = ROLE_JUMP_STATE.UP;
            this._jumpStartTime = egret.getTimer();
        }
        
    }
}
