import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const Home = () => {
  const element = <FontAwesomeIcon icon={faSearch} />
  const [eventData, setEventData] = useState([])
  const [searchWord, setSearchWord] = useState("soccer")

  // Store the searched keyword in our searchWord state
  const onChangeSearch = (e) => {
    const search = e.target.value
    setSearchWord(search)
  }

  const HandleSearch = (e) => {
    e.preventDefault()
    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=0wQvZLMQGzPOHkz1uaAlvIfQ8NQt8ZDe&size=20&keyword=${searchWord}`)
      .then((res) => {
        // console.log(res.data._embedded.events)
        setEventData(res.data._embedded.events)
      })
  }

  useEffect(() => {
    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=0wQvZLMQGzPOHkz1uaAlvIfQ8NQt8ZDe&size=21&keyword=${searchWord}`)
      .then((res) => {
        setEventData(res.data._embedded.events)
      })
  }, [])

  const display = () => (
    eventData.map((data, i) => {
      return (
          <div key={i} className="col-6 col-md-4">
            <div className="card api-card">
              <img src={data.images[6].url} className="card-img-top api-img" alt="Eagles Group"></img>
              <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text">{data._embedded.venues[0].name}<br></br><span>{data.dates.start.localDate}</span></p>
                <Link
                  to={{
                    pathname: `/events/${data.id}`,
                    state: { data }
                  }}
                  key={data.name}
                >
                  More Information
              </Link>
              </div>
            </div>
          </div>
      )
    })
  )

  return (
    <div className="container">
      <div className="row">
        <div className="title">
          <h1>Upcoming Events</h1>
        </div>
        <div className="search">
          <form onSubmit={HandleSearch} className="search-form">
            <label htmlFor="search" className="screen-reader-text"></label>
            <input id="search" type="search" className="search-input input-field" onChange={onChangeSearch} placeholder="Search New Event" ></input>
            <button className="search-button" id='submit-search'>Search <span className="fa-search">{element}</span></button>
          </form>
        </div>
        <hr className="line-break"></hr>
        {display()}
      </div>
    </div >
  );
};

export default Home;
