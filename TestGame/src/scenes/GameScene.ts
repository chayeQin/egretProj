/**
 * @brief GameScene
 * @author qyp
 */

class GameScene extends BaseScene {
    private textfield : egret.TextField;
    private img : egret.Bitmap;
    private boo : boolean;
    private btn : Button;
    private action : egret.Tween;
    private action2 : egret.Tween;
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
        // let rect:egret.Rectangle = new egret.Rectangle(13, 13, 14, 15);
        let img = DisplayUtil.sprite("a_btn_01_png");
        img.x = 500;
        img.y = 100;
        this.addChild(img);
        this.btn = new Button({normalRes:"a_btn_01_png"}, {text:"hello",color:0xC71585}, this.onBtnClick, this);
        this.addChild(this.btn);
        this.btn.x = 200;
        this.btn.y = 200;
        // this.touchEnabled = true;
        // this.tmp = true
        // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchTab, this);

        let action:egret.Tween = egret.Tween.get(img);
        action.to({x:300}, 10 * 300).to({y:500}, 10 * 300);
        this.img = img;
        this.action = action;


        let action2:egret.Tween = egret.Tween.get(img);
        action2.to({y:200}, 10 * 500);
        this.action2 = action2;

        __global["moveto"].apply(null, [null, 10, 10, 10])

        
        // var text:egret.TextField = new egret.TextField();
        // // textIput.type = egret.TextFieldType.INPUT;
        // text.text = "hello"
        // shadow(text, 0x33CCFF, 30);
        
        // this.addChild(text);
        // var button:egret.Shape =  new egret.Shape();
        // button.graphics.beginFill(0x00cc00);
        // button.graphics.drawRect(0,0,100,40);
        // button.graphics.endFill();
        // button.y = 50;
        // this.addChild(button);
        // button.touchEnabled = true;
        // button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e) => {
        //         textIput.setFocus();
        //     }, this);
        // let img = DisplayUtil.sprite("a_btn_01_png")
        // this.addChild(img);
        // img.x = 400;
        // img.y = 400;
        // glow(img, 0x33CCFF);

        // let img2 = DisplayUtil.sprite("a_btn_01_png")
        // this.addChild(img2);
        // img2.x = 700;
        // img2.y = 400;
        // grey(img2)


    }
    private onAddToStage(event:egret.Event){
    }

    private onBtnClick(evt:egret.Event){
        console.log("on btn click");

        

    }
    private tmp : boolean;
    private onTouchTab(evt:egret.TouchEvent) {
        console.log("*******onTouchTab**")
        this.btn.enabled = !this.btn.enabled;
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