import React from 'react';
import { shallow } from 'enzyme';
import { Button, IconButton } from '@material-ui/core';
import { useAuth0 } from '../../utils/Auth0Context';
import NavBar from './NavBar';

jest.mock('../../utils/Auth0Context');

describe('<NavBar />', () => {
    test('should render login button if user is not authenticated', () => {
        const loginWithRedirect = jest.fn(() => Promise.resolve());
        useAuth0.mockReturnValue({
            loading: false,
            isAuthenticated: false,
            loginWithRedirect
        });

        const wrapper = shallow(<NavBar />);
        expect(wrapper.text().includes('Log in')).toBe(true);

        wrapper.find(Button).simulate('click');
        expect(loginWithRedirect).toHaveBeenCalled();
    });

    test('should render one IconButton if user is authenticated', () => {
        useAuth0.mockReturnValue({
            loading: false,
            isAuthenticated: true,
            user: {}
        });

        const wrapper = shallow(<NavBar />);
        expect(wrapper.exists(IconButton)).toBe(true);
    });
});
