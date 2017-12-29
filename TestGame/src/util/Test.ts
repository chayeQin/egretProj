// TypeScript file

class Test {
    private target;
    constructor(target){
        this.target = target;
    }
    public get x(){
        return this.target.x + 100;
    }

     public get y(){
        return 300;
    }
}