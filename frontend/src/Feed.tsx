import { Box, TextField, Paper, Button, Grid, Stack, Typography } from "@mui/material";
import FeedPost from './components/Dashboard/FeedPost';

const Feed = () => {
    
    return (
        <Stack
            // p={2}
            spacing={2}
        >
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
        </Stack>
    )
}

export default Feed;

