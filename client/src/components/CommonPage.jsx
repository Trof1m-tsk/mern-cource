import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

function CommonPage() {
  return (
    <div className="flex flex-col w-full">
      <NavBar/>
      <div id="detail">
        <Outlet/>
      </div>
    </div>
  );
}

export default CommonPage;
