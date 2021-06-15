import c from './event.types'
const link = c.API_LINK

//fetch all events by option
export const fetchEvents = () => dispatch =>{
    fetch(`${link}/`)
    .then(res => res.json())
    .then(body => { 
        if(body.success){
            dispatch({
                type: c.FETCH_EVENTS,
                payload:body.data
            })
        }
        else{
            dispatch({
                type: c.ERROR_MESSAGE,
                payload:body.message 
            })     
            console.error('There was an error!', body.message);
        }
    })    
    .catch(error => {
        dispatch({
            type: c.ERROR_MESSAGE,
            payload: error.toString() 
        })     
        console.error('There was an error!', error);
    });
}

//fetch an event
export const fetchEventDetails = (id) => dispatch =>{
    fetch(`${link}/view/${id}`)
    .then(async res => {
        const body = await res.json();
        // check for error response
        if (!res.ok || !body.success) {
            // get error message from body or default to response status
            const error = (body && body.message) || res.status;
            return Promise.reject(error);
        }
        dispatch({
            type: c.FETCH_EVENT_DETAILS,
            payload:body.data
        })
    })    
    .catch(error => {
        dispatch({
            type: c.ERROR_MESSAGE,
            payload: error.toString()
        })     
        console.error('There was an error!', error);
    });
}

//Add new event
export const addNewEvent = (data) => dispatch =>{
    // POST request using fetch with error handling
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch(`${link}/add`, requestOptions)
    .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const body = isJson && await response.json();

        // check for error response
        if (!response.ok || !body.success) {
            // get error message from body or default to response status
            const error = (body && body.message) || response.status;
            return Promise.reject(error);
        }
        dispatch({
            type: c.SUCCESS_MESSAGE,
            payload:"EVent added successfully"
        })
    })
    .catch(error => {
        dispatch({
            type: c.ERROR_MESSAGE,
            payload: { errorMessage: error.toString() }
        })        
        console.error('There was an error!', error);
    });
}

//Delete an event
export const deleteEvent = (id) => dispatch =>{
    fetch(`${link}/delete/${id}`, { method: 'DELETE' })
    .then(async res => {
        const body = await res.json();
        // check for error response
        if (!res.ok || !body.success) {
            // get error message from body or default to response status
            const error = (body && body.message) || res.status;
            return Promise.reject(error);
        }
        dispatch({
            type: c.SUCCESS_MESSAGE,
            payload:body.message
        }) 
               
    })
    .catch(error => {
        dispatch({
            type: c.ERROR_MESSAGE,
            payload: error.toString()
        })     
        console.error('There was an error!', error);
    });


}