import { render, Canvas, Config } from '@lightningjs/solid';
import { HashRouter, Route } from "@solidjs/router";
import App from './pages/App';
import NotFound from './pages/NotFound';
import './styles.css';

import coreExtensionModuleUrl from './AppCoreExtensions.js?importChunkUrl';
import coreWorkerUrl from './threadx-core-worker.js?importChunkUrl';
import Splash from './pages/Splash';
import MainMenu from './pages/MainMenu';
import Game from './pages/Game';
import About from './pages/About';

Config.debug = true;
Config.fontSettings.fontFamily = 'pixel';
Config.fontSettings.color = 0xffffffff;

const driver = 'main';
const RenderOptions = {
  coreExtensionModule: coreExtensionModuleUrl,
  threadXCoreWorkerUrl: driver === 'threadx' ? coreWorkerUrl : undefined,
  numImageWorkers: 2,
  // deviceLogicalPixelRatio: 1
}

const splashText = "LOADING...";

render(() =>  (
  <Canvas options={RenderOptions}>
    <HashRouter root={App}>
      <Route path="/" component={() => <Splash text={splashText} />} />
      <Route path="/menu" component={MainMenu} />
      <Route path="/game" component={Game} />
      <Route path="/about" component={About} />
      <Route path="/*all" component={NotFound} />
    </HashRouter>
  </Canvas>
));
