import React, { useState }from 'react'
import './App.css'
import NavigationBar from './Components/NavigationBar'
import AddArtistForm from './Components/AddArtistForm'
import Hamburger from './Components/Hamburger'
import ArtistInfoObj from './Components/ArtistInfoObj'
import ArtistHeader from './Components/ArtistHeader'

const App = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [events, setEvents] = useState([
    {
      id: '1',
      artist: 'illenium',
      date: '07/30/2021',
      location: 'Seattle, WA',
    }
  ]);
  const queueEvent = (event) => {
    console.log(event)
    const id = Math.floor(Math.random() * 10000) + 1
    const newEvent = { id, ...event }
    setEvents([...events, newEvent])
  }

  return (
    <div className="App">
      <div className='BurgerBox'>
      <Hamburger onAdd={() => setShowAddForm(!showAddForm)} />
      {showAddForm && <AddArtistForm onQueue={queueEvent} />}
      </div>
      <div className='NavInfo'>
      <NavigationBar />
      <ArtistHeader />
      <ArtistInfoObj events={events}/>
      </div>
    </div>
  );
}

export default App;
