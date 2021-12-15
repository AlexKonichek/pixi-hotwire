
import { Container, Sprite, Loader } from "pixi.js";
import { IScene, Manager } from "../Manager";
import * as PIXI from 'pixi.js';
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
        //this.addChild(this.ship);
        let texture1 = PIXI.Texture.from("Ship7-1");
        let texture2 = PIXI.Texture.from("Ship7-2");
        let arr = [texture1,texture2]
        let animatedSprite = new PIXI.AnimatedSprite(arr);
        console.log(animatedSprite)
        //this.addChild(animatedSprite)
        animatedSprite.anchor.set(0.5);
        animatedSprite.x = Manager.width / 2;
        animatedSprite.y = Manager.height / 2;
        animatedSprite.scale.set(2)
        animatedSprite.play()
        
    }
    
    
}
