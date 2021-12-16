import { Player } from './../Player';
import { Background } from './../Background';

import { Container, Sprite, Loader, TilingSprite } from "pixi.js";
import { IScene, Manager } from "../Manager";
import * as PIXI from 'pixi.js';
export class Scene1 extends Container implements IScene {
    sceneName:String
    private ship;
    background
    constructor() {
        super();
        this.sceneName = "1"
        this.background = new Background(this.sceneName)
        this.ship = new Player("Ship7-1")
        this.initElements();
    }
    public update(deltaTime: number): void {
          this.updateBG()
    }
    initElements(){
        this.initBackground()
        let texture1 = PIXI.Texture.from("Ship7-1");
        let texture2 = PIXI.Texture.from("Ship7-2");
        let arr = [texture1,texture2]
        let animatedSprite = new PIXI.AnimatedSprite(arr);
        animatedSprite.anchor.set(0.5);
        animatedSprite.x = Manager.width / 2;
        animatedSprite.y = Manager.height / 2;
        animatedSprite.scale.set(2)
        animatedSprite.play()
        this.initShip()
    }
    initShip(){
        this.addChild(this.ship.init())
    }
    initBackground(){
         this.addChild(this.background.init())
    }
    createTilling(texture) {
        let tilling = new TilingSprite(texture, 1900,880)
            tilling.position.set(0,0)
            Manager.app.stage.addChild(tilling)
            console.log(tilling)
            return tilling
    }
    updateBG() {
       this.background.update()     
            }
    
    
    
}
