import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

function UserAvatar({ picture }) {
    if (picture) {
        return <Avatar alt="Avatar" src={picture} />;
    }

    return <AccountCircle />;
}

UserAvatar.propTypes = {
    picture: PropTypes.string
};

UserAvatar.defaultProps = {
    picture: undefined
};

export default UserAvatar;
