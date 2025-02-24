import { useState, useEffect } from "react";
import { Howl } from "howler";

type AudioOptions = {
  autoplay?: boolean;
  loop?: boolean;
  volume?: number;
};

const useBackgroundAudio = (src: string, options: AudioOptions = {}) => {
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    const audio = new Howl({
      src: [src],
      autoplay: options.autoplay ?? true,
      loop: true,
      volume: options.volume ?? 0.5,
    });

    setSound(audio);

    return () => {
      audio.unload();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    if (true) {
      sound?.play();
    }
  }, [sound]);

  const play = () => {
    sound?.play();
  };

  const pause = () => {
    sound?.pause();
  };

  const stop = () => {
    sound?.stop();
  };

  return { play, pause, stop, sound };
};

export default useBackgroundAudio;
