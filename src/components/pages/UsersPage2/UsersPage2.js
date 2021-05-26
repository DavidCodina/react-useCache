import React        from 'react'; 
import axios        from 'axios';
import { useCache } from '../../../hooks/useCache';
import { Spinner }  from  '../../shared';


axios.defaults.validateStatus = function(status){ return status >= 200 && status < 300 }; // Default
function getUsers(url, config){
  config = config || { timeout: 1000 * 25 };
  return axios.get(`${process.env.REACT_APP_SERVER}/users`, config)
  .then(res => res.data);
}


export function UsersPage2(props){
  // const useCacheData = useCache(123, getUsers, { maxAge: 1000 * 30 }); //! Error Test
  const cacheState = useCache(["users"], getUsers, { 
    maxAge: 1000 * 30,
    refetchOnWindowFocus: true,
    onError: (err) => { 
      console.log(`\n%cAn optional onError() callback was provided for when errors occur.`, 'background: transparent; color: #FF355E'); 
      console.log(`%c${err}.`, 'background: transparent; color: #FF355E'); 
    }
  });


  const { isSuccess, data, isLoading, isError, error, remove } = cacheState;
  console.log(`\n%cUsers Page: ${new Date().toLocaleString('en-US')}`, 'background: transparent; color: green', cacheState);


  const renderUsers = () => {
    if (isLoading){ 
      return (
        <Spinner 
          size={75} 
          variant="pink" 
          style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.5))' }} 
          containerClasses="d-inline-block"
          containerStyle={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%' }}
          useContainer={false}
        />
      ); 
    } 

    if (isError){
      return (
        <h1 
          className="text-pink text-center" 
          style={{ fontFamily: 'Montserrat', textShadow: '0px 1px 2px rgba(0,0,0,0.25' }}
        >
          {error.message ? `Error: ${error.message}` : 'Error: Could not complete request!'}
        </h1>
      ); 
    }

    if (isSuccess && data){
      return (
        <React.Fragment>
          { 
            data.map(user => {
              return (
                <div key={ user.id } className="mx-auto mb-5 bg-light p-3 border border-dark rounded-3 shadow-sm" style={{ maxWidth: 600 }}>
                  <p><strong>Name:</strong> { user.name }</p>
                  <p className="mb-0"><strong>Email:</strong> { user.email }</p>
                </div>
              );
            })
          }
        </React.Fragment>
      );
    }

    return null; // This should never happen.
  };


  return (
    <React.Fragment>
      <h2 className="my-5 text-white-3d text-center">Users 2</h2>


      <p>This page demonstrates that the cache is accessible from anywhere as long
      as you hook into it. Thus from the original Users page we can request data.
      If we then navigate to this page and hook into the cache, we can immediately
      access that data -<em>no context needed!</em></p>


      <p>This page also makes use of <code>enabled:true</code> and <code>refetchOnWindowFocus:true</code>.
      Both of these configurations are <code>true</code> by default. Together they allow automatic refetching when a
      new focus event is detected on the window. To disable this feature, one can set <code>refetchOnWindowFocus:false</code>.
      Alternatively, <code>enabled:false</code> will disable <em>all</em> automated fetching, regardless of the value
      of <code>refetchOnWindowFocus</code>.</p>


      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>

      <div className="mb-5 text-center">
        <button className="btn btn-outline-gray" style={{ minWidth: 125 }}  onClick={remove}>Remove Users</button>
      </div>

      { renderUsers() }  
    </React.Fragment>     
  );
}
