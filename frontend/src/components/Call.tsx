import React, { useState, useCallback, useMemo } from 'react';
import {
  useParticipantIds,
  useScreenShare,
  useLocalParticipant,
  useDailyEvent,
  DailyAudio,
} from '@daily-co/daily-react';
import Tile from './Tile';
//import UserMediaError from '../UserMediaError/UserMediaError';

export default function Call() {
    /* If a participant runs into a getUserMedia() error, we need to warn them. */
    const [getUserMediaError, setGetUserMediaError] = useState(false);

    /* We can use the useDailyEvent() hook to listen for daily-js events. Here's a full list
    * of all events: https://docs.daily.co/reference/daily-js/events */
    useDailyEvent(
        'camera-error',
        useCallback(() => {
            setGetUserMediaError(true);
        }, []),
    );

    /* This is for displaying remote participants: this includes other humans, but also screen shares. */
    const { screens } = useScreenShare();
    const remoteParticipantIds = useParticipantIds({ filter: 'remote' });

    /* This is for displaying our self-view. */
    const localParticipant = useLocalParticipant();
    const isAlone = useMemo(
        () => remoteParticipantIds?.length < 1 || screens?.length < 1,
        [remoteParticipantIds, screens],
    );

    const renderCallScreen = () => (
        <div>
            {/* Your self view */}
            {localParticipant && (
                <Tile
                    id={localParticipant.session_id}
                    isLocal
                    isAlone={isAlone}
                    isScreenShare={false}
                />
            )}
            {/* Videos of remote participants and screen shares */}
            {remoteParticipantIds?.length > 0 || screens?.length > 0 ? (
                <>
                    {remoteParticipantIds.map((id) => (
                        <Tile key={id} id={id} isScreenShare={false} isAlone={false} isLocal={false}/>
                    ))}
                    {screens.map((screen) => (
                        <Tile key={screen.screenId} id={screen.session_id} isScreenShare isAlone={false} isLocal={false}/>
                    ))}
                    <DailyAudio />
                </>
            ) : (
                // When there are no remote participants or screen shares
                <div className="info-box">
                    <h1>Waiting for others</h1>
                    <p>Invite someone by sharing this link:</p>
                    <span className="room-url">{window.location.href}</span>
                </div>
            )}
        </div>
    );

    return getUserMediaError ? <>USERMEDIAERROR</> : renderCallScreen();
}
