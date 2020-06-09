import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

import NavBar from '../components/NavBar/NavBar';
import Routes from '../pages/Routes/Routes';

describe('<App />', () => {
    test('renders NavBar and Routes', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(NavBar)).toExist();
        expect(wrapper.find(Routes)).toExist();
    });
});
