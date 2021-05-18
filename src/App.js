import React from 'react'
import './App.css'
import NavigationBar from './Components/NavigationBar'
import ArtistInfo from './Components/ArtistInfo'

const App = () => {
  return (
    <div className="App">
      <NavigationBar />
      <ArtistInfo  />
    </div>
  );
}

export default App;
