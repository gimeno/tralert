import React from 'react';
import { shallow } from 'enzyme';
import { Avatar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import UserAvatar from './UserAvatar';

describe('<UserAvatar />', () => {
    test('renders Avatar if photo url is passed', () => {
        const wrapper = shallow(<UserAvatar picture="testPic" />);
        expect(wrapper.find(Avatar)).toExist();
    });

    test('renders AccountCircle if no photo url is passed', () => {
        const wrapper = shallow(<UserAvatar />);
        expect(wrapper.find(AccountCircle)).toExist();
    });
});
