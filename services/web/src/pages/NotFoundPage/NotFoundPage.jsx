import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Fab, Box } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import EmptyState from '../../components/EmptyState/EmptyState';
import { ReactComponent as NotFoundIllustration } from '../../assets/illustrations/not-found.svg';

function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <EmptyState
            image={<NotFoundIllustration />}
            title={t('page.not-found.page-does-not-exist')}
            description={t('page.not-found.page-does-not-exist-message')}
            button={
                <Fab variant="extended" color="primary" component={Link} to="/">
                    <Box clone mr={1}>
                        <HomeIcon />
                    </Box>
                    {t('page.not-found.home')}
                </Fab>
            }
        />
    );
}

export default NotFoundPage;
