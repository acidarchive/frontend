'use client';
/* eslint-disable import/named */
import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

const onPlayerReady: YouTubeProps['onReady'] = event => {
  // access to player in all event handlers via event.target
  event.target.pauseVideo();
};

export function YoutubePlayer() {
  const options: YouTubeProps['opts'] = {
    height: '250',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
    },
  };

  return (
    <YouTube videoId="6DnfjMbu-Pg" opts={options} onReady={onPlayerReady} />
  );
}
