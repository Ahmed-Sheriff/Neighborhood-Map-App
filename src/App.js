import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader'
import LocationList from './LocationList';
import escapeRegExp from 'escape-string-regexp';
import './App.css';

// Define an array globally to put created markers into it  
let markersArr = [];

// Define the map variable golbally 
let map;

class App extends Component {

  state = {
   
    allMarkers : [],

    query : '',

    menu : [] ,

    markerIcon : true
    
  }

  componentDidMount(){
    fetch("https://api.foursquare.com/v2/venues/search?ll=24.0889,32.8998&intent=browse&limit=16&radius=10000&query=restaurant&client_id=NCUSJNELMTZK52IO4UXZDZTOXMDCGM1DZGO5NNP33BCZWX1Y&client_secret=K3CG2UZDUN4V2GBYLO5Z3PA0Q3GDW55R2X3LHBUHOA14R4VS&v=20180808").then(function(response){
        
          return response.json();        
    }).then((data)=>{
      this.setState({allMarkers: data.response.venues})
     console.log('allMarkers data ' + this.state.allMarkers)
    }).catch(function(error){
            alert('There is error with Network ' + error );
        })

  } // End component did mount
  
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
  
      if(isScriptLoadSucceed) {

         map = new window.google.maps.Map(document.getElementById('map'),{
          center : {
                lat: 24.0889, 
                lng: 32.8998
          },
          zoom : 14 
          
        });

           // Create an info window
           let infoWindow = new window.google.maps.InfoWindow();

           // Event to close infoWindow when clicking on the map 
           map.addListener('click', function() {
             infoWindow.close(); 
           });
        
          //var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

           // Create markers and looping over them to display them on the map  
          for(let i= 0; i < this.state.allMarkers.length; i++ ){

              let marker = new window.google.maps.Marker({
              position: this.state.allMarkers[i].location,
              id : this.state.allMarkers[i].id ,
              title : this.state.allMarkers[i].name,
              map: map,  
              animation: window.google.maps.Animation.DROP,
            });
            
            markersArr.push(marker);

            marker.addListener('click',function(){
              infoWindow.setContent(`<div class = 'infoWindow'><p>${marker.title} </p></div>`)
              infoWindow.open(map,marker) ;
              toggleBounce();
            })

            function toggleBounce() {
              if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
              } else {
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
              }
            }
        }
                     
         console.log('markersArr ' + markersArr)
          // End Create markers and looping over them to display them on the map

          let listName = this.state.allMarkers.map(place => place.name);
          this.setState({menu : listName})
      }
        else {
          alert('Error : Script not loaded');
        }
        
    } // Script Loaded
       
  } // End Component will receive props

  
    // Function to Filter both list menu and markers  
      filteredMarkerAndMenu = (query) => {
        const matching = new RegExp(escapeRegExp(query), 'i');
        let listNames = this.state.allMarkers.filter((place) => matching.test(place.name));
        // Here listNames is an array of objects that match query search I need names only so I filtered them and returns names only
        let placeName = listNames.map(place => place.name)
        if (listNames) {
          //Here I loop over marker array original one and make comparing between markers + placesname
          markersArr.map(marker => {
            placeName.includes(marker.title) ? marker.setMap(map) : marker.setMap(null)
          })
          this.setState({ menu: placeName })
  
        }
        else {
          this.setState({ menu: this.state.allMarkers.map(place => place.name) })
        }
      }
    
    
  render() {

    return (
      <div className="App" >
       <section id = 'navigation' aria-label = 'navigation'>
        <nav className = 'heading' aria-labelledby = 'header'>
        <header id='header'>Aswan</header>
        </nav>
      </section>

     
        <div id ='map' role= 'application' aria-label = 'location' >
            
        </div>
      
      {/* End ClassName map */}


      <LocationList allMarkers = {this.state.allMarkers} markersArr={markersArr} menu = {this.state.menu}
                    filteredMarkerAndMenu = {this.filteredMarkerAndMenu}
      />

        <footer><span>Ahmed Sherif</span></footer>

      </div>
    );
  }
}

export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyBg8qm6I5VQFNsCCdXZeHuK2Eqbpi_SgC4&v=3"])(App);
