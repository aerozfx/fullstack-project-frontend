import { useContext } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import UserOptions from "../UserOptions/UserOptions";

const Navbar = () => {
  const {width, isLogged} = useContext(UserContext);
  return (
    <>
    {
      width > 800 ?
        <>
          {isLogged ?
            <>
              <ul className="navbar">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/players">Comprar jugadores</Link></li>
                <li><Link to="/my-players">Mis jugadores</Link></li>
              </ul>
                <UserOptions />
            </>
          : 
            <ul className="navbar">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/players">Comprar jugadores</Link></li>
              <li><Link to="/my-players">Mis jugadores</Link></li>
              <li><Link to="/register">Regístrate</Link></li>
              <li><Link to="/login">Acceder</Link></li>
            </ul>
          }
        </>
      :     
        <>
          { isLogged ?
                <ul className="navbar-burguer">
                  <Menu>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/players">Comprar jugadores</Link></li>
                    <li><Link to="/my-players">Mis jugadores</Link></li>
                    <UserOptions />
                  </Menu>
                </ul>
            : 
            <ul className="navbar-burguer">
            <Menu>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/players">Comprar jugadores</Link></li>
              <li><Link to="/my-players">Mis jugadores</Link></li>
              <li><Link to="/register">Regístrate</Link></li>
              <li><Link to="/login">Acceder</Link></li>
            </Menu>
          </ul>
          }
        </>
    }
    </>
  );
};

export default Navbar;
