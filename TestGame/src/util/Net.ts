/**
 * @brief Net
 * @author qyp
 */

class Net {
    private socket : egret.WebSocket;
    constructor(){
        this.socket = new egret.WebSocket();
        this.socket.addEventListener(egret.ProgressEvent.CONNECT, this.onConnect, this);
        this.socket.addEventListener(egret.ProgressEvent.CLOSE, this.onClose, this);
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceive, this);
    }

    public connect(host:string, port:number) {
        this.socket.connect(host, port);
    }

    private onClose(evt:egret.Event){
        console.log("***Net***连接断开");
    }

    private onConnect(evt:egret.Event){
        console.log("***Net***连接服务器成功");
    }

    private onReceive(evt:egret.Event){

    }
}
