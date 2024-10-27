'use client';

import LoginComponent from '@/components/LoginComponent'
import RegisterComponent from '@/components/RegisterComponent'
import { checkAuth } from '@/utils/userActions';
import React, { useState } from 'react'

function Page() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
        {isLogin && <LoginComponent/>}
        {!isLogin && <RegisterComponent/>}
        <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
        <button onClick={() => setIsLogin(prev => !prev)}>{isLogin ? "Register": "Login"}</button>
        <button onClick={checkAuth}>Test JWT</button>
    </div>
  )
}

export default Page