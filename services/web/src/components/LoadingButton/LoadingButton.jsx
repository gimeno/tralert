import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: 'relative'
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    }
}));

function LoadingButton(props) {
    const classes = useStyles();
    const { children, loading, iconButton, ...restProps } = props;

    const ButtonComp = iconButton ? IconButton : Button;

    return (
        <div className={classes.wrapper}>
            <ButtonComp disabled={loading} {...restProps}>
                {children}
            </ButtonComp>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );
}

LoadingButton.defaultProps = {
    loading: false,
    iconButton: false
};

LoadingButton.propTypes = {
    children: PropTypes.node.isRequired
};

export default LoadingButton;
