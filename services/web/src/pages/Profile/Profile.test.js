import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button } from '@material-ui/core';
import { Formik } from 'formik';

import Profile from './Profile';

jest.mock('../../utils/Auth0Context', () => ({
    useAuth0: () => ({ user: {} })
}));

describe('<Profile />', () => {
    test('renders without crashing', () => {
        const wrapper = shallow(<Profile />);
        expect(wrapper.exists(Formik)).toBe(false);
    });

    test('should render form if click on edit', () => {
        const wrapper = shallow(<Profile />);
        wrapper.find(Button).simulate('click');
        expect(wrapper.exists(Formik)).toBe(true);
    });

    test('should go back to readonly mode if cancel is clicked', () => {
        const wrapper = mount(<Profile />);
        wrapper.find(Button).simulate('click');
        wrapper.find(Button).at(1).simulate('click');
        expect(wrapper.exists(Formik)).toBe(false);
    });
});
