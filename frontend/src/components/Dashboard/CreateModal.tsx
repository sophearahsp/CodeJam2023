import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { supabase } from '../../supabaseClient'

function CreateModal(props: { open: boolean; handleClose: () => void }) {
    const { open, handleClose } = props;
    const [postContent, setPostContent] = useState('');

    // insert items to database
    const handleCreate = async () => {
        try {
            // Get the authenticated user
            const { data: d, error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;

            // Define the data to be inserted
            const postData = {
                content: postContent, // Use the state for post content
                user_id: d.user.id,
            };

            // Insert the data into the 'posts' table
            const { data, error } = await supabase.from('posts').insert(postData);
            if (error) throw error;

            console.log('Post created successfully:', data);
            handleClose(); // Close the modal after successful post creation
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                backgroundColor: 'white',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                }}
            >
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Create a Post
                </Typography>
                <TextField
                    label="Post Content"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)} // Update state on change
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleCreate}>
                    Post
                </Button>
            </Box>
        </Modal>
    );
}

export default CreateModal;
