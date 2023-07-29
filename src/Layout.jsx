import React, { useState, useEffect } from "react";
export const Layout = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = React.createRef();

  const audioSrc = "./music.mp3";

  useEffect(() => {
    audioRef.current.addEventListener("loadeddata", () => {
      setDuration(audioRef.current.duration);
    });

    audioRef.current.addEventListener("timeupdate", () => {
      setCurrentTime(audioRef.current.currentTime);
    });

    return () => {
      audioRef.current.pause();
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (e) => {
    const newValue = e.target.value;
    setCurrentTime(newValue);
    audioRef.current.currentTime = newValue;
  };

  return (
    <div
      className="music p-12 md:p-56"
      style={{
        background:
          "linear-gradient(to top left, #4f283b, #dbdbdb, #3f5e69, #84141f, #c4c4c4, #ac8484)",
      }}
    >
      <div className=" text-center lg:px-96 py-12">
        <div className="bg-slate-200 flex shadow-lg flex-col py-12 rounded-2xl">
          <div className="p-5">
            <div className="shadow-lg rounded">
              <img src="./taylor.png" alt="" />
            </div>
          </div>
          <span className="text-md font-bold text-black">
            All Too Well (Taylor's Version)
          </span>
          <span>Taylor Swift</span>
          <span></span>
          <span></span>
          <div className="w-64 mx-auto mt-8">
            <audio ref={audioRef} src={audioSrc} />

            <div className="relative w-full h-8 rounded-lg bg-gray-300 overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                className="w-full h-full opacity-0 cursor-pointer"
                onChange={handleSliderChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 mt-5">
            <div className="grid-item mt-2">
              <button className=" rounded-lg p-4 mt-4">
                <img src="./music-player(3).png" alt="" className="w-12" />
              </button>
            </div>
            <div className="grid-item mt-2">
              <button className="rounded p-4" onClick={handlePlayPause}>
                {isPlaying ? (
                  <img src="./pause.png" alt="" className=" w-24" />
                ) : (
                  <img src="./play(2).png" alt="" className="w-28" />
                )}
              </button>
            </div>
            <div className="grid-item mt-2">
              <button className="rounded-lg p-4 mt-4">
                <img src="./music-player(4).png" alt="" className="w-12" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
