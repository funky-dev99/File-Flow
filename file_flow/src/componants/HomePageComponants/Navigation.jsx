import React from 'react';

const NavigationComponent = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-white'>
      <a className='navbar-brand ms-5' href='/'>
        File Flow
      </a>
      <ul className='navbar-nav ms-auto me-5'>
        <li className='nav-item mx-4'>
          <a className='btn btn-white btn-sm' href='/login'>
            Login
          </a>
        </li>

        <li className='nav-item '>
          <a className='btn btn-primary btn-sm' href='/register'>
            Register
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationComponent;
