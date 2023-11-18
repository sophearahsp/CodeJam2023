import { useCallback, useState, FormEvent, MouseEvent, ChangeEvent } from 'react';
import { useAppMessage, useLocalParticipant } from '@daily-co/daily-react';
import {DailyEventObjectAppMessage} from '@daily-co/daily-js';
import { PlaceholderOtherIcon } from './Icons';
import { Box, TextField, Button, Stack } from "@mui/material";

interface ChatProps {
    showChat: boolean;
    toggleChat: () => void;
}


type MessageData = {
    msg: string;
    name: string;
}

const Chat = ({ showChat, toggleChat }: ChatProps) => {
//export default function Chat({ showChat, toggleChat }) {
    const localParticipant = useLocalParticipant();
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [inputValue, setInputValue] = useState('');

    const sendAppMessage = useAppMessage({
        onAppMessage: useCallback(
            (ev: DailyEventObjectAppMessage) =>
                setMessages((existingMessages: MessageData[]) => [
                    ...existingMessages,
                    {
                        msg: ev.data.msg,
                        name: ev.data.name,
                    } as MessageData,
                ]),
            [],
        ),
    });

    const sendMessage = useCallback(
        (message: string) => {
            /* Send the message to all participants in the chat - this does not include ourselves!
            * See https://docs.daily.co/reference/daily-js/events/participant-events#app-message
            */
            sendAppMessage(
                {
                    msg: message,
                    name: localParticipant?.user_name || 'Guest',
                },
                '*',
            );

            /* Since we don't receive our own messages, we will set our message in the messages array.
            * This way _we_ can also see what we wrote.
            */
            setMessages([
                ...messages,
                {
                    msg: message,
                    name: localParticipant?.user_name || 'Guest',
                },
            ]);
        },
        [localParticipant, messages, sendAppMessage],
    );

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    };

    //FormEvent<HTMLFormElement>
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!inputValue) return; // don't allow people to submit empty strings
        sendMessage(inputValue);
        setInputValue('');
    };

    return showChat ? (
        <Stack sx={{height: '100vh', display: 'flex'}}>
            <Stack sx={{flexGrow: '1', overflowY: 'auto'}}>
                {messages?.map((message, index) => (
                    <Box key={`message-${index}`}>
                        <span>{message?.name}</span>:{' '}
                        <p>{message?.msg}</p>
                    </Box>
                ))}
            </Stack>
            <Stack direction={"row"}>
                <TextField value={inputValue} onChange={(e) => onChange(e)} placeholder="Type your message here.."></TextField>
                <Button variant={"contained"} onClick={handleSubmit}>Submit</Button>
            </Stack>
        </Stack>
    ) : null;
}

export default Chat;