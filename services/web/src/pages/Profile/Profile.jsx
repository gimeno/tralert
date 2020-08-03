import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useAuth0 } from '../../utils/Auth0Context';
import LoadingButton from '../../components/LoadingButton/LoadingButton';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(3)
        }
    },
    saveButton: {
        marginRight: theme.spacing(1)
    }
}));

function Profile() {
    const classes = useStyles();
    const { t } = useTranslation();
    const { user } = useAuth0();
    const [editMode, setEditMode] = useState(false);

    return (
        <Paper elevation={3} className={classes.paper}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h4" align={'center'}>
                        {t('page.profile.title')}
                    </Typography>
                </Grid>
                <Grid container spacing={2} alignItems="center" item xs={12}>
                    <Grid item xs={12} md={6}>
                        <strong>{t('page.profile.name')}:</strong> {user.name}
                    </Grid>
                    {!editMode && (
                        <>
                            <Grid item xs={12} md={4}>
                                <span>
                                    <strong>{t('page.profile.email')}:</strong> {user.email}
                                </span>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
                                    {t('page.profile.edit-email')}
                                </Button>
                            </Grid>
                        </>
                    )}
                    {editMode && (
                        <Grid item xs={12} md={6}>
                            <Formik
                                initialValues={{
                                    email: user.email
                                }}
                                validationSchema={Yup.object({
                                    email: Yup.string()
                                        .email(t('page.profile.invalid-email'))
                                        .required(t('page.profile.required'))
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                    setSubmitting(false);
                                    setEditMode(false);
                                    console.log(JSON.stringify(values, null, 2));
                                }}
                            >
                                {({ submitForm, isSubmitting, errors, setFieldTouched }) => {
                                    return (
                                        <Form>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={12} md={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="email"
                                                        label={t('page.profile.email')}
                                                        variant={'outlined'}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid container item xs={12} md={6} direction="row" justify="flex-end">
                                                    <LoadingButton
                                                        className={classes.saveButton}
                                                        variant="contained"
                                                        color="primary"
                                                        loading={isSubmitting}
                                                        onClick={submitForm}
                                                    >
                                                        {t('page.profile.save')}
                                                    </LoadingButton>
                                                    <Button variant="contained" onClick={() => setEditMode(false)}>
                                                        {t('page.profile.cancel')}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Profile;
