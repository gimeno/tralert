import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

function getComponentContent(props, sizeProps) {
    const { imageWidth, imageHeight, variant } = sizeProps;
    return (
        <>
            {props.image && (
                <Box
                    clone
                    mb={props.title || props.description ? 2 : 0}
                    width={`${imageWidth}%`}
                    height={`${imageHeight}%`}
                >
                    {props.image}
                </Box>
            )}

            {props.title && (
                <Box mb={!props.description && props.button ? 2 : 0}>
                    <Typography variant={variant}>{props.title}</Typography>
                </Box>
            )}

            {props.description && (
                <Box mb={props.button && 2}>
                    <Typography variant="body1">{props.description}</Typography>
                </Box>
            )}

            {props.button && props.button}
        </>
    );
}

function getSizeProps(size) {
    const result = {};

    switch (size) {
        case 'small':
            result.imageWidth = 40;
            result.imageHeight = 40;
            result.variant = 'h6';
            break;
        case 'medium':
            result.imageWidth = 60;
            result.imageHeight = 60;
            result.variant = 'h5';
            break;
        case 'large':
            result.imageWidth = 100;
            result.imageHeight = 100;
            result.variant = 'h4';
            break;
        default:
            result.imageWidth = 60;
            result.imageHeight = 60;
            result.variant = 'h5';
            break;
    }

    return result;
}

function EmptyState(props) {
    const sizeProps = getSizeProps(props.size);

    if (props.type === 'page') {
        return (
            <Box
                style={{ transform: 'translate(-50%, -50%)' }}
                position="absolute"
                top="50%"
                left="50%"
                textAlign="center"
            >
                {getComponentContent(props, sizeProps)}
            </Box>
        );
    }

    if (props.type === 'card') {
        return (
            <Box padding={props.padding} textAlign="center">
                {getComponentContent(props, sizeProps)}
            </Box>
        );
    }

    return null;
}

EmptyState.defaultProps = {
    type: 'page',
    size: 'medium',
    padding: 2,
    button: undefined
};

EmptyState.propTypes = {
    type: PropTypes.string,
    size: PropTypes.string,
    padding: PropTypes.number,
    image: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    button: PropTypes.element
};

export default EmptyState;
