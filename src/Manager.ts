
import { Application} from "@pixi/app";
import { DisplayObject } from "@pixi/display";
import * as PIXI from 'pixi.js';
import { Container, Sprite } from "pixi.js";

export class Manager {
    private constructor() { /*this class is purely static. No constructor to see here*/ }

    // Safely store variables for our game
    private static app: Application;
    public static currentScene: IScene;
    public static BGLayerCount: Number = 4;


    // Width and Height are read-only after creation (for now)
    private static _width: number;
    private static _height: number;


    // With getters but not setters, these variables become read-only
    public static get width(): number {
        return Manager._width;
    }
    public static get height(): number {
        return Manager._height;
    }

    // Use this function ONCE to start the entire machinery
    public static initialize(width: number, height: number, background: number): void {

        // store our width and height
        Manager._width = width;
        Manager._height = height;

        // Create our pixi app
        Manager.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });
        (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ &&  (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

        // Add the ticker
        Manager.app.ticker.add(Manager.update)
        window.addEventListener("resize", Manager.resize);
        Manager.resize();
    }
    public static resize(): void {
        // current screen size
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        // uniform scale for our game
        const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);

        // the "uniformly englarged" size for our game
        const enlargedWidth = Math.floor(scale * Manager.width);
        const enlargedHeight = Math.floor(scale * Manager.height);

        // margins for centering our game
        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        // now we use css trickery to set the sizes and margins
        Manager.app.view.style.width = `${enlargedWidth}px`;
        Manager.app.view.style.height = `${enlargedHeight}px`;
        Manager.app.view.style.marginLeft = Manager.app.view.style.marginRight = `${horizontalMargin}px`;
        Manager.app.view.style.marginTop = Manager.app.view.style.marginBottom = `${verticalMargin}px`;
    }

    // Call this function when you want to go to a new scene
    public static changeScene(newScene: IScene): void {
        // Remove and destroy old scene... if we had one..
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        // Add the new one
        Manager.currentScene = newScene;
        Manager.app.stage.addChild(Manager.currentScene);
        console.warn("changeScene: currentScene is", newScene )

        Manager.initSceneBackground(newScene.sceneName)
        console.warn(newScene.backgroundsWrapper)

    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    private static update(framesPassed): void {
        // Let the current scene know that we updated it...
        // Just for funzies, sanity check that it exists first.
        if (Manager.currentScene) {
            Manager.currentScene.update(framesPassed);
        }

        // as I said before, I HATE the "frame passed" approach. I would rather use `Manager.app.ticker.deltaMS`
    }
    public static initSceneBackground(sceneName) {
        console.log(sceneName)
        if (sceneName !=="loader") {
            for (let index = 0; index < Manager.BGLayerCount; index++) {
                let layerContainer = new Container
                let layer =  Sprite.from(`bg${sceneName}_layer${index+1}`)
                //layer.zIndex = 4 - index
                layerContainer.addChild(layer)
                Manager.currentScene.backgroundsWrapper.addChild(layerContainer)
            
        }
        }
            
        
          
    }
    
    public static startBGRunning(delta, bgContainer){
        console.log( "startBGRunning");
       // Manager.app.stage.addChild(bgContainer);
        bgContainer.children.forEach((item: any, i) => {
        Manager.calculateMoving(item, delta, i)
        //console.log(item, delta);
       })
    }
    private static calculateMoving(bg:Container, delta, i) {
        //debugger;
        bg.x = bg.x - 4*i * delta;
        if( bg.x < -1920) bg.x = 0

    }
}



// This could have a lot more generic functions that you force all your scenes to have. Update is just an example.
// Also, this could be in its own file...
export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
    sceneName:String;
    backgroundsWrapper:Container
}