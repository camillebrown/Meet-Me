import React, { useState, useEffect } from 'react'
import authHeader from '../../utilities/authHeader.utilities'
import axios from 'axios'
import CommentsList from './CommentsList'
import CommentForm from './CommentForm'
import { saveComment } from '../../services/event.service'
import { useHistory } from "react-router-dom";
import Moment from 'react-moment';


const MyEvent = (params) => {
    let history = useHistory();
    const [event, setEvent] = useState('')
    const [comments, setComments] = useState([])
    const eventId = (params.match.params.id)

    useEffect(() => {
      axios.get(`http://localhost:8080/events/comments/${eventId}`, { headers: authHeader() })
      .then(res => {
        setEvent(res.data)
        setComments(res.data.comments)
      },(error) => {
        return (error)
      })
    }, [eventId])
    const addToList = (newComment) => {
        setComments([newComment, ...comments])
        history.push(`/event/comments/${eventId}`)
        window.location.reload()
    }
    const dateToFormat = event.date;
  return (
    <>
      <header className="jumbotron card header border-info text-center mb-3">
        <h2>
          <strong>{event.name}</strong>
        </h2>
      </header>
      <div className="card border-light bg-light mb-3">
        <h3 className="card-subtitle mb-2 text-muted">Venue: {event.location}</h3>
        <p className="card-text">Date: <Moment format="MM/DD/YYYY">{dateToFormat}</Moment></p> 
      
        < CommentsList 
            comments= {comments}
            eventId= {eventId}
        />
        <div className="card-footer">
          < CommentForm 
          eventId= {eventId}
          saveComment = {saveComment}
          addToList = {addToList}
          />
        </div>
      </div>
    </>
  )
}


export default MyEvent;