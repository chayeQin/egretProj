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
        let greyFilter = new egret.ColorMatrixFilter(greyMatrix);
        obj.filters = [ greyFilter ];
    }else{
        obj.filters = null;
    }
}

// 置灰
function grey(obj:egret.DisplayObject, boo?:boolean){
    boo = boo == null ? true : boo;
    if (obj instanceof egret.DisplayObjectContainer){
        let childrenCount = obj.numChildren;
        for (let i = 0; i < obj.numChildren; ++i){
            let child = obj.getChildAt(i);
            setGray(child, boo);
        }
    } else {
        setGray(obj, boo);
    }
}

/**
 *  外发光
 * @param obj 显示对象
 * @param color 外发光颜色
 * @param alpha 透明度(0~1)
 */
function glow(obj:egret.DisplayObject, color:number, alpha?:number){
    alpha = alpha ? alpha : 0.8;
    let blurX:number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
    let blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
    let strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
    let quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
    let inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
    let knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
    let glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
    strength, quality, inner, knockout );
    obj.filters = [ glowFilter ];
}

/**
 * 阴影
 * @param color 阴影颜色
 * @param distance 阴影的偏移距离，以像素为单位
 * @param angle 投影角度(0~360)
 * @param alpha 透明度 (0~1)
 */
function shadow(obj:egret.DisplayObject, color:number, distance?:number, angle?:number, alpha?:number){
    angle = angle ? angle : 45;
    alpha = alpha ? alpha : 0.7;
    distance = distance ? distance : 6;
    let blurX:number = 16;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
    let blurY:number = 16;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
    let strength:number = 0.65;                /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
    let quality:number = egret.BitmapFilterQuality.LOW;              /// 应用滤镜的次数，暂无实现
    let inner:boolean = false;            /// 指定发光是否为内侧发光
    let knockout:boolean = false;            /// 指定对象是否具有挖空效果
    let dropShadowFilter:egret.DropShadowFilter =  new egret.DropShadowFilter( distance, angle, color, alpha, blurX, blurY,
        strength, quality, inner, knockout );
    obj.filters = [ dropShadowFilter ];
}


function setAnchorPoint(obj:egret.DisplayObject, x:number, y:number){
    obj.anchorOffsetX = obj.width * x;
    obj.anchorOffsetY = obj.height * y;
}

function moveto(tw, x, y, t){
    console.log("moveto", tw, x, y, t);
}

function createAction(tw:egret.Tween, list:any[]) : egret.Tween {
    
    return 
}
// function run(actions){


// }

// run([
//     "rep",
//         ["seq",
//             ["moveto", 0.5, 100, 100],
//             ["call", func, thisObj],
//             []
//         ]
// ])

