import React, { useState, useEffect } from "react";
import ReactAudioPlayer from 'react-audio-player';

const useAudio = url => {
    console.log(url)
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
        [playing, audio]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};

const Player = ({ url }) => {
    const [playing, toggle] = useAudio(url);

    return (


        <ReactAudioPlayer
  src={url}
  autoPlay
  controls
/>
    );
};

export default Player;