import React from 'react';

function LinkCard( { link } ) {

  return (
    <div className='flex flex-col items-center'>
      <div className='flex-1 w-[70%]'>
        <h1 className={ 'self-start text-3xl my-4' }>Link details:</h1>
        <div>
          <p>Shortened link: <a className='underline text-blue-700' href={ link.to } target='_blank'
                                rel='noopener noreferrer'>{ link.to }</a></p>
          <p>Initial link: <a className='underline text-blue-700' href={ link.from } target='_blank'
                              rel='noopener noreferrer'>{ link.from }</a></p>
          <p>Link click counter: <strong>{ link.clicks }</strong></p>
          <p>Creation date: <strong>{ link.date }</strong></p>
        </div>
      </div>
    </div>
  );
}

export default LinkCard;
