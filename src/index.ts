import { Manager } from './Manager';
import { LoaderScene } from './scenes/LoaderScene';

Manager.initialize(1920, 880, 0x6495ed);

const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);

