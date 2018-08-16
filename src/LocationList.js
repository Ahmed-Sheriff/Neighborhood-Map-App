import React, {Component} from 'react';

class LocationList extends Component {

    state = {
        isToogleOn : true ,
    }
    
     hideMenuList = {
     left:   "-100%"
   }
 
   displayMenuList = {
     left:  "0"
   }
 
    toggleMenuList = () => {
     this.setState( oldState => ({isToogleOn: oldState.isToogleOn !== true}) )
    }

            
    render(){

        return (

            <nav id = 'locationList' aria-label = 'location-list' >
            <div className='hamburger-menu' aria-label = 'hamburger-menu' onClick={this.toggleMenuList}  >
               <p></p>
               <p></p>
               <p></p> 
            </div>
            

            <ul className='menu-list' aria-label = 'list-menu' role='menu-list'
                style = {this.state.isToogleOn ? this.hideMenuList : this.displayMenuList}>
                
                <input  type= 'text' name = 'search' aria-label = 'input-search' 
                        placeholder = 'Search for locations'
                        value = {this.props.query}
                        //onChange = {this.props.searchFilter(event.target.value)}
                 />
                
                {this.props.allMarkersList.map((list,index)=> 
                    <li className = 'link' key={index} > {list.categories.map(names => names.name )} </li>  
                    
                    )
                }

            </ul> 

           </nav> 

        )
    }
}

export default LocationList; 