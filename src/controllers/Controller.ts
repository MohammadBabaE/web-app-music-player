class Controller {
  constructor(
    public model: any,
    public headerView: any,
    public playerView: any,
    public trackListView: any
  ) {}

  init() {
    this.headerView.render();
    this.playerView.init(this);
    this.trackListView.init(this);
  }

  getTrackList() {
    return this.model.getData();
  }

  getTrackListSize() {
    return this.model.getDataSize();
  }

  getCurrentTrackIdx() {
    return this.model.getCurrentTrackIdx();
  }

  getCurrentTrack() {
    return this.model.getCurrentTrack();
  }

  isShuffle() {
    return this.model.isShuffle();
  }

  changeShuffle() {
    this.model.changeShuffle();
    this.pushCurrent();
  }

  playedSize() {
    return this.model.playedSize();
  }

  popLastPlayed() {
    return this.model.popLastPlayed();
  }

  pushCurrent() {
    this.model.pushCurrent();
  }

  randomTrackIdx() {
    return Math.floor(Math.random() * this.getTrackListSize());
  }

  isPlaying() {
    return this.model.isPlaying();
  }

  changePlaying() {
    this.model.changePlaying();
  }

  isRepeat() {
    return this.model.isRepeat();
  }

  changeRepeat() {
    this.model.changeRepeat();
  }

  setCurrentTrack(idx: number) {
    this.model.setCurrentTrackIdx(idx);
    this.model.setPlaying();
    const data = this.model.getCurrentTrack();
    this.trackListView.updateSelected();
    if (data) {
      const id = data.id;

      this.model
        .getAudioBlob(id)
        .then((audioBlob: Blob) => {
          data.track_url = URL.createObjectURL(audioBlob);
          this.playerView.startPlaying(data);
        })
        .catch((error: Error) => {
          console.error(error);
          this.playerView.startPlaying(data);

          fetch(data.track_url)
            .then((response) => response.blob())
            .then((audioBlob) => {
              this.model.storeAudioBlob(id, audioBlob);
            })
            .catch((error) => {
              console.error(error);
            });
        });
    }
  }

  previousTrack() {
    if (!this.isShuffle()) {
      if (this.getCurrentTrackIdx() > 0) {
        this.setCurrentTrack(this.getCurrentTrackIdx() - 1);
        return;
      }
      this.setCurrentTrack(this.getTrackListSize() - 1);
      return;
    }
    if (!this.playedSize()) {
      return;
    }
    this.setCurrentTrack(this.popLastPlayed());
  }

  nextTrack() {
    if (!this.isShuffle()) {
      if (this.getCurrentTrackIdx() < this.getTrackListSize() - 1) {
        this.setCurrentTrack(this.getCurrentTrackIdx() + 1);
        return;
      }
      this.setCurrentTrack(0);
      return;
    }
    this.pushCurrent();
    this.setCurrentTrack(this.randomTrackIdx());
  }
}

export default Controller;
