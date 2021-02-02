import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'

const API_URL = "http://localhost:8080/"

// function to save a new Event
export const save = (eventId, name, date, location) => {
    return axios.post(API_URL + 'profile/myevents/addevent', {
        eventId,
        name,
        date,
        location
    }, { headers: authHeader() })
}


// pull events from local database
export const seeEvent = () => {
    return axios.get(API_URL + 'profile/myevents/')
}

// delete events from the database
export const deleteEvent = (eventId) => {
    console.log(eventId)
    axios.delete(API_URL + 'profile/myevents/'+ eventId, {
        eventId: eventId 
    }, {headers: authHeader()}).then ((res)=>{
        return res
    })
}

// delete comment from the event and comment database
export const deleteComment = (name, content, id) => {
    return axios.delete(API_URL + 'events/comment/' + id, {
        name,
        content
    }, { headers: authHeader() })
}


// save comment to the event and comment database
export const saveComment = (eId, cId, name, content) => {
    return axios.post(`${API_URL}events/newcomment/${eId}`, {
        _id: cId,
        name: name,
        content: content
    }, {headers: authHeader()})
}

// update comment in the event and comment database
export const updateComment = (name, content, commentId, eventId) => {
    return axios.put(API_URL + 'event/comments/' + eventId, {
        name,
        content,
        commentId,
        eventId
    }, { headers: authHeader() })
}
