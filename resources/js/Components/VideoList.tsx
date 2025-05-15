import React from 'react';
import Thumbnail from './Thumbnail';

const VideoList: React.FC = () => {
    const generateRandomTitle = () => `Video Title ${Math.floor(Math.random() * 100)}`;
    const generateRandomChannelName = () => `Channel ${Math.floor(Math.random() * 100)}`;
    const generateRandomViews = () => `${Math.floor(Math.random() * 1000)}K Views`;
    const generateRandomHoursAgo = () => `${Math.floor(Math.random() * 24)} hours ago`;

    return (
        <div className="grid gap-5 p-5 mx-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <Thumbnail 
                    key={index}
                    imgSrc={`https://picsum.photos/210/118?random=${index}`}
                    videoTitle={generateRandomTitle()}
                    channelName={generateRandomChannelName()}
                    views={generateRandomViews()}
                    hoursAgo={generateRandomHoursAgo()}
                />
            ))}
        </div>
    );
};

export default VideoList;
