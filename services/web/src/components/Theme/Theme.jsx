import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { enUS, esES } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const LOCALES = {
    en: enUS,
    es: esES
};

function Theme(props) {
    const { i18n } = useTranslation();
    const [language, updateLanguage] = useState(i18n.language);

    useEffect(() => {
        i18n.on('languageChanged', updateLanguage);
        return () => {
            i18n.off('languageChanged', updateLanguage);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const theme = createMuiTheme({}, LOCALES[language]);

    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

export default Theme;
