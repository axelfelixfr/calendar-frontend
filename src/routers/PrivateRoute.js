import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) => {

    // Al Route le pasamos todas sus props con el operador spread (...rest)
    // Si isAuthenticated esta en true, significa que esta autenticado, por lo tanto se puede mostrar el componente que quiere ver
    // Si isAuthenticated esta en false, significa que no esta autenticado, por lo tanto con el <Redirect /> de react-router lo manda al login para que inicie sesión
    return (
        <Route { ...rest }
                component={(props) => ((isAuthenticated) 
                                      ? (<Component { ...props }/>)
                                      : (<Redirect to='/auth' />)
                )}    
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
// Component lo declaramos como function en las propTypes ya que se trata de functional components