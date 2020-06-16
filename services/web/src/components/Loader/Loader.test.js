import React from 'react';
import { shallow } from 'enzyme';
import { CircularProgress } from '@material-ui/core';
import Loader from './Loader';

describe('<Loader />', () => {
    test("sets CircularProgress' size prop", () => {
        const wrapper = shallow(<Loader loaderSize={80} />);
        expect(wrapper.find(CircularProgress)).toExist();
        expect(wrapper.find(CircularProgress)).toHaveProp('size', 80);
    });
});
