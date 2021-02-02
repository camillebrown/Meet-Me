import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import authHeader from '../utilities/authHeader.utilities'
import { deleteEvent } from "../services/event.service"
import { useHistory } from "react-router-dom";


function Calendar() {
  let history = useHistory();
  const [savedEvents, setSavedEvents] = useState([])

  const deleteSavedEvent = (e) => {
    let res = deleteEvent(e.target.parentNode.id)
    history.push('/calendar')
    window.location.reload()
    console.log(res)
  }

  useEffect(() => {
    axios.get("http://localhost:8080/profile/myevents", { headers: authHeader() })
      .then((res) => {
        setSavedEvents(res.data)
      })
  }, [])

  const display = () => (
    savedEvents.map((event, i) => {
      return (
        <div key={i} className="col-6 col-md-4">
          <div className="card cal-card">
            <div id={event._id} className="card-body">
              <h5 className="card-title cal-title">{event.name}</h5>
                  <Link
                    to={{
                      pathname: `/event/comments/${event._id}`
                    }}
                  >
                    CHECK OUT MORE!
              </Link>
                <button className="btn-cal" onClick={deleteSavedEvent}>DELETE EVENT</button>
              </div>
            </div>
          </div>
      )
    })
  )

  return (
    <div className="container">
      <div className="row">
        <h1 className="calender-title">My Calendar of Events</h1>
        <hr className="line-break"></hr>
        {display()}
      </div>
    </div>
  )

}

export default Calendar