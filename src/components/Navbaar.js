import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Navbaar() {
    const user = JSON.parse(localStorage.getItem('user'))
    const logout = () => {
        let data = JSON.parse(localStorage.getItem('user'))
        axios.put(`http://localhost:3001/users/${data.id}`, data)
        localStorage.removeItem('user');
       
    }
    return (
        <div className="container-fluid my-1">
            <Navbar bg="secondary" variant="dark">
                <Container>
                    <Navbar.Brand>Assignment</Navbar.Brand>
                    <Nav className="container-fluid mx-5 justify-content-center" activeKey="/Home">
                        
                            <Link className="text-white text-decoration-none m-2" to="/Home" >Home</Link>
                            <Link className="text-white text-decoration-none m-2" to="/ShowTab">Expense</Link>
                            <Link className="text-white text-decoration-none m-2" to="/Calc">Calculator</Link>
                        
                        
                    </Nav>
                    <Link to="/" style={{ textDecoration: "none", textAlign: "right" }} ><Button onClick={() => logout()} variant="success" color="error">Logout</Button></Link>
                </Container>
            </Navbar>
        </div>

    )
}
