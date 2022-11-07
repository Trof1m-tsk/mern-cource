import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

function LinksPage() {
  const [links, setLinks] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { loading, request } = useHttp();

  const fetchLinks = useCallback(async () => {
    try {

      const links = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${ token }`,
      });

      setLinks(links);
    } catch (e) {

    }
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return (
      <Loader/>
    );
  }

  if (!links?.length) {
    return (
      <div className='flex justify-center'>
        <p className='text-2xl mt-4'>You don't have links yet.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='flex-1 w-[70%]'>
        <h1 className={ 'self-start text-3xl my-4' }>Links Page</h1>
        <ol className='list-decimal'>
          { links && links.map(link => (
            <li onClick={ () => navigate(`/detail/${ link._id }`) }>{ link.to }</li>
          )) }
        </ol>
      </div>
    </div>
  );
}

export default LinksPage;
