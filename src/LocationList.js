import React, {Component} from 'react';
import escapeRegExp from 'escape-string-regexp';

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
        let listName = this.props.allMarkersList.map(place => place.name);
        this.setState({
            list:  listName 
        }) ;
       

     this.setState( oldState => ({isToogleOn: oldState.isToogleOn !== true}) )
    }

// Search function
searchFilter = (query) => {
    const matching = new RegExp(escapeRegExp(query), 'i');
    let filtered = this.props.allMarkersList.filter((place) => matching.test(place.name));

<<<<<<< HEAD
    if (filtered) {
        this.setState({ list: filtered.map(place => place.name) })
    }
    else {
        this.setState({ list: this.props.allMarkersList.map(place => place.name) })
    }
    
=======
// Search in List filter 
searchFilter = (query)=>{
let markerName = this.props.allMarkersList.map(place => place.name);
if(query.toLowerCase()){
    this.setState({query:query})
   let filter =   markerName.filter(p => p == query);
    this.setState({
                list: filter
      }) ;
}else{
    this.setState({query})
    this.setState({
        list: markerName
    }) ;
}  
     
>>>>>>> 2b80a7efc5ed9fbb7514760f6acbfec944e8d06a
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
                        onChange = {(e)=>this.searchFilter(e.target.value)}
                 />
                
                {this.state.list.map((list,index)=> 
                    <li className = 'link' tabIndex= '0' key={index} 
                        onClick = {()=> this.props.infoWindowFromList}     > {list} </li>  

                    )  
                }

            </ul> 

           </nav> 

        )
    }
}

export default LocationList; 
