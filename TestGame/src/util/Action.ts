/**
 * @brief Util
 * @author qyp
 */

namespace Action {
    export function moveto(target:egret.DisplayObject, t, x, y) : egret.Tween {
        let tw:egret.Tween = egret.Tween.get(target);
        return tw.to({x:x, y:y}, t*1000);
    }

    export function moveby(target:egret.DisplayObject, t, x, y) : egret.Tween {
        let tw:egret.Tween = egret.Tween.get(target);
        return tw.to({x:target.x + x, y:target.y+y}, t*1000);
    }

    export function rotateto(target:egret.DisplayObject, t, angle) : egret.Tween {
         let tw:egret.Tween = egret.Tween.get(target);
        return tw.to({rotation:angle}, t*1000);
    }

    export function rotateby(target:egret.DisplayObject, t, angle) : egret.Tween {
         let tw:egret.Tween = egret.Tween.get(target);
         return tw.to({rotation:target.rotation + angle}, t*1000);
    }

    export function scaleto(target:egret.DisplayObject, t, x, y) : egret.Tween {
        let tw:egret.Tween = egret.Tween.get(target);
        return tw.to({scaleX:x, scaleY:y}, t*1000);
    }

    export function seq(target:egret.DisplayObject, actLst:any[]) : egret.Tween {
        if (actLst.length == 0){
            return
        }
        let tw:egret.Tween = egret.Tween.get(target);
        let actParams = actLst[0];
        actLst.shift();
        tw = createAction(target, actParams);
        tw.call(()=>{
            Action.seq(target, actLst);
        })
        return tw;
    }

    export function spa(target:egret.DisplayObject, actLst:any[]) : egret.Tween {
        let tw:egret.Tween = egret.Tween.get(target);
        actLst.forEach((ele)=>{
            tw = createAction(target, ele);
        })
        return tw;
    }

    export function call(target:egret.DisplayObject, func:Function) : egret.Tween {
        let tw:egret.Tween = egret.Tween.get(target);
        tw.call(func);
        return tw;
    }

}

