import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventStartAddNew, eventClearActiveEvent, eventStartUpdate } from '../../actions/events';
import { DateTimePicker } from '@material-ui/pickers';
import { Button, Icon, TextField } from '@material-ui/core';

// Estilos para el modal sacados en la documentación npm del modal, "https://www.npmjs.com/package/react-modal"
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

// Establecemos el id de la aplicación para pasarle el elemento del modal 
Modal.setAppElement('#root');

// Creamos una constante para obtener el momento actual aunque redondeando los minutos y segundos con (.minutes(0).seconds(0))
// Con add(1, 'hours') agregamos una hora para el evento
const now = moment().minutes(0).seconds(0).add(1, 'hours');

const endEvent = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: endEvent.toDate()
}

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);

    const { activeEvent } = useSelector(state => state.calendar);
    
    const dispatch = useDispatch();

    // Al state dateStart le pasamos la constante now del momento actual y con el método toDate() obtenemos la fecha completa 
    const [, setDateStart] = useState(now.toDate())

    const [, setDateEnd] = useState(endEvent.toDate());

    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);

    const { title, notes, start, end } = formValues;

    useEffect(() => {
        if(activeEvent){
            setFormValues(activeEvent);
        } else {
            setFormValues(initEvent);
        }

    }, [activeEvent, setFormValues])

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
 
    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);
    }

    const handleStartDateChange = (e) => {
        setDateStart(e); // Cambiamos la fecha con el setDateStart pasandole el evento
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end);
        
        // Con isSameOrAfter() preguntamos si momentStart es igual o esta después de la fecha de momentEnd
        // Si esto es así, se trata de un error, y no debería de enviarse el formulario
        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire('Error', 'La fecha final debe ser mayor a la fecha de inicio', 'error');
        }
        
        if(title.trim().length < 2){
            return setTitleValid(false);
        }

        if(activeEvent){
            dispatch(eventStartUpdate(formValues));
        } else {
            dispatch(eventStartAddNew(formValues));
        }

        setTitleValid(true);
        closeModal();
    } 

    return (
        <Modal
            isOpen={ modalOpen }
            // onAfterOpen={afterOpenModal}
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1 className="animate__animated animate__backInLeft"> { (activeEvent) ? 'Editar evento' : 'Nuevo evento' } </h1>
            <hr />
            <form id="eventoSubmit" 
                  className="container animate__animated animate__fadeInUp animate__fast"
                  onSubmit={ handleSubmitForm } autoComplete="off"          
            >

                <DateTimePicker
                    label="Fecha y hora inicio"
                    inputVariant="outlined"
                    value={start}
                    onChange={handleStartDateChange}
                    format="DD/MM/YYYY hh:mm a"
                    fullWidth
                />

                <div className="my-3">
                    <DateTimePicker
                        label="Fecha y hora fin"
                        inputVariant="outlined"
                        value={end}
                        onChange={handleEndDateChange}
                        format="DD/MM/YYYY hh:mm a"
                        fullWidth
                        minDate={start}
                    />
                </div>

                <div className="mb-3">
                    <TextField
                        required
                        name="title"
                        label="Título"
                        helperText="Una descripción corta"
                        variant="outlined"
                        error={!titleValid}
                        value={ title }
                        onChange={ handleInputChange }
                        fullWidth
                    />
                </div>
                                                    
                <div className="mb-3">
                    <TextField
                        label="Notas"
                        name="notes"
                        multiline
                        helperText="Información adicional"
                        maxrows={8}
                        rows={5}
                        variant="outlined"
                        value={ notes }
                        onChange={ handleInputChange }
                        fullWidth
                    />
                </div>
                                                            
                <div className="text-center">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        endIcon={<Icon>send</Icon>}
                    >Guardar</Button>
                </div>
                                                        
            </form>
      </Modal>
    )
}
