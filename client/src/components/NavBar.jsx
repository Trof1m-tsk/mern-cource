import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const links = [
  { path: '/create', title: 'Create' },
  { path: '/links', title: 'Links' },
];

function NavBar() {
  const auth = useContext(AuthContext);
  const path = useLocation().pathname;
  const navigate = useNavigate();

  const logoutHandler = ( e ) => {
    e.preventDefault();
    auth.logout();
    navigate('/');
  };

  return (
    <nav>
      <div className='flex h-[60px] flex-1 justify-between px-2 items-center text-white bg-blue-500'>
        <a href='/' className='font-bold text-2xl'>Shorten the link App</a>
        <ul className='flex gap-6'>
          {
            links.map(link => (
              <li key={ link.path }><NavLink className={ path === link.path ? 'border-b-2' : undefined }
                                             to={ link.path }>{ link.title }</NavLink></li>
            ))
          }
          <li><NavLink to={ '' } onClick={ logoutHandler }>Logout</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;


