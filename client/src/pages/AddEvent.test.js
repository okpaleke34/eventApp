import React from "react";
import {createStore, applyMiddleware,compose} from "redux"
import {Provider} from "react-redux"
import {BrowserRouter as Router} from 'react-router-dom'
import { render, screen, fireEvent, cleanup,act } from '@testing-library/react';
import "@testing-library/jest-dom"
const middleware = [thunk]
import rootReducer from '../redux/reducers'

import thunk from 'redux-thunk'


import AddEvent from './AddEvent';

afterEach(cleanup)

const startingState = {event:{event:{}}}

function reducer(state = startingState, action){
    switch(action.type){
        case "SUCCESS_MESSAGE":
            return {
                ...state,
                sucMsg: ""
            } 
        case "ERROR_MESSAGE":
            return {
                ...state,
                errMsg: ""
            } 
        default:
            return state
    }
}

function renderWithRedux(
    component,
    {
        initialState, 
        store = createStore(
            reducer, 
            initialState,
            compose(applyMiddleware(...middleware))
        )
    }= {}
){
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    }
}

it('renders AddEvent component', () => {
    renderWithRedux(<Router><AddEvent /></Router>);
    const linkElement = screen.getByText(/Add an Event/i);
    expect(linkElement).toBeInTheDocument();
});
