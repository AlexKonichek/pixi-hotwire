import { Container, Sprite } from "pixi.js";
import { IScene, Manager } from "../Manager";

export class Scene2 extends Container implements IScene {
    private ship: Sprite;
    private background: Sprite;
    private BGContainer: Container
    private shipVelocity: number = 7;
    backgroundsWrapper: Container;
    sceneName:String
    constructor() {
        super();
        this.backgroundsWrapper = new Container; 
        this.ship = Sprite.from("ship2");
        this.background = Sprite.from("backgroundLong2");
        this.BGContainer = new Container();
        this.sceneName = "2"
        this.initElements();
    }
    public update(deltaTime: number): void {
        this.moveBackground(deltaTime);
    }
    initElements(){
        this.BGContainer.addChild(this.background);
        this.ship.anchor.set(0.5);
        this.ship.x = Manager.width / 2;
        this.ship.y = Manager.height / 2;
        this.addChild(this.BGContainer);
        this.addChild(this.ship);
        console.log(this.backgroundsWrapper)
    }
    
    moveBackground(delta:number):void {
        this.BGContainer.x = this.BGContainer.x - this.shipVelocity * delta;
        if (this.BGContainer.x < -960) {
            this.BGContainer.x = 0
            
        }
    }
}
