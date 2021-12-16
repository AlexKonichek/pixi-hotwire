import { Manager } from './Manager';
import { Sprite } from 'pixi.js';

export class Player  {
private score: number
private level:number
private player:Sprite  
 constructor(texture) {
     this.score = 0;
     this.level = 1
     this.player = Sprite.from(texture);
     this.player.scale.set(2)
     this.init()
 }
 init() { 
    this.player.anchor.set(0.5);
    this.player.x = Manager.width / 2;
    this.player.y = Manager.height / 2;
    return this.player
 }
 moveForward(){}
 moveBack(){}
 moveUp(){}
 moveDown() {}
 fire(){}
 changeState(){}
}