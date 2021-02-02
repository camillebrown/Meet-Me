import React, { useState } from 'react'
import { save } from '../services/event.service'
import { useHistory } from "react-router-dom";
import Moment from 'react-moment';

const Event = (props) => {
    let history = useHistory();
    const [content, setContent] = useState(props.location.state.data)
    const handleSave = (e) => {
        e.preventDefault()
        save(
            content.id,
            content.name,
            content.dates.start.localDate,
            content._embedded.venues[0].name
        )
        history.push('/calendar')
        window.location.reload()
    }
    const dateToFormat = content.dates.start.localDate;

    return (
        <div>
            <div className="col s6">
                <div id="all-info" className="card-panel teal lighten-2">
                    <div className="card-content white-text">
                        <header className="jumbotron card header border-info text-center mb-3">
                            <h2>
                                <strong>{content.name}</strong>
                            </h2>
                        </header>
                        <hr className="event-line-break"></hr>
                        <div className="event-content">
                            <div className="column">
                                <img src={content.images[0].url} className="api-event-img" alt="Main Event Promotion"></img>
                            </div>
                            <div className="column">
                                <p className="event-header">Event Details:</p>
                                <p><span className="event-info">Date: </span><Moment format="MM/DD/YYYY">{dateToFormat}</Moment></p>
                                <p><span className="event-info">Venue Name: </span>{content._embedded.venues[0].name}</p>
                                <p><span className="event-info">Location: </span>{content._embedded.venues[0].city.name},{content._embedded.venues[0].country.name}</p>
                                <p><span className="event-info">Genre: </span>{content.classifications[0].genre.name}</p>
                                <p>{content.info}</p>
                                <form method="POST" onSubmit={handleSave} className="addCal-btn">
                                    <input hidden type="text" name="eventId" value={content.eventId} />
                                    <input hidden type="text" name="name" value={content.name} />
                                    <input hidden type="text" name="date" value={content.dates.start.localDate} />
                                    <input hidden type="text" name="location" value={content._embedded.venues[0].name} />
                                    <button className='btn btn-primary btn btn-info'>Add to Calendar</button>
                                </form>
                                <a className="ticket" href={content.url}>Check It Out on Ticketmaster!</a>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Event
