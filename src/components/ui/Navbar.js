import { AppBar, Button, Icon, Toolbar, Typography } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

    const dispatch = useDispatch();

    const { name } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <div className="mb-3">
            <AppBar position="static">
                <Toolbar>
                    <div className="d-flex align-items-center">
                        <Icon>person</Icon> <span className="ml-2"></span>

                        <Typography variant="h6">{ name }</Typography>
                    </div>
                                  
                    <div className="ml-auto">
                        <Button variant="contained" color="secondary" 
                                endIcon={<Icon>logout</Icon>} onClick={ handleLogout }
                        >Salir
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
