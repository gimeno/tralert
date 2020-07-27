import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import EmptyState from '../EmptyState/EmptyState';
import { ReactComponent as ErrorIllustration } from '../../assets/illustrations/error.svg';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    render() {
        const { children, t } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return (
                <EmptyState
                    image={<ErrorIllustration />}
                    title={t('component.error-boundary.title')}
                    description={t('component.error-boundary.description')}
                />
            );
        }

        return children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default withTranslation()(ErrorBoundary);
