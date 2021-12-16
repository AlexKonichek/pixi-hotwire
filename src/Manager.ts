
import { Application} from "@pixi/app";
import { DisplayObject } from "@pixi/display";
import * as PIXI from 'pixi.js';
import { Container, Loader, Sprite, TilingSprite } from "pixi.js";

export class Manager {
    private constructor() {  }
    public static app: Application;
    public static currentScene: IScene;
    private static _width: number;
    private static _height: number;

    public static get width(): number {
        return Manager._width;
    }
    public static get height(): number {
        return Manager._height;
    }

    public static initialize(width: number, height: number, background: number): void {

        Manager._width = width;
        Manager._height = height;
        Manager.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });
        (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ &&  (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

        Manager.app.ticker.add(Manager.update)
        window.addEventListener("resize", Manager.resize);
        Manager.resize();
    }
    public static resize(): void {
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);
        const enlargedWidth = Math.floor(scale * Manager.width);
        const enlargedHeight = Math.floor(scale * Manager.height);
        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;
        Manager.app.view.style.width = `${enlargedWidth}px`;
        Manager.app.view.style.height = `${enlargedHeight}px`;
        Manager.app.view.style.marginLeft = Manager.app.view.style.marginRight = `${horizontalMargin}px`;
        Manager.app.view.style.marginTop = Manager.app.view.style.marginBottom = `${verticalMargin}px`;
    }

    public static changeScene(newScene: IScene): void {
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        Manager.currentScene = newScene;
        Manager.app.stage.addChild(Manager.currentScene);
        console.warn("changeScene: currentScene is", newScene )
    }

    private static update(framesPassed): void {
        if (Manager.currentScene) {
            Manager.currentScene.update(framesPassed);
        }
    }
}

export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
    sceneName:String;
}
