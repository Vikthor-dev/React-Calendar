import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import "./Navbar.css"


const NavbarComponent = () =>{

    return(
        <>
            <Navbar id="navbar" bg="dark" variant="dark">
                <a href='https://www.b2match.com/'><img id="logo" src={require("../src/assets/b2match.png")} alt="B2Match"/></a>
                <h3 id="brand">Calendar Project for B2Match</h3>
                
            </Navbar>
        </>
    );

}

export default NavbarComponent;