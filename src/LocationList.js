import React, {Component} from 'react';

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
            list: listName
        }) ;
     this.setState( oldState => ({isToogleOn: oldState.isToogleOn !== true}) )
    }


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
                        value = {this.state.query}
                        onChange = {(e)=>this.searchFilter(e.target.value)}
                 />
                
                {this.state.list.map((list,index)=> 
                    <li className = 'link' tabIndex= '0' key={index} > {list} </li>  

                    )  
                }

            </ul> 

           </nav> 

        )
    }
}

export default LocationList; 
