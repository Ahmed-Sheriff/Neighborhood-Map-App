import React, {Component} from 'react';
//import escapeRegExp from 'escape-string-regexp';

class LocationList extends Component {
    state = {
        isToogleOn : true ,

        query:'',

        list : [] 
    }
    
     hideMenuList = {
     left:   "-100%"
   }
 
   displayMenuList = {
     left:  "0"
   }
 
    toggleMenuList = () => {
     
        this.setState({
            isToogleOn: this.state.isToogleOn !== true
        }) ;
        
    }

// Search function
    // searchFilter = (query) => {
    //     const matching = new RegExp(escapeRegExp(query), 'i');
    //     let filtered = this.props.allMarkersList.filter((place) => matching.test(place.name));
    //     if (filtered) {
    //         this.setState({ list: filtered.map(place => place.name) })
    //     }
    //     else {
    //         this.setState({ list: this.props.allMarkersList.map(place => place.name) })
    //     }        
    // }
    

    // Open info window for the marker when clicking on any of list items    
    openInfoWindowFromList (place){
        this.props.markersArr.map(marker => {
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
            

            <ul className='menu-list'  aria-label = 'list-menu' tabIndex = '1' 
                style = {this.state.isToogleOn ? this.hideMenuList : this.displayMenuList}>
                
                <input  type= 'text' name = 'search' aria-label = 'input-search' 
                        placeholder = 'Search for locations'
                        onChange = {(e)=>this.props.filteredMarkerAndMenu(e.target.value)}
                 />
                
                {this.props.menu.map((list,index)=> 
                    <li className = 'link' tabIndex= '0' key={index} 
                       onClick = {(event)=>this.openInfoWindowFromList(list)}
                       onKeyPress = {(event)=>this.openInfoWindowFromList(list)}
                    > {list} </li>  

                    )  
                }

            </ul> 

           </nav> 

        )
    }
}

export default LocationList; 
