import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { useAuth0 } from '../../utils/Auth0Context';
import PrivateRoute from './PrivateRoute';

jest.mock('../../utils/Auth0Context');

describe('<PrivateRoute />', () => {
    test('should render component if user has been authenticated', () => {
        useAuth0.mockReturnValue({
            isAuthenticated: true
        });

        const AComponent = () => <div>AComponent</div>;

        const wrapper = mount(
            <MemoryRouter initialEntries={['/aprivatepath']}>
                <PrivateRoute path="/aprivatepath" component={AComponent} />
            </MemoryRouter>
        );

        expect(wrapper.exists(AComponent)).toBe(true);
    });

    test('should call login with redirect', () => {
        const loginWithRedirect = jest.fn(() => Promise.resolve());
        useAuth0.mockReturnValue({
            isAuthenticated: false,
            loginWithRedirect
        });
        const AComponent = () => <div>AComponent</div>;

        mount(
            <MemoryRouter initialEntries={['/aprivatepath']}>
                <PrivateRoute path="/aprivatepath" component={AComponent} />
            </MemoryRouter>
        );

        expect(loginWithRedirect).toHaveBeenCalled();
    });
});
