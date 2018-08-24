import React, {Component} from 'react';

class Menu extends Component {

    // state = {

    //     hideMenuList :  "-100%" ,

    //     displayMenuList :  "0" , 
    // }

    // hideMenuList = () => {
    //     if (this.state.displayMenuList === "0"){
    //         this.state.hideMenuList;
    //     } 
    //     else {
    //         this.state.displayMenuList;
    //     }
    //  }

    render(){

        return (
            
            <ul className='menu-list'  aria-label = 'list-menu' tabIndex = '1' 
                style = {this.props.isToggleOn ? this.props.displayMenuList : this.props.hideMenuList}  >
                
                <input  type= 'text' name = 'search' aria-label = 'input-search' 
                        placeholder = 'Search for locations'
                        onChange = {(e)=>this.props.filteredMarkerAndMenu(e.target.value)}
                 />
                
                {this.props.menu.map((list,index)=> 
                    <li className = 'link' tabIndex= '0' key={index} 
                        role="button"
                        onClick = {(event)=>this.props.openInfoWindowFromList(list)}
                        onKeyPress = {(event)=>this.props.openInfoWindowFromList(list)}
                    > {list} </li>  

                    )  
                }

            </ul> 
        )
    }
}

export default Menu;