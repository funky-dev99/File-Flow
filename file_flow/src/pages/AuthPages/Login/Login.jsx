import React from 'react';
import LogingForm from '../../../componants/AuthComponents/LogingForm';

const Login = () => {
  return (
    <div className="container-fluid">
      <h1 className='displa-1 my-3 text-center'>LogIn</h1>
      <div className="row">
        <div className='col-md-5 mx-auto mt-5'>
          <LogingForm/>

        </div>
      </div>
    </div>
  );
};

export default Login;