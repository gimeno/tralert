import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { Translate as LanguageIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    languageButtonText: {
        margin: theme.spacing(0, 0.5, 0, 1),
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block'
        }
    }
}));

function LanguageChooser() {
    const classes = useStyles();
    const { t, i18n } = useTranslation();
    const [languageMenu, setLanguageMenu] = useState(null);

    const supportedLanguages = useMemo(
        () => i18n.options.supportedLngs.filter((lang) => lang !== 'cimode'),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const handleLanguageIconClick = (event) => {
        setLanguageMenu(event.currentTarget);
    };

    const handleLanguageMenuClose = (event) => {
        if (event.currentTarget.lang) {
            i18n.changeLanguage(event.currentTarget.lang);
        }
        setLanguageMenu(null);
    };

    return (
        <>
            <Button color="inherit" onClick={handleLanguageIconClick}>
                <LanguageIcon />
                <span className={classes.languageButtonText}>{t(`component.language-chooser.${i18n.language}`)}</span>
                <ExpandMoreIcon fontSize="small" />
            </Button>
            <Menu anchorEl={languageMenu} open={Boolean(languageMenu)} onClose={handleLanguageMenuClose}>
                {supportedLanguages.map((language) => (
                    <MenuItem
                        key={language}
                        lang={language}
                        selected={i18n.language === language}
                        onClick={handleLanguageMenuClose}
                    >
                        {t(`component.language-chooser.${language}`)}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default LanguageChooser;
