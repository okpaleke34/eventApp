import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

import {addNewEvent} from '../redux/actions/eventActions'


function AddEvent(){
    const dispatch = useDispatch();
    var {errMsg,sucMsg} = useSelector(state => state.event);
    const [addBtnClick, setAddBtnClick] = useState(false);
    useEffect(() => {
        if(sucMsg && addBtnClick){
            alert("Success: Event created successfully")
            window.location = "/"
        }
        if(errMsg && addBtnClick){
            alert("Error: "+errMsg)    
        } 
    }, [errMsg,sucMsg,addBtnClick]); 

    const [data,setData] = useState({
		first_name:"",
		last_name:"",
		email:"",
		date:"",
    })
    
	//changing the value of input will be updating the state with the values
	const onChange = (e) =>{
        e.persist()
        setData(prev =>({...prev,[e.target.name]:e.target.value}))
	}
	// submitting search result will go to the link of search keyword or visit search page if keyword isnt from database
	const onSubmit = async (e) =>{
		e.preventDefault();
        const {first_name,last_name,email,date} = data;
        await dispatch(addNewEvent({first_name,last_name,email,date} ))
        setAddBtnClick(true)
	}
    return (
        <> 
            <Header/>
                <div className="container">
                    <div className="card mt-5">
                        <div className="card-header h4"> Add an Event</div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" className="form-control" id="firstName" name="first_name" testid="first_name" onChange={onChange} placeholder="First Name" required/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" className="form-control" id="lastName" name="last_name" testid="last_name" onChange={onChange} placeholder="Last Name" required/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-8">
                                        <label htmlFor="inputEmail">Email</label>
                                        <input type="email" className="form-control" id="inputEmail" name="email" onChange={onChange} placeholder="Email" required/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputDate">Event Date</label>
                                        <input type="date" className="form-control" id="inputDate" name="date" onChange={onChange} required/>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-dark">Create Event</button>
                            </form>
                        </div>
                    </div>
                </div>
            <Footer/>  
        </>
    )
}

AddEvent.propTypes = {
    sucMsg:PropTypes.string,
    errMsg:PropTypes.string,
};

export default AddEvent