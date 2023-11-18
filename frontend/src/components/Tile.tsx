import { DailyVideo, useMediaTrack } from '@daily-co/daily-react';
import { useParticipantProperty } from '@daily-co/daily-react';


interface UsernameProps {
	id: string;
	isLocal: boolean;
}

const Username = ({ id, isLocal }: UsernameProps) => {
    const username = useParticipantProperty(id, 'user_name');
  
    return (
        <div className="username">
            {username || id} {isLocal && '(you)'}
        </div>
    );
}

interface TileProps {
	id: string;
	isScreenShare: boolean;
    isLocal: boolean;
    isAlone: boolean;
}

const Tile = ({ id, isScreenShare, isLocal, isAlone }: TileProps) => {
    const videoState = useMediaTrack(id, 'video');

    let containerCssClasses = isScreenShare ? 'tile-screenshare' : 'tile-video';

    if (isLocal) {
        containerCssClasses += ' self-view';
        if (isAlone) {
            containerCssClasses += ' alone';
        }
    }

    /* If a participant's video is muted, hide their video and
    add a different background color to their tile. */
    if (videoState.isOff) {
        containerCssClasses += ' no-video';
    }

    return (
        <div>
            <DailyVideo automirror sessionId={id} type={isScreenShare ? 'screenVideo' : 'video'} style={{width: '100%'}} fit="cover"/>
            <Username id={id} isLocal={isLocal} />
        </div>
    );
}

export default Tile;