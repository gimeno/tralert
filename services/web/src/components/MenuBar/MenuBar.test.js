import React from 'react';
import { shallow } from 'enzyme';
import { Divider, MenuItem } from '@material-ui/core';
import MenuBar from './MenuBar';

describe('<MenuBar />', () => {
    test('renders menu items based on menuItems prop', () => {
        const menuItems = [
            {
                name: 'Alerts',
                to: '/alerts'
            },
            {
                name: 'Profile',
                onClick: jest.fn()
            }
        ];
        const wrapper = shallow(<MenuBar menuItems={menuItems} />);
        expect(wrapper.find(MenuItem).length).toBe(2);
    });

    test('renders divider if a menuItem sets divide to true', () => {
        const menuItems = [
            {
                name: 'Alerts',
                to: '/alerts'
            },
            {
                name: 'Logout',
                divide: true
            }
        ];
        const wrapper = shallow(<MenuBar menuItems={menuItems} />);
        expect(wrapper.find(Divider)).toExist();
    });

    test("doesn't render a MenuItem if the condition is false", () => {
        const menuItems = [
            {
                name: 'Alerts',
                to: '/alerts'
            },
            {
                name: 'Logout',
                condition: false
            }
        ];
        const wrapper = shallow(<MenuBar menuItems={menuItems} />);
        expect(wrapper.find(MenuItem).length).toBe(1);
    });

    test('calls the passed function on the menu item and closes the menu', () => {
        const onClick = jest.fn();
        const handleMenuClose = jest.fn();

        const menuItems = [
            {
                name: 'Profile',
                onClick
            }
        ];
        const wrapper = shallow(<MenuBar menuItems={menuItems} handleMenuClose={handleMenuClose} />);
        wrapper.find(MenuItem).simulate('click');
        expect(handleMenuClose).toHaveBeenCalled();
        expect(onClick).toHaveBeenCalled();
    });
});
