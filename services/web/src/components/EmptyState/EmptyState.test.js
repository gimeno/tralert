import React from 'react';
import { shallow } from 'enzyme';
import { Home as HomeIcon } from '@material-ui/icons';
import EmptyState from './EmptyState';

describe('<EmptyState />', () => {
    test('renders without crashing', () => {
        const wrapper = shallow(
            <EmptyState
                image={<HomeIcon />}
                title="Page doesn’t exist"
                description="The page you’re trying to access doesn’t exist"
                button={<HomeIcon />}
            />
        );
        expect(wrapper.find(HomeIcon).length).toBe(2);
    });
});
