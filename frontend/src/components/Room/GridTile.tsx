import { DailyVideo, useMediaTrack } from '@daily-co/daily-react';
import { Box, Grid } from "@mui/material";
import React, {ReactNode} from 'react';


const GridTile = (props: {children: ReactNode}) => {
    return (
        <Grid
            item
            xs={8}
            sx={{
                height: '100%'
            }}
        >
            {props.children}
        </Grid>
    );
}

export default GridTile;