import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { CalendarScreen } from './../components/calendar/CalendarScreen';
import { startChecking } from './../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import "moment/locale/es-mx";
import { AuthRouter } from './AuthRouter';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { useStyles } from '../helpers/useStyles';

moment.locale("es-mx");

export const AppRouter = () => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const { checking, uid } = useSelector(state => state.auth)

    useEffect(() => {
        
        dispatch(startChecking());
    
    }, [dispatch]);

    if(checking){
        return (
            <Backdrop className={ classes.backdrop } open={ checking }>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute isAuthenticated={ !!uid } path="/auth"  component={ AuthRouter }/>

                    <MuiPickersUtilsProvider libInstance={ moment } utils={ MomentUtils }>
                        <PrivateRoute isAuthenticated={ !!uid } exact path="/" component={ CalendarScreen } />
                    </MuiPickersUtilsProvider>

                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    )
}
