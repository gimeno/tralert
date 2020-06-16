import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
    center: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
    }
});

function Loader({ loaderSize }) {
    const styles = useStyles();

    return (
        <div className={styles.center}>
            <CircularProgress size={loaderSize} />
        </div>
    );
}

Loader.propTypes = {
    loaderSize: PropTypes.number
};

Loader.defaultProps = {
    loaderSize: 40
};

export default Loader;
