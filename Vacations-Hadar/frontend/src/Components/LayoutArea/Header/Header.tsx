import { Container, Nav, Navbar } from "react-bootstrap";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import UserModel from "../../../Models/UserModel";
import Role from "../../../Models/Role";
import "./Header.css";

function Header(): JSX.Element {

    const navigator = useNavigate();
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        const user = store.getState().authState.user;
        setUser(user);

        const unsubscribe = store.subscribe(() => {
            const user = store.getState().authState.user;
            setUser(user);
        });

        return unsubscribe;
    }, []);


    return (
        <div className="Header">
        <>
            <Navbar variant="dark" expand="lg" >
                <Container fluid >
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px',
                         }}
                        navbarScroll

                    >
                        <Nav.Link onClick={() => navigator("/home")}>Home</Nav.Link>
                        {user?.role === Role.Admin && <Nav.Link  onClick={() => navigator("/add-vacation")}>Add vacation</Nav.Link>}
                        {user?.role === Role.Admin && <Nav.Link  onClick={() => navigator("/chart")}>Chart</Nav.Link>}

                    </Nav>
                    <AuthMenu />

                </Container>
            </Navbar>
            </>
      
      <h1> What are you waiting for ?  </h1>
      
  
     </div>
  
    );
}

export default Header;