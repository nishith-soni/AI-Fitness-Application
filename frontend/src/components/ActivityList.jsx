import { Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const ActivityList = () => {

    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    const fetchActivities = async () => {
        try {
            const response = await getActivities();
            setActivities(response.data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    return (
        <Grid container spacing={2}>
            {activities.map((activity) => (
                <Grid item key={activity.id} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Card sx={{ cursor: 'pointer' }} onClick={() => navigate(`/activities/${activity.id}`)}>
                        <CardContent>
                            <Typography variant="h6">{activity.type}</Typography>
                            <Typography>Duration: {activity.duration} minutes</Typography>
                            <Typography>Calories Burned: {activity.caloriesBurned}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default ActivityList