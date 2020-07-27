import React from 'react';
import { mount } from 'enzyme';
import EmptyState from '../../components/EmptyState/EmptyState';
import ErrorBoundary from './ErrorBoundary';

const TestComp = () => null;

describe('<ErrorBoundary />', () => {
    test('should display error message if error is thrown', () => {
        const wrapper = mount(
            <ErrorBoundary>
                <TestComp />
            </ErrorBoundary>
        );
        wrapper.find(TestComp).simulateError(new Error('Test error'));
        expect(wrapper.exists(EmptyState)).toBe(true);
    });
});
