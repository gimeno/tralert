import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Box, IconButton, Typography } from '@material-ui/core';
import { Commute, MoreVert as MoreIcon, Person, ExitToApp, Notifications } from '@material-ui/icons';
import UserAvatar from '../UserAvatar/UserAvatar';
import MenuBar from '../MenuBar/MenuBar';
import { useAuth0 } from '../../utils/Auth0Context';

const useStyles = makeStyles((theme) => ({
    homeLink: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'inherit'
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }
}));

function NavBar() {
    const classes = useStyles();
    const { isAuthenticated, loading, user, loginWithRedirect, logout } = useAuth0();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const menuItems = [
        {
            name: 'Alerts',
            to: '/alerts',
            icon: <Notifications />
        },
        {
            name: 'Profile',
            to: '/profile',
            icon: <Person />
        },
        {
            name: 'Logout',
            divide: true,
            icon: <ExitToApp />,
            onClick: logout
        }
    ];

    const menuId = 'user-menu';
    const mobileMenuId = 'user-menu-mobile';

    return (
        <AppBar position="static">
            <Toolbar>
                <Box display="flex" flexGrow={1}>
                    <Link to="/" className={classes.homeLink}>
                        <Commute fontSize="large" />
                        <Typography variant="h6" color="inherit" noWrap>
                            Tralert
                        </Typography>
                    </Link>
                </Box>
                {!loading && !isAuthenticated && (
                    <Button disabled={loading} color="inherit" onClick={() => loginWithRedirect({})}>
                        Log in
                    </Button>
                )}
                {!loading && isAuthenticated && (
                    <>
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                                color="inherit"
                            >
                                <UserAvatar picture={user.picture} />
                            </IconButton>
                        </div>
                        <MenuBar
                            menuId={menuId}
                            menuItems={menuItems}
                            anchorEl={anchorEl}
                            handleMenuClose={handleMenuClose}
                        />
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                        <MenuBar
                            menuId={mobileMenuId}
                            menuItems={menuItems}
                            anchorEl={mobileMoreAnchorEl}
                            handleMenuClose={handleMenuClose}
                        />
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
