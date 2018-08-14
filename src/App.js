import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader'
import LocationList from './LocationList';
import './App.css';


class App extends Component {

  state = {
   
    allMarkers : [],

    query : '',

    specificMarker : []
 
  }

  componentDidMount(){
    fetch("https://api.foursquare.com/v2/venues/search?ll=24.0889,32.8998&client_id=NCUSJNELMTZK52IO4UXZDZTOXMDCGM1DZGO5NNP33BCZWX1Y&client_secret=K3CG2UZDUN4V2GBYLO5Z3PA0Q3GDW55R2X3LHBUHOA14R4VS&v=20180808").then(function(response){

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
          zoom : 12
          
        });

        // Display markers and info windows  
        for(let i= 0; i < this.state.allMarkers.length; i++ ){

           let marker = new window.google.maps.Marker({
            position: this.state.allMarkers[i].location,
            title : this.state.allMarkers[i].name,
            map: map,
            animation: window.google.maps.Animation.DROP,
            info : this.state.allMarkers[i].categories.map(names => names.name )
          });

            let infoWindow = new window.google.maps.InfoWindow({
              content : (`<div class = 'infoWindow'><p>${marker.info} - ${marker.title}</p></div>`)                 
          })

            marker.addListener('click',function(){
              infoWindow.open(map,marker) ;   
            }) 
              
        } // End Display markers and info windows  

    
      //   // Search in List filter 
      //   searchFilter(query){
      //     this.setState({query : query})
      //   let input = query.toLowerCase();
      //   let oneMarker =  new window.google.maps.Marker({
      //     info : this.state.allMarkers.categories.forEach(names=> names.name )
      //   })
      //   if(input === oneMarker.info.toLowerCase()){
      //       this.setState({specificMarker : oneMarker.info })
      //   }
      //   else{
      //     this.setState({specificMarker:[]})
      //   }
      // }
       
      }

  } // End Component will receive props

  render() {

    return (
      <div className="App" >
      <div className='map' >
        <div id ='map' rol= 'application' aria-label = 'location' >
            
        </div>
      </div> 
      {/* End ClassName map */}

      <LocationList allMarkersList = {this.state.allMarkers} query = {this.state.query} 
                    searchFilter = {(event)=>this.searchFilter(event.target.value)} />

      </div>
    );
  }
}

export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyBg8qm6I5VQFNsCCdXZeHuK2Eqbpi_SgC4&v=3"])(App);
