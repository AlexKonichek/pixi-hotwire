import { Manager } from './Manager';
import { LoaderScene } from './scenes/LoaderScene';

Manager.initialize(1920, 880, 0x00000);

const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);

