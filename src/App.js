import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader'
import LocationList from './LocationList';
// import escapeRegExp from 'escape-string-regexp';
import './App.css';

// Define an array to put created marker into it 
let markers = [];

class App extends Component {

  state = {
   
    allMarkers : [],

    //filteredList : []

  }

  componentDidMount(){
    fetch("https://api.foursquare.com/v2/venues/search?ll=24.0889,32.8998&intent=browse&limit=16&radius=10000&query=restaurant&client_id=NCUSJNELMTZK52IO4UXZDZTOXMDCGM1DZGO5NNP33BCZWX1Y&client_secret=K3CG2UZDUN4V2GBYLO5Z3PA0Q3GDW55R2X3LHBUHOA14R4VS&v=20180808").then(function(response){

      if(response.ok){
         return response.json();
        }
    }).then((data)=>{
      this.setState({allMarkers: data.response.venues})
    }).catch(function(error){
            alert('There is error with Network ' + error );
        })

  } // End component did mount
  
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
  
        let map = new window.google.maps.Map(document.getElementById('map'),{
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
 
           // Create markers and looping over them to display them on the map  
           for(let i= 0; i < this.state.allMarkers.length; i++ ){

              let marker = new window.google.maps.Marker({
              position: this.state.allMarkers[i].location,
              id : this.state.allMarkers[i].id ,
              title : this.state.allMarkers[i].name,
              map: map,
              animation: window.google.maps.Animation.DROP
            });

              markers.push(marker);
            
              marker.addListener('click',function(){

                infoWindow.setContent(`<div class = 'infoWindow'><p>${marker.title} </p></div>`)
                infoWindow.open(map,marker) ;

              })   
          
            } 

          console.log(markers);
         
          // End Create markers and looping over them to display them on the map
          function openInfoWindowFromList (){
            window.google.maps.event.trigger(markers, 'click');
          }
          //Function when you click on one of the list item the info window opens 
            
    } // Script Loaded
         
  } // End Component will receive props

  render() {

    return (
      <div className="App" >
       <section id = 'navigation' aria-label = 'navigation'>
        <nav className = 'heading' aria-labelledby = 'header'>
        <header id='header'>Aswan</header>
        </nav>
      </section>

     
        <div id ='map' rol= 'application' aria-label = 'location' >
            
        </div>
      
      {/* End ClassName map */}

      <LocationList allMarkersList = {this.state.allMarkers} query = {this.state.query}
                    // searchFilter = {(query)=>this.searchFilter(query.event.target.value)}
                   openInfoWindowFromList = {this.openInfoWindowFromList}
      />

      </div>
    );
  }
}

export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyBg8qm6I5VQFNsCCdXZeHuK2Eqbpi_SgC4&v=3"])(App);
