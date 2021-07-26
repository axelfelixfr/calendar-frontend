import { Button, Icon } from '@material-ui/core';
import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(eventStartDelete());
    }

    return (
        <div className="fab-danger">
            <Button
                variant="contained"
                color="secondary"
                onClick={ handleDelete }
                endIcon={<Icon>delete</Icon>}
            >Borrar
            </Button>
        </div>
    )
}
