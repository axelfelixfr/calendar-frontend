import { Fab, Icon } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const modalOpenButton = () => {
        dispatch(uiOpenModal());
    }

    return (
        <div className="fab">
            <Fab color="primary" aria-label="add" onClick={ modalOpenButton }>
                <Icon>add</Icon>
            </Fab>
        </div>
    )
}
