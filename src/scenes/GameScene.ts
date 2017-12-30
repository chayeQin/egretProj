/**
 * @brief GameScene
 * @author qyp
 */

class GameScene extends egret.DisplayObjectContainer {
    private joyStick : JoyStick;
    constructor(){
        super();
        let bg = DisplayUtil.sprite("qjb_bg_jpg")
        this.addChild(bg);
        bg.scaleX = DisplayUtil.stageWidth / bg.width;
        bg.scaleY = DisplayUtil.stageHeight / bg.height;
        this.joyStick = new JoyStick();
        this.joyStick.x = 200;
        this.joyStick.y = 1070;
        this.addChild(this.joyStick);
        let btn  = new Button({normalRes:"btn_jump_a_png", selectedRes:"btn_jump_b_png"}, null, this.onPressedBtn, this)
        this.addChild(btn);
        btn.x = DisplayUtil.stageWidth - 180;
        btn.y = DisplayUtil.stageHeight - 160;
        this.touchEnabled = true

        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill( 0xff0000 );
        shp.graphics.drawRect( 0,0,100,100);
        shp.graphics.endFill();
        shp.width = 100;
        shp.height = 100;
        var isHit:boolean = shp.hitTestPoint( 10, 10 );
        console.log("碰撞结果" + isHit);

        let role = new Role("cat_runAni");
        this.addChild(role);
        role.x = 300;
        role.y = 1000;
    }


    private onPressedBtn() {
        console.log("touch btn");
        EventCenter.instance.dispatchSelfEvent(EventConst.JUMP_BTN);

    }


}