import React from 'react';
import { shallow } from 'enzyme';
import { Switch } from 'react-router-dom';
import { useAuth0 } from '../../utils/Auth0Context';
import Loader from '../../components/Loader/Loader';
import Routes from './Routes';

jest.mock('../../utils/Auth0Context');

describe('<Routes />', () => {
    test('should render loader if loading is true', () => {
        useAuth0.mockReturnValue({
            loading: true
        });

        const wrapper = shallow(<Routes />);
        expect(wrapper.exists(Loader)).toBe(true);
    });

    test('should render switch if loading is false', () => {
        useAuth0.mockReturnValue({
            loading: false
        });

        const wrapper = shallow(<Routes />);
        expect(wrapper.exists(Switch)).toBe(true);
    });
});
