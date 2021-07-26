import React from 'react'
import { useDispatch } from 'react-redux';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';
import { Link } from 'react-router-dom';
import CalendarIcon from '../../assets/calendar.svg';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStyles } from '../../helpers/useStyles';

export const RegisterScreen = () => {
    // MaterialUI
    const classes = useStyles();

    const dispatch = useDispatch();

    // Validación
    const schema = yup.object().shape({
        name: yup.string().min(4).max(30).required().matches(/^[a-zA-Z\s\xE1\xE9\xED\xF3\xFA\xC1\xC9\xCD\xD3\xDA]{3,}$/, 'Must be only letters'),
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'The password must be at least 8 letters long and include at least one capital letter and one number'),
        passwordConfirm: yup.string().oneOf([yup.ref('password'), null], "passwords don't match!")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleRegister = (data) => {
        const { name, email, password, passwordConfirm } = data;

        if(password !== passwordConfirm){
            return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error');
        }

        dispatch(startRegister(name, email, password));
    }
    
    
    return (
        <>
          <img src={ CalendarIcon } alt="Calendario" height="40" width="40" />
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
            <form className={ classes.form } noValidate onSubmit={ handleSubmit(handleRegister) }>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Nombre"
                            autoFocus
                            name="name"
                            { ...register("name") }
                            error={ errors.name }
                            helperText={ errors.name && errors.name?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            autoComplete="email"
                            name="email"
                            { ...register("email") }
                            error={ errors.email }
                            helperText={ errors.email && errors.email?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            name="password"
                            { ...register("password") }
                            error={ errors.password }
                            helperText={ errors.password && errors.password?.message }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Confirmar contraseña"
                            type="password"
                            id="passwordConfirm"
                            autoComplete="current-password"
                            name="passwordConfirm"
                            { ...register("passwordConfirm") }
                            error={ errors.passwordConfirm }
                            helperText={ errors.passwordConfirm && errors.passwordConfirm?.message }
                        />
                    </Grid>
                </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={ classes.submit }
                        >Registrarse
                    </Button>
            </form>
          
          <Grid container>
              <Grid item>
                <Link to="/auth/login">¿Ya estás registrado? Ingresa aquí</Link>
              </Grid>
          </Grid>
        </>
    )
}
