import React, { Component } from 'react';
import './App.css';
import scriptLoader from 'react-async-script-loader'

class App extends Component {
  state={
    allMarkers : [
      {title: "Nasr City", location: {lat:30.05655, lng:31.329992}, content : "Nasr City"},
      {title: "Masr El Gdida", location: {lat:30.112315, lng:31.343851}, content : "Masr El Gdida"},
      {title: "El Tagamoa", location: {lat:30.008487, lng: 31.428476}, content : "El Tagamoa"},
      {title: "El ShekhZayed", location: {lat:30.049163, lng: 30.97616}, content : "El ShekhZayed"},
      {title: "Giza", location: {lat:30.013056, lng: 31.208853}, content : "Giza"},
      {title: "Sharm El Shekh", location: {lat:27.915817, lng: 34.329950}, content : "Sharm El Shekh"}  
    ] ,

    
  }
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      
        let map = new window.google.maps.Map(document.getElementById('map'),{
          center : {
                lat: 30.05655, 
                lng: 31.329992
          },
          zoom : 8
          
        });
        
        for(let i= 0; i < this.state.allMarkers.length; i++ ){

          let marker = new window.google.maps.Marker({
            position: this.state.allMarkers[i].location,
            map: map,
            title: this.state.allMarkers[i].title,
            animation: window.google.maps.Animation.DROP,
            info : this.state.allMarkers[i].content
          });

          let infoWindow = new window.google.maps.InfoWindow({
            content :  marker.info               
          })
          marker.addListener('click',function(){
            infoWindow.open(map,marker) ;   
          })  
        }
          
         

             
        
    }

  }

  render() {

    return (
      <div className="App">
      <div className='map'>
        <div id ='map' >
            
        </div>
      </div>
      </div>
    );
  }
}

export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyBg8qm6I5VQFNsCCdXZeHuK2Eqbpi_SgC4&v=3"])(App);
