/**
 * @brief GameScene
 * @author qyp
 */

class GameScene extends BaseScene {
    private textfield : egret.TextField;
    private img : egret.Bitmap;
    private boo : boolean;
    private btn : Button;
    constructor(){
        super();
        // let sky = this.createBitmapByName("bg_jpg");
        // this.addChild(sky);
        // let stageW = DisplayUtil.stageWidth;
        // let stageH = DisplayUtil.stageHeight;
        // sky.width = stageW;
        // sky.height = stageH;

        // let topMask = new egret.Shape();
        // topMask.graphics.beginFill(0x000000, 0.5);
        // topMask.graphics.drawRect(0, 0, stageW, 172);
        // topMask.graphics.endFill();
        // topMask.y = 33;
        // this.addChild(topMask);

        // let icon = this.createBitmapByName("egret_icon_png");
        // this.addChild(icon);
        // icon.x = 26;
        // icon.y = 33;

        // let line = new egret.Shape();
        // line.graphics.lineStyle(2, 0xffffff);
        // line.graphics.moveTo(0, 0);
        // line.graphics.lineTo(0, 117);
        // line.graphics.endFill();
        // line.x = 172;
        // line.y = 61;
        // this.addChild(line);


        // let colorLabel = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        // colorLabel.width = stageW - 172;
        // colorLabel.textAlign = "center";
        // colorLabel.text = "Hello Egret";
        // colorLabel.size = 24;
        // colorLabel.x = 172;
        // colorLabel.y = 80;
        // this.addChild(colorLabel);

        // let textfield = new egret.TextField();
        // this.addChild(textfield);
        // textfield.alpha = 0;
        // textfield.width = stageW - 172;
        // textfield.textAlign = egret.HorizontalAlign.CENTER;
        // textfield.size = 24;
        // textfield.textColor = 0xffffff;
        // textfield.x = 172;
        // textfield.y = 135;
        // this.textfield = textfield;


        // console.log("stageWidth ,stageHeight", stageW, stageH);

        // let btn = new Button({selectedRes:"res"});
        // console.log(btn)
        let rect:egret.Rectangle = new egret.Rectangle(13, 13, 14, 15);
        let img = DisplayUtil.sprite("9sp_09_png");
        img.x = 500;
        img.y = 100;
   
        this.img = img
        this.addChild(img);
        this.btn = new Button({normalRes:"a_btn_01_png"}, {text:"hello"});
        // let img = DisplayUtil.sprite("9sp_09_png");
        // img.x = 500;
        // img.y = 500;
        this.touchEnabled = true;
        this.tmp = true
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);

    }
    private onAddToStage(event:egret.Event){
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchTab, this);

    }

    private tmp : boolean;
    private onTouchTab(evt:egret.TouchEvent) {
        console.log("tab**************")
        if (this.tmp){
            console.log("******fale")
            this.addChild(this.btn);
            this.btn.x = 200;
            this.btn.y = 200;
            this.tmp = false;
        }
        if (this.boo) {
            this.boo = false
            let rect:egret.Rectangle = new egret.Rectangle(13, 13, 14, 15);
            this.img.scale9Grid = rect;
            // this.img.width = 300;
            // this.img.height = 300;
        
        }else{
            this.img.scale9Grid = null;
            this.boo = true;
        }
       
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


}