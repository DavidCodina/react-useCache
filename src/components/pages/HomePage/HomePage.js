import React from 'react'; 


export function HomePage(props){
  return (
    <article className="mt-5 article">
      <h2 className="text-white-3d">Overview:</h2>


      <p>The demo is inspired by the <a className="link-blue" href="https://react-query.tanstack.com/" target="_blank" rel="noreferrer">React Query Library</a>. One of founding principles for that library
      is that data from the server (i.e., APIs) and UI data should be handled differently. For example,
      server data should not be stored in global state (global context, global redux store, etc). In practice, I'm not 
      entirely sure how React Query implements this distinction. However, this demo 
      uses an in-memory cache combined with <strong>local</strong> component state (implemented 
      from within the <code>useCache</code> hook) to manage data received from APIs and server requests.</p>


      <p>Open the browser console to see log statements of the underlying operations.
      Navigate to <code>/users</code> and <code>/users2</code> to see how the cache works.</p>


      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>
    </article>     
  );
}