import React from 'react';
import { shallow } from 'enzyme';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './Theme';

jest.mock('react-i18next');

describe('<Theme />', () => {
    test('should create a theme with the specified locale', () => {
        useTranslation.mockReturnValue({
            i18n: { options: { supportedLngs: ['en'] } }
        });

        const wrapper = shallow(
            <Theme>
                <br />
            </Theme>
        );
        const themeProp = wrapper.find(ThemeProvider).prop('theme');
        expect(themeProp).toHaveProperty('props', {});
        // expect(wrapper.find(ThemeProvider)).toHaveProp('theme', { props: {} });
    });
});
