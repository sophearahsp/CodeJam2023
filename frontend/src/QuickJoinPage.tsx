import React, {useState, useCallback, useEffect} from "react"
import { Box, TextField, Button, Stack } from "@mui/material";
import api from './api';
import DailyIframe, { DailyCall } from '@daily-co/daily-js';
import { DailyProvider, DailyEvent } from '@daily-co/daily-react';
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from './utils';
import PreJoinScreen from "./components/PreJoinScreen";
import HomeScreen from './components/HomeScreen';
import RoomScreen from './components/RoomScreen';

/* We decide what UI to show to users based on the state of the app, which is dependent on the state of the call object. */
const STATE_IDLE = 'STATE_IDLE';
const STATE_CREATING = 'STATE_CREATING';
const STATE_JOINING = 'STATE_JOINING';
const STATE_JOINED = 'STATE_JOINED';
const STATE_LEAVING = 'STATE_LEAVING';
const STATE_ERROR = 'STATE_ERROR';
const STATE_HAIRCHECK = 'STATE_HAIRCHECK';

const QuickJoinPage = () => {
    const [appState, setAppState] = useState(STATE_IDLE);
    const [roomUrl, setRoomUrl] = useState<string>("");
    const [callObject, setCallObject] = useState<DailyCall | null>(null);
    const [apiError, setApiError] = useState(false);

    const createCall = useCallback(() => {
        setAppState(STATE_CREATING);
        return api
            .createRoom()
            .then((room) => room.url)
            .catch((error) => {
                console.error('Error creating room', error);
                setRoomUrl("");
                setAppState(STATE_IDLE);
                setApiError(true);
            });
    }, []);

    /**
     * We've created a room, so let's start the hair check. We won't be joining the call yet.
     */
    const startHairCheck = useCallback(async (url: string) => {
        const newCallObject = DailyIframe.createCallObject();
        setRoomUrl(url);
        setCallObject(newCallObject);
        setAppState(STATE_HAIRCHECK);
        await newCallObject.preAuth({ url }); // add a meeting token here if your room is private
        await newCallObject.startCamera();
    }, []);

    /**
     * Once we pass the hair check, we can actually join the call.
     */
    const joinCall = useCallback(() => {
        if (callObject){
            callObject.join({ url: roomUrl });
        }
    }, [callObject, roomUrl]);

    /**
     * Start leaving the current call.
     */
    const startLeavingCall = useCallback(() => {
        if (!callObject) return;
        // If we're in the error state, we've already "left", so just clean up
        if (appState === STATE_ERROR) {
            callObject.destroy().then(() => {
                setRoomUrl("");
                setCallObject(null);
                setAppState(STATE_IDLE);
            });
        } else {
            /* This will trigger a `left-meeting` event, which in turn will trigger
            the full clean-up as seen in handleNewMeetingState() below. */
            setAppState(STATE_LEAVING);
            callObject.leave();
        }
    }, [callObject, appState]);


    /**
     * If a room's already specified in the page's URL when the component mounts,
     * join the room.
     */
    useEffect(() => {
        const url = roomUrlFromPageUrl();
        if (url) {
            startHairCheck(url);
        }
    }, [startHairCheck]);

    /**
     * Update the page's URL to reflect the active call when roomUrl changes.
     */
    useEffect(() => {
        const pageUrl = pageUrlFromRoomUrl(roomUrl);
        if (pageUrl === window.location.href) return;
        window.history.replaceState(null, "", pageUrl);
    }, [roomUrl]);

    /**
     * Update app state based on reported meeting state changes.
     *
     * NOTE: Here we're showing how to completely clean up a call with destroy().
     * This isn't strictly necessary between join()s, but is good practice when
     * you know you'll be done with the call object for a while, and you're no
     * longer listening to its events.
     */
    useEffect(() => {
        if (!callObject) return;

        const events: DailyEvent[] = ['joined-meeting', 'left-meeting', 'error', 'camera-error'];

        function handleNewMeetingState() {
            if (callObject)
            switch (callObject.meetingState()) {
                case 'joined-meeting':
                setAppState(STATE_JOINED);
                break;
                case 'left-meeting':
                callObject.destroy().then(() => {
                    setRoomUrl("");
                    setCallObject(null);
                    setAppState(STATE_IDLE);
                });
                break;
                case 'error':
                setAppState(STATE_ERROR);
                break;
                default:
                break;
            }
        }

        // Use initial state
        handleNewMeetingState();

        /*
        * Listen for changes in state.
        * We can't use the useDailyEvent hook (https://docs.daily.co/reference/daily-react/use-daily-event) for this
        * because right now, we're not inside a <DailyProvider/> (https://docs.daily.co/reference/daily-react/daily-provider)
        * context yet. We can't access the call object via daily-react just yet, but we will later in Call.js and HairCheck.js!
        */
        events.forEach((event) => callObject.on(event, handleNewMeetingState));

        // Stop listening for changes in state
        return () => {
            events.forEach((event) => callObject.off(event, handleNewMeetingState));
        };
    }, [callObject]);
    
    /**
     * Show the call UI if we're either joining, already joined, or have encountered
     * an error that is _not_ a room API error.
     */
    const showCall = !apiError && [STATE_JOINING, STATE_JOINED, STATE_ERROR].includes(appState);

    /* When there's no problems creating the room and startHairCheck() has been successfully called,
    * we can show the hair check UI. */
    const showHairCheck = !apiError && appState === STATE_HAIRCHECK;

    const renderApp = () => {
        // If something goes wrong with creating the room.
        if (apiError) {
            return (
                <div className="api-error">
                    <h1>Error</h1>
                    <p>
                        Room could not be created. Check if your `.env` file is set up correctly. For more
                        information, see the{' '}
                        <a href="https://github.com/daily-demos/custom-video-daily-react-hooks#readme">
                            readme
                        </a>{' '}
                        :)
                    </p>
                </div>
            );
        }

        // No API errors? Let's check our hair then.
        if (showHairCheck && callObject) {
            return (
                <DailyProvider callObject={callObject}>
                    <PreJoinScreen joinCall={joinCall} cancelCall={startLeavingCall} />
                </DailyProvider>
            );
        }

        // No API errors, we passed the hair check, and we've joined the call? Then show the call.
        if (showCall && callObject) {
            return (
                <DailyProvider callObject={callObject}>
                    <RoomScreen leaveCall={startLeavingCall} />
                </DailyProvider>
            );
        }

        // The default view is the HomeScreen, from where we start the demo.
        return <HomeScreen createCall={createCall} startHairCheck={startHairCheck} />;
    };

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {renderApp()}
        </Box>
    )
}

export default QuickJoinPage;