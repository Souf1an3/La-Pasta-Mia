import {FaBars} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  height: 85px;
  display: flex;
  justify-content: space-around;
  z-index: 12;
`;


export const Test = styled.h2`
 color: red;
`

export const NavLinkUp = styled(NavLink)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  margin-left: .5rem;
  cursor: pointer;
      transition: 0.15s;
  &.active {
    color: whitesmoke;
    background: #076620;
  };
  &:hover {
    background: #076620;
    color: white;

  
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  // @media screen and (max-width: 768px) {
  //   display: none;
  
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(NavLink)`
  border-radius: 4px;
  width: 120px;
  height: 40px;
  background: #808080;
  // padding: 10px 22px;
  color: #076620;
  outline: none;
  font-size: 24px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;