import React, { Component } from 'react';

class Header extends Component {

    render(){

        return (

            <section id = 'navigation' aria-label = 'navigation'>
                <nav className = 'heading' aria-labelledby = 'header'>
                <header id='header'>Aswan</header>
                </nav>
            </section>
        )
    }
}

export default Header