import tracks from "../data/tracks.json";
import Track from "../types/track";

interface Model {
  currentTrackIdx: number | null;
  shuffle: boolean;
  playing: boolean;
  repeat: boolean;
  playedTracks: number[];
  audioDatabase: IDBDatabase | null;
}

class Model {
  constructor() {
    this.currentTrackIdx = null;
    this.shuffle = false;
    this.playing = true;
    this.repeat = false;
    this.playedTracks = [];
    this.audioDatabase = null;
    this.initializeIndexedDB();
  }

  getData() {
    return tracks;
  }

  getDataSize() {
    return tracks.length;
  }

  getCurrentTrackIdx() {
    return this.currentTrackIdx;
  }

  setCurrentTrackIdx(idx: number) {
    this.currentTrackIdx = idx;
  }

  getCurrentTrack(): Track {
    if (this.currentTrackIdx !== null) {
      return tracks[this.currentTrackIdx];
    }
    throw new Error("no track selected yet!");
  }

  isShuffle() {
    return this.shuffle;
  }
  changeShuffle() {
    this.shuffle = !this.shuffle;
  }

  playedSize() {
    return this.playedTracks.length;
  }

  popLastPlayed() {
    return this.playedTracks.pop();
  }

  pushCurrent() {
    if (this.currentTrackIdx) {
      this.playedTracks.push(this.currentTrackIdx);
    }
  }

  isPlaying() {
    return this.playing;
  }
  setPlaying() {
    this.playing = true;
  }
  changePlaying() {
    this.playing = !this.playing;
  }

  isRepeat() {
    return this.repeat;
  }
  changeRepeat() {
    this.repeat = !this.repeat;
  }

  initializeIndexedDB() {
    const request = window.indexedDB.open("audioDatabase", 1);
    request.onupgradeneeded = (event) => {
      this.audioDatabase = (event.target as IDBRequest).result as IDBDatabase;
    };
    request.onsuccess = (event) => {
      this.audioDatabase = (event.target as IDBRequest).result as IDBDatabase;
    };
  }

  getAudioBlob(Id: number) {
    return new Promise((resolve, reject) => {
      if (this.audioDatabase) {
        const transaction = this.audioDatabase.transaction(
          ["audioStore"],
          "readonly"
        );
        const store = transaction.objectStore("audioStore");
        const getRequest = store.get(Id);
        getRequest.onsuccess = (event) => {
          if ((event.target as IDBRequest)?.result) {
            resolve((event.target as IDBRequest).result.data);
          } else {
            reject(new Error(`Audio data not found for song ID: ${Id}`));
          }
        };
        getRequest.onerror = () => {
          reject(new Error(`Error retrieving audio data for song ID: ${Id}`));
        };
      }
    });
  }

  storeAudioBlob(Id: number, audioBlob: Blob) {
    return new Promise((resolve, reject) => {
      if (this.audioDatabase) {
        const transaction = this.audioDatabase.transaction(
          ["audioStore"],
          "readwrite"
        );
        const store = transaction.objectStore("audioStore");
        const addRequest = store.add({ id: Id, data: audioBlob });
        addRequest.onsuccess = () => {
          resolve("stored successfully");
        };
        addRequest.onerror = () => {
          reject(new Error(`Error storing audio data for song ID: ${Id}`));
        };
      }
    });
  }
}

export default Model;
