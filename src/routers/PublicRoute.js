import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({isAuthenticated, component: Component, ...rest}) => {

    // Pasamos las props de Route con el operador spread (...rest)
    // Ahora hacemos la negación de isAuthenticated con "!isAuthenticated"
    // Para que saber si puede ver las rutas públicas o no
    // Si isAuthenticated esta en true entonces que lo redireccione a '/' que es una ruta privada
    // Si no esta autenticado entonces que muestre el componente que se le pase por las props, que
    // en este caso sería AuthRouter
    
    return (
        <Route { ...rest }
                component={(props) => ((isAuthenticated) 
                                      ? (<Redirect to='/' />)
                                      : (<Component { ...props }/>)
                )}    
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
// Component lo declaramos como function en las propTypes ya que se trata de functional components