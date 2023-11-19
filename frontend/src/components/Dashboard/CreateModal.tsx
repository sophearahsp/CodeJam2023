import { Box, Modal, TextField, Paper, Button, Grid, Stack, Typography } from "@mui/material";
import { supabase } from "../../supabaseClient";

function CreateModal(props: {open: boolean, handleClose: () => void}) {
    const {open, handleClose} = props;

    // insert items to database
    const handleCreate = async () => {
        console.log("click create")
        try {
            // Get the authenticated user
            const { data: d, error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;
    
            // Define the data to be inserted
            const postData = {
                content: 'Post content',
                user_id: d.user.id,
            };
    
            // Insert the data into the 'posts' table
            const { data, error } = await supabase.from('posts').insert(postData);
            if (error) throw error;
    
            console.log('Post created successfully:', data);
        } catch (error) {
            console.error('Error creating post');
        }
        
    }

    return (
		<Modal
            open={open}
            onClose={handleClose}
        >
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
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}
                >
                    Create a Post
                </Typography>
                <TextField
                    label="Post Content"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleCreate}>
                    Post
                </Button>
            </Box>
        </Modal>
    )
}

export default CreateModal
