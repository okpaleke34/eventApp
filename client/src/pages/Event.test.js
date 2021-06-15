import React from "react";
import {createStore, applyMiddleware,compose} from "redux"
import {Provider} from "react-redux"
import {BrowserRouter as Router} from 'react-router-dom'
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom"
const middleware = [thunk]
import rootReducer from '../redux/reducers'

import thunk from 'redux-thunk'


import Event from './Event';

afterEach(cleanup)

const startingState = {event:{event:{}}}

function reducer(state = startingState, action){
    switch(action.type){
        case "FETCH_EVENT":
            return {
                ...state,
                event: {
                    "id": 2,
                    first_name: "Jane",
                    last_name: "",
                    email: "ladi@gmail.com",
                    date: "2021-02-09",
                    createdAt: "2021-06-11T18:35:41.000Z",
                    updatedAt: "2021-06-11T18:35:41.000Z"
                }
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

it('renders Event component', () => {
    let props = {match:{params:{id:1}}}
    renderWithRedux(<Router><Event key={props.match.params.id} {...props} /></Router>);
    const linkElement = screen.getByText(/Event Details/i);
    expect(linkElement).toBeInTheDocument();
});


it("Can delete event", () => {
    window.confirm = jest.fn(() => true) 
    let props = {match:{params:{id:1}}}
    const {getByText} = renderWithRedux(<Router><Event key={props.match.params.id} {...props} /></Router>);
    fireEvent.click(getByText("× Delete Event"))
    expect(window.confirm).toBeCalled() 
});
