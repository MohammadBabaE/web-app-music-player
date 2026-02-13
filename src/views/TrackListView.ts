import Controller from "../controllers/Controller";

class TrackListView {
  controller: Controller | null;
  constructor() {
    this.controller = null;
  }

  
  init(controller: Controller) {
    this.controller = controller;
    const trackList = document.createElement("div") as HTMLDivElement;
    trackList.classList.add("trackList");
    const tracks = controller.getTrackList();
    
    for (let i = 0; i < tracks.length; i++) {
      const { track_name, track_time, track_thumb, composer } = tracks[i];
      
      const idx = i;
      
      const wrapper = document.createElement("div") as HTMLDivElement;
      wrapper.classList.add("track");
      const trackInfo = document.createElement("div") as HTMLDivElement;
      trackInfo.classList.add("track-info");
      const names = document.createElement("div") as HTMLDivElement;
      names.classList.add("names");
      
      const trackThumb = document.createElement("img") as HTMLImageElement;
      trackThumb.src = track_thumb;
      trackThumb.classList.add("track-thumb");
      trackInfo.appendChild(trackThumb);
      
      const trackName = document.createElement("div") as HTMLDivElement;
      trackName.classList.add("track-name");
      trackName.innerText = track_name;
      names.appendChild(trackName);
      
      const trackSinger = document.createElement("div") as HTMLDivElement;
      trackSinger.classList.add("track-singer");
      trackSinger.innerText = composer;
      names.appendChild(trackSinger);
      
      trackInfo.appendChild(names);
      wrapper.appendChild(trackInfo);
      
      const trackTime = document.createElement("div") as HTMLDivElement;
      trackTime.classList.add("track-time");
      trackTime.innerText = track_time;
      wrapper.appendChild(trackTime);
      
      wrapper.addEventListener("click", (e) => {
        controller.setCurrentTrack(idx);
      });
      
      trackList.appendChild(wrapper);
    }
    const app = document.querySelector("#app");
    app?.appendChild(trackList);
  }

  updateSelected() {
    const tracks = document.querySelector(".trackList")
      ?.children as HTMLCollection;
    const selected = document.querySelector(".selected") as HTMLDivElement;
    if (this.controller) {
      const tobeSelect = tracks.item(this.controller.getCurrentTrackIdx());
      selected?.classList.remove("selected");
      tobeSelect?.classList.add("selected");
    }
  }
}

export default TrackListView;
