import React from 'react';
import { Link } from 'react-router-dom';
import { Fab, Box } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import EmptyState from '../../components/EmptyState/EmptyState';
import { ReactComponent as NotFoundIllustration } from '../../assets/illustrations/not-found.svg';

function NotFoundPage() {
    return (
        <EmptyState
            image={<NotFoundIllustration />}
            title="Page doesn’t exist"
            description="The page you’re trying to access doesn’t exist"
            button={
                <Fab variant="extended" color="primary" component={Link} to="/">
                    <Box clone mr={1}>
                        <HomeIcon />
                    </Box>
                    Home
                </Fab>
            }
        />
    );
}

export default NotFoundPage;