import React from 'react';
import { shallow } from 'enzyme';
import EmptyState from '../../components/EmptyState/EmptyState';
import NotFoundPage from './NotFoundPage';

describe('<NotFoundPage />', () => {
    test('renders without crashing', () => {
        const wrapper = shallow(<NotFoundPage />);
        expect(wrapper.exists(EmptyState)).toBe(true);
    });
});
