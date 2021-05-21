import React, { useEffect } from 'react'; 
import Spinner              from '../Spinner';


function Home(props){
  const { value: { fetchUsersData, fetchUsers } } = props;
  const { loading: loadingUsers,  loaded: loadedUsers, data: usersData, error: usersDataError } = fetchUsersData;
  const showSpinner = loadingUsers   && !loadedUsers;
  const showError   = usersDataError && !loadingUsers && !loadedUsers;
  const showData    = (loadedUsers)  && Array.isArray(usersData) && usersData.length > 0; // Choosing not to show error if cached data exists.


  const getUsers = () => {
    fetchUsers('https://jsonplaceholder.typicode.com/users');
  };


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