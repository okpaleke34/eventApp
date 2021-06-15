import React from "react";
import {createStore, applyMiddleware,compose} from "redux"
import {Provider} from "react-redux"
import {BrowserRouter as Router} from 'react-router-dom'
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom"
const middleware = [thunk]
import rootReducer from '../redux/reducers'

import thunk from 'redux-thunk'


import Home from './Home';

afterEach(cleanup)

const startingState = {event:{events:[]}}

function reducer(state = startingState, action){
    switch(action.type){
        case "FETCH_EVENTS":
            return {
                ...state,
                events: [{first_name:"John",last_name:"Doe",email:"okpalk@fjs.com",date:"2021-01-01"}]
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

it('renders home component', () => {
    renderWithRedux(<Router><Home /></Router>);
    const linkElement = screen.getByText(/List of all Events/i);
    expect(linkElement).toBeInTheDocument();
});
