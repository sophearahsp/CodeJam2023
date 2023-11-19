import { useCallback, useState, FormEvent, MouseEvent, ChangeEvent } from 'react';
import { useAppMessage, useLocalParticipant } from '@daily-co/daily-react';
import {DailyEventObjectAppMessage} from '@daily-co/daily-js';
import { PlaceholderOtherIcon } from '../Icons';
import { Box, TextField, Button, IconButton, Stack, InputAdornment, Typography } from "@mui/material";
import {Send} from '@mui/icons-material';

interface ChatProps {
    showChat: boolean;
    toggleChat: () => void;
}

type MessageData = {
    msg: string;
    name: string;
}

const MessageDialog = (props: {index: number, message: MessageData}) => {
    const {message, index} = props;

    return (
        <Box
            key={`message-${index}`}
            sx={{
                backgroundColor: '#F1F3F5',
                borderRadius: '4px',
                wordWrap: 'break-word',
            }}
            p={1}
        >
            <Typography fontWeight={700}>
                {message?.name}
            </Typography>
            <Typography fontWeight={500}>
                {message?.msg}
            </Typography>
        </Box>
    )
}

const Chat = ({ showChat, toggleChat }: ChatProps) => {
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (!inputValue) return; // don't allow people to submit empty strings
            sendMessage(inputValue);
            setInputValue('');
        }
    };
      
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!inputValue) return; // don't allow people to submit empty strings
        sendMessage(inputValue);
        setInputValue('');
    };

    const SystemMessage = () => {
        const defaultMessage = "this is a default message"

        sendAppMessage(
            {
                msg: defaultMessage,
                name: 'Bot',
            },
            '*',
        );

        /* Since we don't receive our own messages, we will set our message in the messages array.
        * This way _we_ can also see what we wrote.
        */
        setMessages([
            ...messages,
            {
                msg: defaultMessage,
                name: 'Bot',
            },
        ]);
    }

    return showChat ? (
        <Stack
            sx={{
                height: '100vh',
                display: 'flex',
            }}
        >
            <Typography fontSize={12}>
                {window.location.href}
            </Typography>
            <Stack
                spacing={2}
                p={1}
                sx={{
                    flexGrow: '1',
                    overflowY: 'auto',
                }}
            >
                {messages?.map((message, index) => (
                    <MessageDialog index={index} message={message}/>
                ))}
            </Stack>
            <Stack direction={"row"} p={2}>
                <TextField
                    fullWidth
                    size={'medium'}
                    value={inputValue}
                    onChange={(e) => onChange(e)}
                    placeholder="Type your message here.."
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleSubmit}
                                    sx={{
                                        borderRadius: '4px',
                                    }}
                                >
                                    <Send />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                >

                </TextField>
                </Stack>
            {/* <Stack>
                <Button onClick={SystemMessage}>
                    try me
                </Button>
            </Stack> */}
        </Stack>
    ) : null;
}

export default Chat;