import React, { useState, useEffect } from 'react';
import "../../css/carousel.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Video {
  position: string;
  active: boolean;
  channelImage: string;
  channelName: string;
  channelTitle: string;
  channelViews: string;
  thumbnail: string;
  embed: string;
  isVideoThumbnail?: boolean; // Add this to the Video interface
}

const LiveIcon = (
    <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="red"><path d="m4.35281 4.33358c.18655-.18591.48687-.17582.6731.01042.20392.20391.19115.53686-.0113.74224-1.24579 1.26381-2.01461 2.99904-2.01461 4.91386 0 1.9901.83047 3.7862 2.16377 5.0607.21261.2033.23106.5445.02308.7524-.18207.1821-.47429.1961-.66198.0198-1.55414-1.4593-2.52487-3.5328-2.52487-5.8329 0-2.21406.89942-4.21804 2.35281-5.66652z"/><path d="m14.9854 5.08624c-.2025-.20538-.2152-.53833-.0113-.74224.1862-.18624.4865-.19633.6731-.01042 1.4534 1.44848 2.3528 3.45246 2.3528 5.66652 0 2.3001-.9707 4.3736-2.5249 5.8329-.1877.1763-.4799.1623-.6619-.0198-.208-.2079-.1896-.5491.023-.7524 1.3333-1.2745 2.1638-3.0706 2.1638-5.0607 0-1.91482-.7688-3.65005-2.0146-4.91386z"/><path d="m6.13159 6.0903c.18248-.18057.47449-.16627.65602.01526.20812.20812.18776.54954-.01721.76075-.78631.81024-1.2704 1.91541-1.2704 3.13364 0 1.29055.54324 2.45415 1.41351 3.27475.22036.2077.25005.5617.03589.7758-.17521.1753-.45503.1948-.63876.0286-1.11203-1.0064-1.81064-2.4612-1.81064-4.07915 0-1.52927.62414-2.91276 1.63159-3.90965z"/><path d="m13.2296 6.86631c-.205-.21121-.2253-.55263-.0172-.76075.1815-.18153.4735-.19583.656-.01526 1.0075.99688 1.6316 2.38038 1.6316 3.90965 0 1.61795-.6986 3.07275-1.8106 4.07915-.1838.1662-.4636.1467-.6388-.0286-.2142-.2141-.1845-.5681.0359-.7758.8703-.8206 1.4135-1.9842 1.4135-3.27475 0-1.21823-.4841-2.3234-1.2704-3.13364z"/><path d="m10 8.75c-.69036 0-1.25.55964-1.25 1.25 0 .6904.55964 1.25 1.25 1.25.6904 0 1.25-.5596 1.25-1.25 0-.69036-.5596-1.25-1.25-1.25z"/></g></svg>
)

const VideoCarousel: React.FC<any> = ({ videos }) => {
  const [videoList, setVideoList] = useState<Video[]>(videos);
  const [currentVideo, setCurrentVideo] = useState(0);

  const videoPositions: Record<number, string> = {
    0: "tertiary tertiary-left",
    1: "secondary secondary-left",
    2: "main",
    3: "secondary secondary-right",
    4: "tertiary tertiary-right"
  };

  const changeVideo = (direction: 'left' | 'right', position?: string) => {
    let newIndex = currentVideo;

    if (direction === 'left') {
      newIndex = (currentVideo - 1 + 5) % 5;
    } else if (direction === 'right') {
      newIndex = (currentVideo + 1) % 5;
    } else {
      switch (position) {
        case 'secondary secondary-right':
          changeVideo('left');
          return;
        case 'secondary secondary-left':
          changeVideo('right');
          return;
        case 'tertiary tertiary-right':
          changeVideo('left');
          changeVideo('left');
          return;
        case 'tertiary tertiary-left':
          changeVideo('right');
          changeVideo('right');
          return;
        default:
          return;
      }
    }

    setCurrentVideo(newIndex);
  };

  useEffect(() => {
    // Initialize videos with updated positions
    const updatedVideos = videos.map((video: any, i: number) => ({
      ...video,
      position: videoPositions[(i + currentVideo) % 5]
    }));
    setVideoList(updatedVideos);
  }, [currentVideo, videos]);

  return (
    <div className="carousel">
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="carousel__chevron"
        onClick={() => changeVideo('right')}
        style={{ color: 'white' }}
      />
      <div className="carousel__content">
        {videoList.map((video, i) => (
          <div key={i} className={`carousel__video ${video.position}`}>
            {!video.active && (
              <div onClick={() => changeVideo('left', video.position)} className="inactive"></div>
            )}
            {!video.active && video.position === 'main' && (
              <div className="carousel__overlay">
                <div className="carousel__overlay-top">
                  <div className="carousel__overlay-picture">
                    <img src={video.channelImage} className='rounded-full' alt="" />
                  </div>
                  <div className="carousel__overlay-text">
                    <div className="carousel__overlay-name">{video.channelName}</div>
                    <div className="carousel__overlay-title">{video.channelTitle}</div>
                    <div className="carousel__overlay-views">playing Music for {video.channelViews} viewers</div>
                  </div>
                  <div className="carousel__overlay-live">
                    <div className="record-button"></div>
                    <span className="u-inline-text flex items-center">
                    {LiveIcon}LIVE
                    </span>
                  </div>
                </div>
                <i className="fas fa-play big-play" onClick={() => setVideoList(videoList.map(v => v === video ? { ...v, active: !v.active } : v))}></i>
                <div className="carousel__overlay-bottom">
                  <i className="fas fa-play" onClick={() => setVideoList(videoList.map(v => v === video ? { ...v, active: !v.active } : v))}></i>
                  <i className="fas fa-volume-up carousel__overlay-icon carousel__overlay-icon--volume"></i>
                  <i className="fas fa-cog carousel__overlay-icon carousel__overlay-icon--settings"></i>
                  <i className="fas fa-arrows-alt-v carousel__overlay-icon carousel__overlay-icon--fullscreen"></i>
                </div>
              </div>
            )}
            {!video.active && video.isVideoThumbnail ? (
              <video src={video.thumbnail} className="carousel__video-picture" loop autoPlay muted />
            ) : (
              !video.active && <img src={video.thumbnail} alt="" className="carousel__video-picture" />
            )}
            {video.active && (
              <>
                <iframe
                  id="ytplayer"
                  width="100%"
                  height="100%"
                  src={video.embed}
                  frameBorder="0"
                  title={video.channelTitle}
                ></iframe>
                <div className="carousel__placeholder-background"></div>
              </>
            )}
          </div>
        ))}
      </div>
      <FontAwesomeIcon
        icon={faChevronRight}
        className="carousel__chevron"
        onClick={() => changeVideo('left')}
        style={{ color: 'white' }}
      />
    </div>
  );
};

export default VideoCarousel;
