import React from 'react';
import {Link} from 'react-router-dom';

import '../css/index.css';
import menu from './Menu';
import '../css/bootstrap.min.css';
import '../css/bootstrap-social.css';
import '../css/font-awesome.css';

class Navbar extends React.Component {
    render() {
        var style = {
            background: '#6d8da7',
            borderBottom: '2px solid #627d93',
            boxShadow: '0px 8px 15px -3px #949393',
            height: '42px'
        }

        
        return(
            
            <div style={style}>

                {/* Hard coded Menu */}
                {/* <Link to='/' className="linkStyle" >Home</Link>
                <Link to='/form' className="linkStyle" >React-Form</Link>
                <Link to='/about' className="linkStyle">About</Link> */}

                {/* Reading MENU from array/DB */}
               {menu.map(menuItem => (
                    <Link to={menuItem.menuURL} className="linkStyle" key={menuItem.menuNameEn}>{menuItem.menuNameEn}</Link>
                ))}
            </div>
            
        );
    }
}

export default Navbar;