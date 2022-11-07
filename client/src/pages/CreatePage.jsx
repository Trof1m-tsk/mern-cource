import React, { useContext, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function CreatePage() {
  const [link, setLink] = useState('');
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { request } = useHttp();

  const keyDownHandler = async ( e ) => {
    if (e.key === 'Enter') {
      try {
        console.log('token', auth.token);
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${ auth.token }`,
        });
        console.log('data', data);

        navigate(`/detail/${ data.link._id }`);

      } catch (e) {
        console.log('error', e);
      }
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex-1 w-[70%]'>
        <h1 className='self-start text-3xl my-4'>Create new shortened link</h1>
        <input
          className='w-full h-[50px] outline-none px-2 mb-4 bg-gray-300 border-b-gray-500 rounded'
          id='link'
          name='link'
          type='text'
          placeholder='Enter link'
          autoFocus
          value={ link }
          onChange={ e => setLink(e.target.value) }
          onKeyDown={ keyDownHandler }
        />
      </div>
    </div>
  );
}

export default CreatePage;
