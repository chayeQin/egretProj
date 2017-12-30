/**
 * @brief SceneMgr
 * @author qyp
 */

class SceneMgr {
    constructor(){
        this.currScene = null;
        this.lastScene = null;
    }
    public static readonly instance: SceneMgr = new SceneMgr();
    // 当前场景
    private currScene : egret.DisplayObjectContainer;
    // 上一个场景
    private lastScene : egret.DisplayObjectContainer;

    // 切换场景
    public replaceScene(newSceneClass : any, params ?: any): void{
        let newScene = new newSceneClass(params);
        if (this.currScene != null) {
            DisplayUtil.removeFromParent(this.currScene);
            this.currScene = null;
        }
        this.currScene = newScene;
        egret.MainContext.instance.stage.addChild(this.currScene);
    }

    // 添加obj到当前场景
    public addToScene(obj : egret.DisplayObject, zorder ?: number) : void{
        if (this.currScene != null) {
            this.currScene.addChildAt(obj, zorder);
        } else {
            console.log("ERROR***当前没有场景");
        }
    }
}