import React from 'react';
import { shallow } from 'enzyme';
import { Button, IconButton } from '@material-ui/core';
import LoadingButton from './LoadingButton';

describe('<LoadingButton />', () => {
    test('should print a Button component', () => {
        const wrapper = shallow(<LoadingButton>Test</LoadingButton>);
        expect(wrapper.find(Button)).toExist();
    });

    test('should print an IconButton component', () => {
        const wrapper = shallow(<LoadingButton iconButton>Test</LoadingButton>);
        expect(wrapper.find(IconButton)).toExist();
    });
});
