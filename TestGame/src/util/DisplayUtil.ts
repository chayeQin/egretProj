/**
 * @brief Util
 * @author qyp
 */

class DisplayUtil {
    public static removeFromParent(obj: egret.DisplayObject) : void{
        if (obj && obj.parent) {
            obj.parent.removeChild(obj);
        }
    }

    public static get stageWidth() : number {
        return egret.MainContext.instance.stage.stageWidth;
    }

    public static get stageHeight() : number{
        return egret.MainContext.instance.stage.stageHeight; 
    }

    public static sprite(res:string) : egret.Bitmap {
        let img = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(res);
        img.texture = texture;
        return img;
    }

    public static sprite9(res:string, rect:egret.Rectangle) : egret.Bitmap {
        let img = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(res);
        img.texture = texture;
        img.scale9Grid = rect;
        return img;
    }
}