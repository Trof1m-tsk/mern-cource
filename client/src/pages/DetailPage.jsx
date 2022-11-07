import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import LinkCard from '../components/LinkCard';
import Loader from '../components/Loader';

function DetailPage() {
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState(null);
  const linkId = useParams().id;

  console.log('LINK ID', linkId);

  const getLink = useCallback(async () => {
      try {
        console.log('token', token);
        const fetched = await request(`/api/link/${ linkId }`, 'GET', null, {
          Authorization: `Bearer ${ token }`,
        });

        setLink(fetched);
      } catch (e) {

      }
    }, [token, linkId, request],
  );

  useEffect(() => {
    getLink()
      .then(link => console.log(link));
  }, [getLink]);

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <>
      { !loading && link && <LinkCard link={ link }/> }
    </>
  );
}

export default DetailPage;
