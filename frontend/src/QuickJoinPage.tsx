import React from "react"
import { Box, TextField, Button, Stack } from "@mui/material";

const QuickJoinPage = () => {
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
            <Stack>
                <TextField
                    sx={{ marginBottom: '32px' }}
                />
                <Button variant="contained">
                    Join
                </Button>
            </Stack>
        </Box>
    )
}

export default QuickJoinPage;