import { useCallback, useState, FormEvent, ChangeEvent } from 'react';
import { useAppMessage, useLocalParticipant } from '@daily-co/daily-react';
import {DailyEventObjectAppMessage} from '@daily-co/daily-js';
import { PlaceholderOtherIcon } from './Icons';


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

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue) return; // don't allow people to submit empty strings
        sendMessage(inputValue);
        setInputValue('');
    };

    return showChat ? (
        <aside className="chat">
            <div>hihuihuihui</div>
            <button onClick={toggleChat} className="close-chat" type="button">
                Close chat
            </button>
            <ul className="chat-messages">
                {messages?.map((message, index) => (
                    <li key={`message-${index}`} className="chat-message">
                        <span className="chat-message-author">{message?.name}</span>:{' '}
                        <p className="chat-message-body">{message?.msg}</p>
                    </li>
                ))}
            </ul>
            <div className="add-message">
                <form className="chat-form" onSubmit={handleSubmit}>
                    <input
                        className="chat-input"
                        type="text"
                        placeholder="Type your message here.."
                        value={inputValue}
                        onChange={(e) => onChange(e)}
                    />
                    <button type="submit" className="chat-submit-button">
                        <PlaceholderOtherIcon /> submit
                    </button>
                </form>
            </div>
        </aside>
    ) : null;
}

export default Chat;