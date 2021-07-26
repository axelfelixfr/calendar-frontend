import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { Link } from 'react-router-dom';
import CalendarIcon from '../../assets/calendar.svg';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStyles } from '../../helpers/useStyles';

export const LoginScreen = () => {
    
    // MaterialUI
    const classes = useStyles();

    const dispatch = useDispatch();

    // Validación
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'The password must be at least 8 letters long and include at least one capital letter and one number'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleLogin = (data) => {
        const { email, password } = data;

        dispatch(startLogin(email, password));
    }
    
    return (
        <>
          <img src={ CalendarIcon } alt="Calendario" height="40" width="40" />
          <Typography component="h1" variant="h5">
            Ingreso
          </Typography>
          <form className={ classes.form } noValidate onSubmit={ handleSubmit(handleLogin) }>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Correo electrónico"
              autoComplete="email"
              autoFocus
              name="email"
              error={ errors.email }
              { ...register("email") }
              helperText={ errors.email && errors.email?.message }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="password"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              name="password"
              error={ errors.password }
              helperText={ errors.password && errors.password?.message }
              { ...register("password") }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={ classes.submit }
            >
              Entrar
            </Button>
          </form>
          <Grid container>
              <Grid item>
                <Link to="/auth/register">¿Aún no te haz registrado? Crea una cuenta</Link>
              </Grid>
            </Grid>
        </>
    )
}