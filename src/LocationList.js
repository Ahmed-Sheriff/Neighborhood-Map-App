import React, {Component} from 'react';
import Menu from './Menu'
class LocationList extends Component {
    
    state = {
        isToggleOn : true     
    }

    hideMenuList = {
        left:   "-100%"
      }
    
      displayMenuList = {
        left:  "0"
      }
    
    // Function to Toggle the menu list when clicking on hamburger menu  
    toggleMenuList = () => { 
        this.setState({ isToggleOn: this.state.isToggleOn !== true });
    }

    // Open info window for the marker when clicking on any of list items    
    openInfoWindowFromList (place){
        this.props.markersArr.forEach(marker => {
        if(marker.title === place){
          window.google.maps.event.trigger(marker, 'click');
        }
      }) 
    }

    render(){

        return (

            <nav id = 'locationList' aria-label = 'location-list' >
                <div className='hamburger-menu' aria-label = 'hamburger-menu' tabIndex = '0'
                    onClick={this.toggleMenuList} onKeyPress={this.toggleMenuList} >
                    <p></p> 
                    <p></p>
                    <p></p> 
                </div>

                <Menu   isToggleOn = {this.state.isToggleOn}
                        hideMenuList = {this.hideMenuList}
                        displayMenuList = {this.displayMenuList}
                        filteredMarkerAndMenu = {this.props.filteredMarkerAndMenu}                         
                        openInfoWindowFromList = {(place)=>this.openInfoWindowFromList(place)}
                        menu = {this.props.menu}
                />

           </nav> 

        )
    }
}

export default LocationList; 
