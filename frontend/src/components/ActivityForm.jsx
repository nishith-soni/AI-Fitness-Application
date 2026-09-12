import { Box, FormControl, MenuItem } from '@mui/material'
import React, { useState } from 'react'

const ActivityForm = ({ onActivityAdded }) => {

    const [activity, setActivity] = useState({ 
        type: "RUNNING", duration: '', caloriesBurned: '',
        additionalMetrics: {}
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await addActivity(activity);
            onActivityAdded();
            setActivity({ type: "RUNNING", duration: '', caloriesBurned: ''});
        } catch (error) {
            
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Activity Type:</InputLabel>
                <Select value={activity.type} onChange={(e) => setActivity({ ...activity, type: e.target.value })}>
                    <MenuItem value="RUNNING">Running</MenuItem>
                    <MenuItem value="CYCLING">Cycling</MenuItem>
                    <MenuItem value="SWIMMING">Swimming</MenuItem>
                </Select>
            </FormControl>
            <TextField fullWidth 
                        label="Duration (minutes)" 
                        type="number" 
                        value={activity.duration} 
                        onChange={(e) => setActivity({ ...activity, duration: e.target.value })} 
                        sx={{ mb: 2 }} />

            <TextField fullWidth 
                        label="Calories Burned" 
                        type="number" 
                        value={activity.caloriesBurned} 
                        onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })} 
                        sx={{ mb: 2 }} />

            <Button type="submit" variant="contained" >
                Add Activity
            </Button>
        </Box>
    )
}

export default ActivityForm