import React, {useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'


import {fetchEvents} from '../redux/actions/eventActions'

function Home() {
    const dispatch = useDispatch();
    const events = useSelector(state => state.event.events);
    useEffect(() => {
        dispatch(fetchEvents());
    }); 

    return (
      <> 
        <Header/>
        <div className="container">
            <h2 className="text-center">List of all Events</h2>
            <div className="table-responsive">            
                <table className="table table-bordered table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Creator name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [...events].map((event, index)=>(
                                <tr key={event.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{`${event.first_name} ${event.last_name}`}</td>
                                    <td>{event.email}</td>
                                    <td>{event.date}</td>
                                    <td><Link className="btn btn-dark" to={`/view/${event.id}`}>View Event</Link></td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
        
        <Footer/>  
      </>
    )
}


Home.propTypes = {
    events: PropTypes.array,
};

export default Home