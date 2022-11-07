import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';

function AuthPage() {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const { loading, request, error, clearError } = useHttp();

  useEffect(() => {
    if (error) {
      toast.error(error);

      clearError();
    }
  }, [error]);

  const changeHandler = ( e ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      toast.success(data?.message);
      setForm({ email: '', password: '' });
    } catch (e) {
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
      setForm({ email: '', password: '' });
    } catch (e) {
    }
  };

  return (
    <div className='flex flex-col h-screen items-center justify-center bg-blue-200 text-gray-700'>
      <h1 className='text-5xl mb-4 font-bold'>Shorten the link App!</h1>
      <div className='w-[500px] shadow-2xl bg-white rounded-2xl flex flex-col p-6 items-center'>
        <span className='text-2xl mb-4 font-bold'>Authorization</span>
        <div className='flex-1 w-full mb-8'>
          <input
            className='w-full h-[50px] outline-none px-2 mb-4 bg-gray-300 border-b-gray-500 rounded'
            id='email'
            name='email'
            type='text'
            placeholder='Enter email'
            autoFocus
            value={ form.email }
            onChange={ changeHandler }
          />
          <input
            className='w-full h-[50px] outline-none px-2 bg-gray-300 border-b-gray-500 rounded'
            id='password'
            name='password'
            type='text'
            autoComplete='off'
            placeholder='Enter password'
            value={ form.password }
            onChange={ changeHandler }
          />
        </div>
        <div className='flex justify-between'>
          <button
            onClick={ loginHandler }
            disabled={ loading }
            className='h-[50px] w-[150px] text-white rounded active:bg-green-400 hover:bg-green-500 bg-green-600 mr-4'
          >Login
          </button>
          <button
            onClick={ registerHandler }
            disabled={ loading }
            className='h-[50px] w-[150px] text-white rounded active:bg-amber-400 hover:bg-amber-500 bg-amber-600'
          >Register
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default AuthPage;
