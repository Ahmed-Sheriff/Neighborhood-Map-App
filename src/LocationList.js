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

            <section id = 'navigation' aria-label = 'navigation'>
            <nav className = 'heading' aria-labelledby = 'header'>
            <header id='header'>Aswan</header>
            <div className='hamburger-menu' aria-label = 'hamburger-menu' onClick={this.toggleMenuList}  >
               <p></p>
               <p></p>
               <p></p> 
            </div>
            </nav>

            <ul className='menu-list' aria-label = 'list-menu' role='menu'
                style = {this.state.isToogleOn ? this.hideMenuList : this.displayMenuList}>
                
                <input  type= 'text' name = 'search' aria-label = 'input-search' 
                        placeholder = 'Search for locations'
                        value = {this.props.query}
                        onChange = {this.props.searchFilter(event.target.value)}
                 />
                
                {this.props.allMarkersList.map((list,index)=> 
                    <li className = 'link' key={index} > {list.categories.map(names => names.name )} </li>  
                    
                    )
                }

            </ul> 

            </section> // End of section navigation

        )
    }
}

export default LocationList; 