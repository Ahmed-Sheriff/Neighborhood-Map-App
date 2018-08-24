import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader'
import Header from './Header';
import LocationList from './LocationList';
import Footer from './Footer';
import escapeRegExp from 'escape-string-regexp';
import './App.css';

class App extends Component {
  state = {
    venues: [],
    markers: [],
    query: '',
    menu: [],
    map: null
  }

  componentDidMount() {
    //handleing  googlemaps error
    window.gm_authFailure = () => {
      alert('google maps error')
    }

    fetch("https://api.foursquare.com/v2/venues/search?ll=24.0889,32.8998&intent=browse&limit=16&radius=10000&query=restaurant&client_id=NCUSJNELMTZK52IO4UXZDZTOXMDCGM1DZGO5NNP33BCZWX1Y&client_secret=K3CG2UZDUN4V2GBYLO5Z3PA0Q3GDW55R2X3LHBUHOA14R4VS&v=20180808")
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw Error('api failed')
    }).then((data) => {
      this.setState({ venues: data.response.venues }, () => {
        // If the menu items are not set yet, create map and markers
        if (this.state.menu.length === 0) {
          this.createMapAndMarkers()
        }
      })
    }).catch(function (error) {
      alert('There is error with Network ' + error);
    })
  } // End component did mount

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    // Only continue if script loaded, venues loaded, and menu has not been set already
    if (isScriptLoaded && !this.props.isScriptLoaded && this.state.venues.length > 0 && this.state.menu.length === 0) {
      if (isScriptLoadSucceed) {
        this.createMapAndMarkers()
      } else {
        alert('Error : Script not loaded');
      }
    } // Script Loaded
  } // End Component will receive props

  createMapAndMarkers() {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 24.0889,
        lng: 32.8998
      },
      zoom: 14
    });

    // Create an info window
    const infoWindow = new window.google.maps.InfoWindow();

    // Event to close infoWindow when clicking on the map 
    map.addListener('click', function () {
      infoWindow.close();
    });

    
    // Push markers onto markers so we can set markers to state later
    let markers = []
    // Loop over venues and create markers for them
    this.state.venues.forEach(venue => {
      let marker = new window.google.maps.Marker({
        position: venue.location,
        id: venue.id,
        title: venue.name,
        map: map,
        animation: window.google.maps.Animation.DROP,
      });

      markers.push(marker);

      marker.addListener('click', function () {
        infoWindow.setContent(`<div class = 'infoWindow'>
          <h3>Restaurant Name :</h3>
          <p>${marker.title}</p>
          </div>`)
        infoWindow.open(map, marker);
      })

    }) // End Create markers and display them on the map

    const listName = this.state.venues.map(place => place.name)
    // Set the state for menu, markers, and map
    this.setState({
      menu: listName,
      markers: markers,
      map: map
    })
  }

  // Function to Filter both list menu and markers  
  filteredMarkerAndMenu = (query) => {
    const matching = new RegExp(escapeRegExp(query), 'i');
    let listNames = this.state.venues.filter((place) => matching.test(place.name));
    // Here listNames is an array of objects that match query search I need names only so I filtered them and returns names only
    let placeName = listNames.map(place => place.name)
    if (listNames) {
      //Here I loop over marker array original one and make comparing between markers + placesname
      this.state.markers.forEach(marker => {
        placeName.includes(marker.title) ? marker.setMap(this.state.map) : marker.setMap(null)
      })
      this.setState({ menu: placeName })

    }
    else {
      this.setState({ menu: this.state.venues.map(place => place.name) })
    }
  }

  render() {

    return (

        <div className="App" >

            <Header />
            
            <div id ='map' role= 'application' aria-label = 'location' ></div>
          
            <LocationList venues = {this.state.venues} markersArr={this.state.markers} menu = {this.state.menu}
                          filteredMarkerAndMenu = {this.filteredMarkerAndMenu}
            />

            <Footer />

        </div>
    
      );
  }
}

export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyBg8qm6I5VQFNsCCdXZeHuK2Eqbpi_SgC4&v=3"])(App);
