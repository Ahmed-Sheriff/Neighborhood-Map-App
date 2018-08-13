import React, {Component} from 'react';

class LocationList extends Component {

    state = {
        isToogleOn : true ,

        query: '' ,

        menuLinks : []
    }
    
     hideMenuList = {
     left:   "-50%"
   }
 
   displayMenuList = {
     left:  "0"
   }
 
    toggleMenuList = () => {
     this.setState( oldState => ({isToogleOn: oldState.isToogleOn !== true}) )
    }

    //  // Search for markers
    //  searchMarkers (query) { 
    //     this.setState({query: query})
    //     this.props.allMarkersList.forEach(names =>{
    //         names.title;
    //         if(query === names.title) {
    //             this.setState({menuLinks:link})
                       
    //           }
    //     })
        
    //     } // Search for markers          
       

    render(){

        return (

            <div id = 'navigation'>
            <nav className = 'heading'>
            <header>Nieghborhood Locations</header>
            <div className='hamburger-menu' onClick={this.toggleMenuList}  >
               <p></p>
               <p></p>
               <p></p> 
            </div>
            </nav>

            <ul className='menu-list'
                style = {this.state.isToogleOn ? this.hideMenuList : this.displayMenuList}>
                
                <input  type= 'text' name = 'search' placeholder = 'Search for locations'
                        //value = {this.state.query}
                        // onChange={(event)=>this.searchMarkers( event.target.value)}
                 />
                
                {this.props.allMarkersList.map((list,index)=> 
                    <li className = 'link' key={index} > {list.categories.map(names => names.name )} </li>  
                    
                    )
                }

            </ul> 

            </div> // End of div navigation

        )
    }
}

export default LocationList; 