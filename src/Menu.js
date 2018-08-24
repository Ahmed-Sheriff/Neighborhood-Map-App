import React, {Component} from 'react';

class Menu extends Component {

    render(){      

        return (
            
         
            <ul className='menu-list'  aria-label = 'list-menu' tabIndex = '1' 
                style = {this.props.isToggleOn ? this.props.hideMenuList : this.props.displayMenuList } >
            
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