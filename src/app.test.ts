import "@testing-library/jest-dom";
import { screen, fireEvent, waitFor } from "@testing-library/dom";
import Controller from "./controllers/Controller";
import Model from "./models/Model";
import HeaderView from "./views/HeaderView";
import PlayerView from "./views/PlayerView/main";
import TrackListView from "./views/TrackListView";

function initializeApp() {
  const model = new Model();

  const headerView = new HeaderView();
  const playerView = new PlayerView();
  const trackListView = new TrackListView();

  const controller = new Controller(
    model,
    headerView,
    playerView,
    trackListView
  );

  controller.init();
}

describe("initial Render", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>
    <script type="module" src="/src/app.ts"></script>`;
    initializeApp();
  });

  it("should render player with logo at first", () => {
    const logo = document.querySelector(".player-logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render track list", () => {
    const list = document.getElementsByClassName("trackList")[0];
    expect(list).toBeInTheDocument();
    const tracks = document.querySelectorAll(".track");
    expect(tracks.length).toBeGreaterThan(0);
  });
});

describe("changes after the first selection", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>
    <script type="module" src="/src/app.ts"></script>`;
    initializeApp();
    const firstTrack = document.querySelector(".track") as HTMLDivElement;
    fireEvent.click(firstTrack);
  });

  it("should remove logo", async () => {
    waitFor(() => {
      const logo = document.querySelector(".player-logo");
      expect(logo).toBeNull();
    });
  });

  it("should render player after selection and have elements", async () => {
    waitFor(() => {
      const player = document.querySelector(
        ".player-container"
      ) as HTMLDivElement;
      expect(player).toBeInTheDocument();
      const progress = document.querySelector(
        ".track-progress"
      ) as HTMLInputElement;
      expect(player).toContainElement(progress);
    });
  });
  it("should have class selected", async () => {
    waitFor(() => {
      const firstTrack = document.querySelector(".track") as HTMLDivElement;
      expect(firstTrack).toHaveAttribute("class", "track selected");
    });
  });
});

describe("hitting next changes elements", () => {
  let selected: HTMLDivElement;
  let name: string;
  let composer: string;
  beforeEach(async () => {
    document.body.innerHTML = `<div id="app"></div>
    <script type="module" src="/src/app.ts"></script>`;
    initializeApp();
    const firstTrack = document.querySelector(".track") as HTMLDivElement;
    selected = firstTrack;
    fireEvent.click(firstTrack);
    waitFor(() => {
      const nameElement = document.querySelector(
        ".player-container .track-name"
      ) as HTMLDivElement;
      name = nameElement.innerText;
      const composerElement = document.querySelector(
        ".player-container .track-composer"
      ) as HTMLDivElement;
      composer = composerElement.innerText;
      const next = document.querySelector("next-button") as HTMLDivElement;
      fireEvent.click(next);
    });
  });

  it("should change the track selected", async () => {
    waitFor(() => {
      expect(selected).toHaveAttribute("class", "track");
    });
  });

  it("should change track name and composer", async () => {
    waitFor(() => {
      const nameElement = document.querySelector(
        ".player-container .track-name"
      ) as HTMLDivElement;
      const curName = nameElement.innerText;
      const composerElement = document.querySelector(
        ".player-container .track-composer"
      ) as HTMLDivElement;
      const curComposer = composerElement.innerText;
      expect([name, composer]).not.toBe([curName, curComposer]);
    });
  });
});

describe("changing song after pausing should change pause to playing", () => {
  let pause: HTMLDivElement;
  beforeEach(async () => {
    document.body.innerHTML = `<div id="app"></div>
    <script type="module" src="/src/app.ts"></script>`;
    initializeApp();
    const firstTrack = document.querySelector(".track") as HTMLDivElement;
    fireEvent.click(firstTrack);
    waitFor(() => {
      pause = document.querySelector("play-pause") as HTMLDivElement;
      fireEvent.click(pause);
    });
  });

  it("should not have is-pause after hitting next", async () => {
    waitFor(() => {
      const next = document.querySelector("next-button") as HTMLDivElement;
      fireEvent.click(next);
    });
    waitFor(() => {
      expect(pause).toHaveAttribute("class", "play-pause");
    });
  });

  it("should not have is-pause after selecting a song from the list", async () => {
    waitFor(() => {
      const secondTrack = document.querySelector(
        ".track + .track"
      ) as HTMLDivElement;
      fireEvent.click(secondTrack);
    });
    waitFor(() => {
      expect(pause).toHaveAttribute("class", "play-pause");
    });
  });
});

describe("when repeat is on song shouldn't change", () => {
  beforeEach(async () => {
    document.body.innerHTML = `<div id="app"></div>
    <script type="module" src="/src/app.ts"></script>`;
    initializeApp();
    const firstTrack = document.querySelector(".track") as HTMLDivElement;
    fireEvent.click(firstTrack);
    waitFor(() => {
      const repeat = document.querySelector("repeat-button") as HTMLDivElement;
      fireEvent.click(repeat);
    });
  });

  it("should have loop on", async () => {
    waitFor(() => {
      const audio = document.querySelector("track-audio");
      expect(audio).toHaveAttribute("loop");
    });
  });

  it("should play the same song when next is clicked", async () => {
    let audio: HTMLAudioElement, audioSource: string;
    waitFor(() => {
      audio = document.querySelector("track-audio") as HTMLAudioElement;
      audioSource = audio.src;
      const next = document.querySelector("next-button") as HTMLDivElement;
      fireEvent.click(next);
    });
    waitFor(() => {
      audio = document.querySelector("track-audio") as HTMLAudioElement;
      expect(audio.src).toBe(audioSource);
    });
  });
});
