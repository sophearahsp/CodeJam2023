import React from 'react';
import { Box, Stack, Avatar, IconButton, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import ShareIcon from '@mui/icons-material/Share';


interface FeedPostProps {
    id: number;
    content: string;
    user_id: number;
}

const FeedPost = ({ id, content, user_id }: FeedPostProps) => {

    return (
        <Box
            p={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '4px',
                backgroundColor: 'white',
                border: 1,
                borderColor: "#ced4da"
            }}
        >
            <Stack spacing={2}>
                {/* Header: Account Image and Name */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        sx={{
                            marginRight: '12px',
                        }}
                    />
                    <Typography variant="subtitle1">{user_id}</Typography>
                </Box>

                {/* Content: Text and Image */}
                <Stack spacing={1}>
                    <Typography variant="body1">{content}</Typography>
                    {/* Add an Image component if applicable */}
                    {/* <img src="https://www.worldatlas.com/r/w768/upload/4f/c4/b6/shutterstock-108457985.jpg" alt="Post Image"
                        style={{
                            width: '100%',  // Ensure the image fills the width of the container
                            borderRadius: '4px',  // Apply rounded corners
                        }}
                    /> */}
                </Stack>
            </Stack>
            

            {/* Reactions: Like, Comment, Send, Share */}
            {/* <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <IconButton
                    sx={{
                        padding: '8px',
                        color: (theme) => theme.palette.text.secondary,
                    }}
                >
                <ThumbUpIcon />
                </IconButton>
                <IconButton
                    sx={{
                        padding: '8px',
                        color: (theme) => theme.palette.text.secondary,
                    }}
                >
                    <ChatBubbleOutlineIcon />
                </IconButton>
                <IconButton
                    sx={{
                        padding: '8px',
                        color: (theme) => theme.palette.text.secondary,
                    }}
                >
                    <SendIcon />
                </IconButton>
                <IconButton
                    sx={{
                        padding: '8px',
                        color: (theme) => theme.palette.text.secondary,
                    }}
                >
                    <ShareIcon />
                </IconButton>
            </Box> */}
        </Box>
    );
};

export default FeedPost;
