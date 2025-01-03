import React from 'react';

import { registerUser } from '../lib/actions';
// import RegisterForm from './register-form';

export default function RegisterPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <div>
          <h1 className="m-10 font-bold text-grey-100 text-4xl">Trade Journal</h1>
          {/* <RegisterForm registerUser={registerUser}/> */}
          </div>
        </div>
      );
}