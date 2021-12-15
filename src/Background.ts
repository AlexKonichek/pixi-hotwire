import {TilingSprite, Container } from "pixi.js";
import * as PIXI from 'pixi.js';
export class Background {
    private BgLayers:Container;
    private BgX: number = 0
    private BgSpeed: number = 30
    private sceneNumber:number;
    constructor(sceneNumber) {
        this.sceneNumber = sceneNumber
        this.BgLayers = new Container
    }
    init(){
        for (let index = 0; index < 4; index++) {
            let BgLayer:TilingSprite = this.createTilling( PIXI.Texture.from(`bg${this.sceneNumber}_layer${index+1}`))
            console.log(BgLayer)
            this.BgLayers.addChild(BgLayer)
        }
        return this.BgLayers
    }

    createTilling(texture) {
        let tilling = new TilingSprite(texture, 1900,880)
            tilling.position.set(0,0)
            return tilling
    }

    update() {
        this.BgX = (this.BgX + this.BgSpeed)
        this.BgLayers.children.forEach((element,i) => {
            (element as TilingSprite).tilePosition.x = -(this.BgX/i+1)
        });
}
}