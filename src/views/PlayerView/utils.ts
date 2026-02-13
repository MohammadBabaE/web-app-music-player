import Controller from "../../controllers/Controller";

function SecondsToTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  let remainingSeconds = `${Math.floor(seconds % 60)}`;
  if (remainingSeconds.length === 1) {
    return `${minutes}:0${remainingSeconds}`;
  }
  return `${minutes}:${remainingSeconds}`;
}

function AudioProgress(
  audioSource: string,
  controller: Controller
): [HTMLAudioElement, HTMLInputElement, HTMLDivElement] {
  const audio = document.createElement("audio") as HTMLAudioElement;
  audio.classList.add("track-audio");
  audio.src = audioSource;
  audio.autoplay = true;
  audio.controls = true;
  audio.loop = controller.isRepeat();

  const progress = document.createElement("input") as HTMLInputElement;
  progress.type = "range";
  progress.value = "0";
  progress.min = 0 as any;
  progress.classList.add("track-progress");

  const timeSpent = document.createElement("span") as HTMLSpanElement;
  timeSpent.innerText = "0:00";
  timeSpent.classList.add("time-spent");

  const timeLeft = document.createElement("span") as HTMLSpanElement;
  timeLeft.classList.add("time-left");

  audio.addEventListener("loadedmetadata", () => {
    progress.max = Math.floor(audio.duration) as any;
    timeLeft.innerText = `-${SecondsToTime(audio.duration)}`;
  });

  audio.addEventListener("timeupdate", () => {
    const time = Math.floor(audio.currentTime);
    const duration = Math.floor(audio.duration);
    const filledPercentage = (time / duration) * 100;
    progress.value = ((filledPercentage / 100) * duration) as any;
    progress.style.background = `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${filledPercentage}%, #474747 ${filledPercentage}%, #474747 100%)`;
    timeSpent.innerText = SecondsToTime(time);
    timeLeft.innerText = `-${SecondsToTime(duration - time)}`;
  });

  audio.addEventListener("ended", () => {
    if (!audio.loop) {
      controller.nextTrack();
    }
  });

  progress.addEventListener("input", (e) => {
    audio.currentTime = Number(e.target?.value);
    timeSpent.innerText = SecondsToTime(Number(e.target?.value));
    timeLeft.innerText = `-${SecondsToTime(
      audio.duration - audio.currentTime
    )}`;
    const filledPercentage = (audio.currentTime / audio.duration) * 100;

    progress.style.background = `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${filledPercentage}%, #474747 ${filledPercentage}%, #474747 100%)`;
  });

  const times = document.createElement("div") as HTMLDivElement;
  times.classList.add("times");
  times.appendChild(timeSpent);
  times.appendChild(timeLeft);

  return [audio, progress, times];
}

function PlayerButtons(audio: HTMLAudioElement, controller: Controller) {
  const shuffle = document.createElement("div") as HTMLDivElement;
  shuffle.classList.add("shuffle-button");
  if (controller.isShuffle()) {
    shuffle.classList.add("is-shuffle");
  }
  shuffle.addEventListener("click", () => {
    controller.changeShuffle();
    if (controller.isShuffle()) {
      shuffle.classList.add("is-shuffle");
      return;
    }
    shuffle.classList.remove("is-shuffle");
  });

  const previous = document.createElement("div") as HTMLDivElement;
  previous.classList.add("previous-button");
  previous.addEventListener("click", () => {
    if (audio.currentTime > 5) {
      audio.currentTime = 0;
      return;
    }
    controller.previousTrack();
  });

  const playOrPause = document.createElement("div") as HTMLDivElement;
  playOrPause.classList.add("play-pause");

  playOrPause.addEventListener("click", () => {
    controller.changePlaying();
    if (!controller.isPlaying()) {
      audio.pause();
      playOrPause.classList.add("is-pause");
      return;
    }
    audio.play();
    playOrPause.classList.remove("is-pause");
    audio;
  });

  const next = document.createElement("div") as HTMLDivElement;
  next.classList.add("next-button");
  next.addEventListener("click", () => {
    controller.nextTrack();
  });

  const playback = document.createElement("div") as HTMLDivElement;
  playback.classList.add("buttons-playback");
  playback.appendChild(previous);
  playback.appendChild(playOrPause);
  playback.appendChild(next);

  const repeat = document.createElement("div") as HTMLDivElement;
  repeat.classList.add("repeat-button");
  if (controller.isRepeat()) {
    repeat.classList.add("is-repeat");
  }
  repeat.addEventListener("click", () => {
    controller.changeRepeat();
    audio.loop = controller.isRepeat();
    if (controller.isRepeat()) {
      repeat.classList.add("is-repeat");
      return;
    }
    repeat.classList.remove("is-repeat");
  });

  const wrapper = document.createElement("div") as HTMLDivElement;
  wrapper.classList.add("buttons");
  wrapper.appendChild(shuffle);
  wrapper.appendChild(playback);
  wrapper.appendChild(repeat);

  return wrapper;
}

function createPlayerElement(
  controller: Controller,
  imageSource: string,
  trackName: string,
  composer: string,
  audioSource: string
) {
  const player = document.createElement("div") as HTMLDivElement;
  player.classList.add("player-container");

  const image = document.createElement("img") as HTMLImageElement;
  image.src = imageSource;
  image.classList.add("track-image");
  player.appendChild(image);

  const name = document.createElement("span") as HTMLSpanElement;
  name.innerText = trackName;
  name.classList.add("track-name");
  player.appendChild(name);

  const artist = document.createElement("span") as HTMLSpanElement;
  artist.innerText = composer;
  artist.classList.add("track-composer");
  player.appendChild(artist);

  const [audio, progress, times] = AudioProgress(audioSource, controller);

  player.appendChild(audio);
  player.appendChild(progress);
  player.appendChild(times);

  const buttons = PlayerButtons(audio, controller);
  player.appendChild(buttons);

  return player;
}

export { createPlayerElement };
