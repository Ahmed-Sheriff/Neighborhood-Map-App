import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader'
import LocationList from './LocationList';
import './App.css';


class App extends Component {


  state = {
    // allMarkers : [
    //   {title: "Nasr City", location: {lat:30.05655, lng:31.329992}, content : "Nasr City"},
    //   {title: "Masr El Gdida", location: {lat:30.112315, lng:31.343851}, content : "Masr El Gdida"},
    //   {title: "El Tagamoa", location: {lat:30.008487, lng: 31.428476}, content : "El Tagamoa"},
    //   {title: "El ShekhZayed", location: {lat:30.049163, lng: 30.97616}, content : "El ShekhZayed"},
    //   {title: "Giza", location: {lat:30.013056, lng: 31.208853}, content : "Giza"},
    //   {title: "Sharm El Shekh", location: {lat:27.915817, lng: 34.329950}, content : "Sharm El Shekh"}  
    // ] ,

    allMarkers : []
 
  }

  componentDidMount(){
    fetch("https://api.foursquare.com/v2/venues/search?ll=27.2579,33.8116&client_id=NCUSJNELMTZK52IO4UXZDZTOXMDCGM1DZGO5NNP33BCZWX1Y&client_secret=K3CG2UZDUN4V2GBYLO5Z3PA0Q3GDW55R2X3LHBUHOA14R4VS&v=20180808").then(function(response){

      if(response.ok){
        debugger;
          response.json();
          this.setState({allMarkers : response});
        }
    }).catch(function(error){
            alert('There is error with Network ' + error );
        })
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      
        let map = new window.google.maps.Map(document.getElementById('map'),{
          center : {
                lat: 27.2579, 
                lng: 33.8116
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
            content : `<div className = 'infoWindow'><p>${marker.info}.${marker.position}</p></div>`                
          })
          marker.addListener('click',function(){
            infoWindow.open(map,marker) ;   
          })  
        }

      }

  } // End Component will receive props

 

  render() {

    return (
      <div className="App">
      <div className='map'>
        <div id ='map' >
            
        </div>
      </div> 
      {/* End ClassName map */}

      <LocationList allMarkersList = {this.state.allMarkers} links ={this.state.links}  />

      </div>
    );
  }
}

export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyBg8qm6I5VQFNsCCdXZeHuK2Eqbpi_SgC4&v=3"])(App);
