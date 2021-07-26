import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer  }  from 'react-big-calendar';
import moment from 'moment';
import { messages } from '../../helpers/calendar-messages-es';
import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es-mx'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    // Obtenemos tanto los eventos (events) como si esta activado (activeEvent) a través del useSelector de react-redux
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { uid } = useSelector(state => state.auth);


    // Almacenamos el última vista del calendario (dia, semana, mes) en el localStorage para recordar la última vez donde estuvo el usuario
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch])


    // Con el onDoubleClickEvent del componente <Calendar /> podemos hacer un dispatch para abrir el modal
    const onDoubleClick = () => {
        dispatch(uiOpenModal());
    }

    // Con el onSelectEvent del componente <Calendar /> podemos hacer un dispatch para activar el evento seleccionado
    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        // El e (event) sería la vista actual donde esta el usuario, por ejemplo: día, semana, mes, etc
        setLastView(e);

        // Almacenamos esa vista en el localStorage para recordarlo si es que ingresa nuevamente
        localStorage.setItem('lastView', e);
    }

    // Con el onSelectSlot del componente <Calendar /> podemos hacer un dispatch para limpiar el evento activo
    const onSelectSlot = () => {
        // La action eventClearActiveEvent sirve cuando se borra algun evento, se debe borrar de igual forma su activación
        dispatch(eventClearActiveEvent());
    }

    const eventStyleGetter = (event, start, end, isSelected) => {


        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#303C43',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <div className="d-flex flex-column calendar-screen">
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />
            {
                (!activeEvent) && <AddNewFab />
            }
            
            {
                (activeEvent) && <DeleteEventFab />
            }
            

            <CalendarModal />
        </div>
    )
}
