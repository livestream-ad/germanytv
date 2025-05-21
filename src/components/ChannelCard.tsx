import React from 'react';
import { Channel } from '../types/Channel';
import '../styles/ChannelCard.css';

interface ChannelCardProps {
  channel: Channel;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel }) => {
  return (
    <a href={channel.url} className="channel-card" target="_blank" rel="noopener noreferrer">
      <div className="channel-logo">
        <img 
          src={channel.logo} 
          alt={`${channel.name} logo`} 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://www.livestream.ad/images/placeholder.png';
          }}
        />
      </div>
      <div className="channel-name">{channel.name}</div>
    </a>
  );
};

export default ChannelCard; 