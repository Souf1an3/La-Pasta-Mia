import React from 'react';

import ImportContactsSharpIcon from '@material-ui/icons/ImportContactsSharp';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import {
    Nav,
    NavLinkUp,
    Bars,
    NavMenu, Test
} from './NavBarElements';
// import logo from "../lmp-removebg-preview (1).png";
import logo from "../Images/kukta.png";
import PostAddSharpIcon from '@material-ui/icons/PostAddSharp';

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars/>

                <NavMenu>
                    <img style={{maxHeight: "80px"}} src={logo} alt={"ok"}/>
                    <NavLinkUp to="/grocery" style={{Test}} disabled={true}>
                        <h4>Bevásárlólista</h4>

                        <ShoppingCartSharpIcon/>
                    </NavLinkUp>




                    <NavLinkUp to="/recipes">
                        <h4>Receptek</h4>
                        &nbsp;

                        <ImportContactsSharpIcon/> </NavLinkUp>
                    <NavLinkUp to="/add-recipe">
                        <h4> Új recept
                        </h4>
                        &nbsp;
                        <PostAddSharpIcon/>

                    </NavLinkUp>
                    <NavLinkUp to="/home">
                        <HomeSharpIcon/>
                    </NavLinkUp>

                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;