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
                    .select('id, content, user_id');
                if (error) {
                    throw error;
                }

                setPosts(fetchedPosts);
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };

        fetchPosts();
    }, []); // Empty dependency array ensures that this effect runs only once on mount

    return (
        <Stack
            spacing={2}
        >
            {posts.length > 0 ? (
                posts.map((post: Post) => (
                    <div key={post.id}>
                        <FeedPost id={post.id} content={post.content} user_id={post.user_id} />
                    </div>
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

