import { Application, IApplicationOptions } from '@pixi/app';
import { DisplayObject } from '@pixi/display';
import { Ticker } from 'pixi.js';

export class SceneManager {
    private constructor() {}

    private static app: Application;
    private static currentScene: IScene;

    private static _width: number;
    private static _height: number;

    public static get width(): number {
        return SceneManager._width;
    }

    public static get height(): number {
        return SceneManager._height;
    }

    public static initialize(
        width: number,
        height: number,
        background: number,
        customOptions?: IApplicationOptions
    ): void {
        SceneManager._width = width;
        SceneManager._height = height;

        SceneManager.app = new Application({
            view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height,
            ...customOptions,
        });

        SceneManager.app.ticker = Ticker.shared;
        SceneManager.app.ticker.add(SceneManager.update);
    }

    public static changeScene(newScene: IScene): void {

        if (SceneManager.currentScene) {
            SceneManager.app.stage.removeChild(SceneManager.currentScene);
            SceneManager.currentScene.destroy();
        }

        SceneManager.currentScene = newScene;
        SceneManager.app.stage.addChild(SceneManager.currentScene);
    }

    private static update(deltaTime: number): void {
        if (SceneManager.currentScene) {
            SceneManager.currentScene.update(deltaTime);
        }
    }
}

export interface IScene extends DisplayObject {
    update(deltaTime: number): void;
}