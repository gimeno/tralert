import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { enUS, esES } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function Theme(props) {
    const { i18n } = useTranslation();
    const [language, updateLanguage] = useState(i18n.language);

    const locales = {
        en: enUS,
        es: esES
    };

    useEffect(() => {
        i18n.on('languageChanged', updateLanguage);
        return () => {
            i18n.off('languageChanged', updateLanguage);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const theme = createMuiTheme({}, locales[language]);

    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

export default Theme;
