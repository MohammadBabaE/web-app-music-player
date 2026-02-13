import Controller from "./controllers/Controller";
import Model from "./models/Model";
import HeaderView from "./views/HeaderView";
import PlayerView from "./views/PlayerView/main";
import TrackListView from "./views/TrackListView";

const model = new Model();

const headerView = new HeaderView();
const playerView = new PlayerView();
const trackListView = new TrackListView();

const controller = new Controller(model, headerView, playerView, trackListView);

controller.init();
