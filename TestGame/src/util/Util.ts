/**
 * @brief Util
 * @author qyp
 */

let greyMatrix = [
    0.3,0.6,0,0,0,
    0.3,0.6,0,0,0,
    0.3,0.6,0,0,0,
    0,0,0,1,0
];

function setGray(obj, boo){
    if (boo){
        let colorFlilter = new egret.ColorMatrixFilter(greyMatrix);
        obj.filters = [colorFlilter];
    }else{
        obj.filters = null;
    }
}

function grey(obj:egret.DisplayObject, boo?:boolean){
    boo = boo == null ? true : boo;
    if (obj instanceof egret.DisplayObjectContainer){
        let childrenCount = obj.numChildren;
        for (let i = 0; i < obj.numChildren; ++i){
            let child = obj.getChildAt(i);
            setGray(child, boo);
        }
    }
}

function setAnchorPoint(obj:egret.DisplayObject, x:number, y:number){
    obj.anchorOffsetX = obj.width * x;
    obj.anchorOffsetY = obj.height * y;
}
