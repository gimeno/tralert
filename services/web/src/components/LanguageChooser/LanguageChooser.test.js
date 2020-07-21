import React from 'react';
import { shallow } from 'enzyme';
import { useTranslation } from 'react-i18next';
import { Button, MenuItem } from '@material-ui/core';
import LanguageChooser from './LanguageChooser';

jest.mock('react-i18next');

describe('<LanguageChooser />', () => {
    test('should menu options based on supported languages', () => {
        useTranslation.mockReturnValue({
            t: jest.fn(),
            i18n: { options: { supportedLngs: ['en'] } }
        });

        const wrapper = shallow(<LanguageChooser />);
        expect(wrapper.find(MenuItem).length).toBe(1);
    });

    test('should call changeLanguage upon clicking on an option', () => {
        const changeLanguage = jest.fn();
        useTranslation.mockReturnValue({
            t: jest.fn(),
            i18n: { changeLanguage, options: { supportedLngs: ['en'] } }
        });

        const wrapper = shallow(<LanguageChooser />);
        wrapper.find(Button).simulate('click', { currentTarget: {} });
        wrapper.find(MenuItem).simulate('click', { currentTarget: { lang: 'en' } });
        expect(changeLanguage).toHaveBeenCalledWith('en');
    });
});
