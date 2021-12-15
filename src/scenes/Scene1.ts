
import { Container, Sprite, Loader } from "pixi.js";
import { IScene, Manager } from "../Manager";

export class Scene1 extends Container implements IScene {
    sceneName:String
    private ship: Sprite;
    backgroundsWrapper: Container
    //private shipVelocity: number = 7;
    //private countScreens:number = 0
    constructor() {
        super();
        console.log("scene1 constructor")
        this.backgroundsWrapper = new Container; 
        this.ship = Sprite.from("ship1");
        this.ship.scale.set(2)
        this.sceneName = "1"
        this.initElements();
    }
    public update(deltaTime: number): void {
        if( Manager.currentScene.backgroundsWrapper.children.length === Manager.BGLayerCount 
            && Manager.currentScene.sceneName !=="loader") {
              Manager.startBGRunning(deltaTime, this.backgroundsWrapper)
          }
       
    }
    initElements(){
        this.ship.anchor.set(0.5);
        this.ship.x = Manager.width / 2;
        this.ship.y = Manager.height / 2;
        this.addChild(this.backgroundsWrapper);
        this.addChild(this.ship);
        let sheet = Loader.shared.resources["playerShip"].spritesheet;
        console.log(sheet)
    }
    
    
}
