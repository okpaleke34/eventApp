import c from '../actions/event.types'

const initialState = {
    events: [],
    event:{},
    errMsg:"",
    sucMsg:""
}

const eventReducer = (state = initialState, action) =>{
    switch(action.type){
        case c.FETCH_EVENTS:
            return {
                ...state,
                events: action.payload
            }        
        case c.FETCH_EVENT_DETAILS:
            return {
                ...state,
                event: action.payload
            }      
        case c.ERROR_MESSAGE:
            return {
                ...state,
                errMsg: action.payload
            }     
        case c.SUCCESS_MESSAGE:
            return {
                ...state,
                sucMsg: action.payload
            } 
        default:
            return state
    }
}

export default eventReducer