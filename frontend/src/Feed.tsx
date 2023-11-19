import React, {useEffect, useState} from 'react';
import { Box, TextField, Paper, Button, Grid, Stack, Typography } from "@mui/material";
import FeedPost from './components/Dashboard/FeedPost';
import { supabase } from './supabaseClient'

interface Post {
    id: number;
    content: string;
    user_id: number;
}
  
const Feed = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        // Fetch posts from Supabase on component mount
        const fetchPosts = async () => {
            try {
                const { data: fetchedPosts, error } = await supabase
                    .from('posts')
                    .select('content'); // Adjust columns as per your 'posts' table structure

                if (error) {
                    throw error;
                }

                setPosts(posts || []);
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };

        fetchPosts();
    }, []); // Empty dependency array ensures that this effect runs only once on mount

    return (
        <Stack
            // p={2}
            spacing={2}
        >
            {posts.length > 0 ? (
                posts.map((post: Post) => (
                    <FeedPost key={post.id} content={post.content} userId={post.user_id} />
                ))
            ) : (
                <Typography>No posts available</Typography>
            )}
            
            {/* <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/> */}
        </Stack>
    )
}

export default Feed;

