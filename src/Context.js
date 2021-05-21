import React, { createContext } from 'react';
import useCache                 from './hooks/useCache';


/* =========================================================================
                               Context.js
========================================================================= */


export const Context  = createContext({});
export const Consumer = Context.Consumer;


export const Provider = (props) => {

  ////////////////////////////////////////////////////////////////////////////
  //
  //  Why do we use several caches?
  //  You may be tempted to create a single cache for ALL data.
  //  This is a bad idea because one can make a data request, go to another
  //  page that also makes a data request, and now you've got that state
  //  that was intended for that page, bleeding into another page.
  //  For example, suppose you had two pages that got data on a button click.
  //  On page 1 you press the button, then move on to page two, but don't press the
  //  button there. This will cause Page 2 to initiate its loader, and eventually
  //  attempt to render data because it sees loaded:true.
  //  For this reason, there should be multiple caches.
  //  This means we want at least one cache for every page that caches data.
  //  
  //  Now suppose we had a page that had multiple cards, and each card had a
  //  'Learn More' button. When that button was clicked it then made a request
  //  for additional data. If you were using the same cache for each card, you
  //  would have the same probleme whereby status intended for the first request,
  //  could bleed into the second request.
  //
  //  Really, the card should be going to a Card Details page just suppose it wasn't
  //  Obviously having a separate cache for each individual piece of data is also bad.
  //  In this case I would suggest not caching the data at all. Instead, just keep
  //  the data in local state.
  //
  ////////////////////////////////////////////////////////////////////////////


  const [ fetchUsersData, fetchUsers ] = useCache(1000 * 60); 
  const [ fetchPostsData, fetchPosts, clearPostsDataByKey ] = useCache(1000 * 60); 
  const [ fetchPostData,  fetchPost  ] = useCache(1000 * 60); 


  return (
    <Context.Provider 
      value={{ 
        fetchUsersData, fetchUsers,
        fetchPostsData, fetchPosts, clearPostsDataByKey,
        fetchPostData,  fetchPost
      }}
    >
      { props.children }
    </Context.Provider>
  );
};