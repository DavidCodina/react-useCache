import React, { useEffect } from 'react'; 
import Spinner              from '../Spinner';


function Home(props){
  const { value: { fetchUsersData, fetchUsers } } = props;
  const { loading: loadingUsers,  loaded: loadedUsers, data: usersData, error: usersDataError } = fetchUsersData;
  const showSpinner = loadingUsers && !loadedUsers;
  const showError   = usersDataError && !loadingUsers && !loadedUsers;
  ////////////////////////////////////////////////////////////////////////////
  //
  //  Checking for an Array when you expect an array is a good pattern.
  //  Why? Because there is a rare gotcha in the unlikely event of a 404 Not Found Error
  //  GENERATE BY THE BROWSER. res.data becomes {}, and this can potentially break the UI
  //  map() method when the expected data is an array.
  //  Such a situation might be also be a good place for an error boundary.
  //
  ////////////////////////////////////////////////////////////////////////////
  const showData    = (loadedUsers) && Array.isArray(usersData) && usersData.length > 0; // Choosing not to show error if cached data exists.

  const getUsers = () => {
    // Test error handling
    // if (cachedUsers){
    //   // There is a difference between a 404 coming from the website, and a 404 coming from the browser
    //   // fetchUsers('http://httpstat.us/404');                      // usersDataError: {code: 404, description: "Not Found"}
    //   // fetchUsers('https://jsonplaceholder.typicode.com/uzers');  // usersDataError: {}  
    //   return;
    // }
    // fetchUsers('http://httpstat.us/404'); 
    fetchUsers('https://jsonplaceholder.typicode.com/users');
  };


  // https://github.com/facebook/create-react-app/issues/6880
  // useEffect(() => getUsers(), []); // eslint-disable-line react-hooks/exhaustive-deps
  // useEffect(() => { console.log("usersData: ", usersData); }, [usersData]);


  useEffect(() => {
    // Currently Axios will not throw errors regardless of status code, 
    // but useRefreshNowCache() will create an error for 300+ status codes.
    // I prefer handling it myself, rather than letting Axios automate it.
    // Should I do something with the error?
    if (usersDataError){
      console.error("usersDataError: ", usersDataError);
    }  
  }, [usersDataError]);


  const renderUserInfo = () => {
    if (showSpinner){ 
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

    if (showError){
      return <h1 className="text-pink text-center" style={{ fontFamily: 'Montserrat', textShadow: '0px 1px 2px rgba(0,0,0,0.25' }}>An error occurred!</h1>
    }

    else if (showData){
      return (
        <React.Fragment>
          { 
            usersData.map(user => {
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
      <h2 className="my-5 text-white-3d text-center">Users</h2>

      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>

      <div className="mb-5 text-center">
        <button className="btn btn-outline-gray" onClick={getUsers}>Manually Get Users </button>
      </div>

      { renderUserInfo() }  
    </React.Fragment>     
  );
}


export default Home;