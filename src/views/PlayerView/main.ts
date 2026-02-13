import Controller from "../../controllers/Controller";
import Track from "../../types/track";
import { createPlayerElement } from "./utils";

class PlayerView {
  controller: Controller | null;
  constructor() {
    this.controller = null;
  }

  init(controller: Controller) {
    this.controller = controller;
    const player = document.createElement("div") as HTMLDivElement;
    player.classList.add("player");
    const playerLogo = document.createElement("img") as HTMLImageElement;
    playerLogo.src = "../../assests/icons/baletify-player.svg";
    playerLogo.classList.add("player-logo");
    player.appendChild(playerLogo);

    const app = document.querySelector("#app");
    app?.appendChild(player);
  }

  startPlaying(track: Track) {
    const logo = document.querySelector(".player-logo");
    const player = document.querySelector(".player");
    if (logo) {
      player?.removeChild(logo);
    }

    const { track_name, track_url, track_thumb, composer } =
      track;

    const currentPlaying = document.querySelector(
      ".player-container"
    ) as HTMLAudioElement;
    if (currentPlaying) {
      player?.removeChild(currentPlaying);
    }
    if (this.controller) {
      const container = createPlayerElement(
        this.controller,
        track_thumb,
        track_name,
        composer,
        track_url
      );
      player?.appendChild(container);
    }
  }
}

export default PlayerView;
