import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'


import {fetchEventDetails, deleteEvent} from '../redux/actions/eventActions'


function Event(props){
    const dispatch = useDispatch();
    var {event,errMsg,sucMsg} = useSelector(state => state.event);
    const [delBtnClick, setDelBtnClick] = useState(false);
    useEffect(() => {
        let {id} = props.match.params
        dispatch(fetchEventDetails(id));
        if(sucMsg && delBtnClick){
            alert("Success: "+sucMsg)
            window.location = "/"
        }
        if(errMsg && delBtnClick){
            alert("Error: "+errMsg)     
        } 
    }, [sucMsg]); 

    function deleteEventClick(id){        
        if(window.confirm('Are you sure you want to delete this event?')){
            dispatch(deleteEvent(id));
            setDelBtnClick(true)
        }
	}

    const {id,first_name,last_name,email,date,createdAt,updatedAt} = event
    return (
        <> 
            <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 mt-5">
                            
                            <div className="alert alert-danger" role="alert" style={{display:!errMsg?'none':'block'}}>
                                {errMsg}
                            </div>
                            <div style={{display:errMsg?'none':'block'}}>
                                <h4> Event Details <button className="btn btn-danger btn-sm float-right"  onClick={()=>deleteEventClick(id)} >&times; Delete Event</button></h4>
                                <ul className="list-group w-100">
                                    <li className="list-group-item">Creator name: {first_name} {last_name}</li>
                                    <li className="list-group-item">Email Address: {email}</li>
                                    <li className="list-group-item">Date: {date}</li>
                                    <li className="list-group-item">Date Added: {createdAt}</li>
                                    <li className="list-group-item">Last modified: {updatedAt}</li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            <Footer/>  
        </>
    )
}

Event.propTypes = {
    event: PropTypes.object,
    sucMsg:PropTypes.string,
    errMsg:PropTypes.string,
};

export default Event