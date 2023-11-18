import { DailyVideo, useMediaTrack } from '@daily-co/daily-react';
import { useParticipantProperty } from '@daily-co/daily-react';
import UsernameLabel from './UsernameLabel';
import GridTile from './GridTile';

interface TileProps {
	id: string;
	isScreenShare: boolean;
    isLocal: boolean;
    isAlone: boolean;
}

const VideoTile = ({ id, isScreenShare, isLocal, isAlone }: TileProps) => {

    return (
        <GridTile>
            <DailyVideo automirror sessionId={id} type={isScreenShare ? 'screenVideo' : 'video'} style={{width: '100%'}} fit="cover"/>
            <UsernameLabel id={id} isLocal={isLocal} />
        </GridTile>
    );
}

export default VideoTile;