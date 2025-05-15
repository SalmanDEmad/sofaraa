import React from 'react';
import VideoCarousel from '../../Components/VideoCarousel';

const sampleVideos = [
  {
    position: 'main',
    active: false,
    channelImage: 'https://picsum.photos/150?random=1',
    channelName: 'Channel One',
    channelTitle: 'Video One',
    channelViews: '1K',
    thumbnail: 'https://picsum.photos/640/360?random=1',
    embed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isVideoThumbnail: false // Add this flag
  },
  {
    position: 'side',
    active: false,
    channelImage: 'https://picsum.photos/150?random=2',
    channelName: 'Channel Two',
    channelTitle: 'Video Two',
    channelViews: '2K',
    thumbnail: 'https://picsum.photos/640/360?random=2',
    embed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isVideoThumbnail: false // Add this flag
  },
  {
    position: 'secondary-left',
    active: false,
    channelImage: 'https://picsum.photos/150?random=3',
    channelName: 'Channel Three',
    channelTitle: 'Video Three',
    channelViews: '3K',
    thumbnail: 'https://files.catbox.moe/ipn0zn.mp4', // Video URL
    embed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isVideoThumbnail: true // Add this flag
  },
  {
    position: 'secondary-right',
    active: false,
    channelImage: 'https://picsum.photos/150?random=4',
    channelName: 'Channel Four',
    channelTitle: 'Video Four',
    channelViews: '4K',
    thumbnail: 'https://videos.pexels.com/video-files/17329650/17329650-hd_1920_1080_60fps.mp4', // Video URL
    embed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isVideoThumbnail: true // Add this flag
  },
  {
    position: 'tertiary-left',
    active: false,
    channelImage: 'https://picsum.photos/150?random=5',
    channelName: 'Channel Five',
    channelTitle: 'Video Five',
    channelViews: '5K',
    thumbnail: 'https://picsum.photos/640/360?random=5',
    embed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isVideoThumbnail: false // Add this flag
  },
  {
    position: 'tertiary-right',
    active: false,
    channelImage: 'https://picsum.photos/150?random=6',
    channelName: 'Channel Six',
    channelTitle: 'Video Six',
    channelViews: '6K',
    thumbnail: 'https://picsum.photos/640/360?random=6',
    embed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isVideoThumbnail: false // Add this flag
  }
  // Add more video objects as needed
];

  

const TopStreams: React.FC = () => {
  return (
    <section id="tutors" className="py-16 px-4">
      <VideoCarousel videos={sampleVideos} />
    </section>
  );
};

export default TopStreams;
