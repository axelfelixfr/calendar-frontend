import { CssBaseline, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { useStyles } from '../helpers/useStyles';

export const AuthRouter = () => {

    const classes = useStyles();
    
    return (
        <Grid container component="main" className={ classes.root }>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={ classes.image } />
            <Grid item xs={12} sm={8} md={5} component={ Paper } elevation={6} square>
                <div className="animate__animated animate__fadeIn">
                    <div className={ classes.paper }>
                        <Switch>
                            <Route exact path="/auth/login" component={ LoginScreen } />

                            <Route exact path="/auth/register" component={ RegisterScreen } />
                            
                            <Redirect to="/auth/login"/>
                        </Switch>               
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}