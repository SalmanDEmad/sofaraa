import React from 'react';

interface ThumbnailProps {
    imgSrc: string;
    videoTitle: string;
    channelName: string;
    views: string;
    hoursAgo: string;
    videoUrl?: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ imgSrc, videoTitle, channelName, views, hoursAgo, videoUrl }) => {
    // Use Picsum for random profile picture
    const randomProfilePic = 'https://picsum.photos/24';

    return (
        <div className="relative rounded-md bg-white bg-opacity-3 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                <img src={imgSrc} alt="Video Thumbnail" className="w-full h-44 object-cover rounded-t-md" />
            </a>
            <div className="p-3 text-left">
                <h3 className="text-white text-md font-normal mb-2 line-clamp-2">{videoTitle}</h3>

                {/* Flexbox for profile image, channel name, views, and time */}
                <div className="flex items-center text-gray-300 text-sm mb-1">
                    <img
                        src={randomProfilePic}
                        alt="Profile"
                        className="w-6 h-6 rounded-full mr-2" // 24x24 profile image
                    />
                    <div>
                        <div>{channelName}</div>
                        <div className="text-gray-400 text-xs">{`${views} · ${hoursAgo}`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thumbnail;
