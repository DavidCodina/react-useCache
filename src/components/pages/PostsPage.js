import React, { useEffect } from 'react';
import getAllUrlParams      from '../../helpers/getAllUrlParams';
import { Link }             from 'react-router-dom';
import Spinner              from '../Spinner';


function PostsPage(props){
  const { value: { fetchPostsData, fetchPosts } } = props;
  const { loading: loadingPosts, loaded: loadedPosts, data: postsData, error: postsDataError } = fetchPostsData;


  const showSpinner = loadingPosts   && !loadedPosts;
  const showError   = postsDataError && !loadingPosts && !loadedPosts;
  const showData    = loadedPosts    && Array.isArray(postsData) && postsData.length > 0; 


  useEffect(() => { 
    if (props.location.search){
      const params = getAllUrlParams(decodeURIComponent(props.location.search));

      if (params.forceRefresh && params.forceRefresh === 'true'){
        fetchPosts('https://jsonplaceholder.typicode.com/posts?_limit=10', null, true); 
      } else {
        fetchPosts('https://jsonplaceholder.typicode.com/posts?_limit=10'); 
      }
    } else {
      fetchPosts('https://jsonplaceholder.typicode.com/posts?_limit=10'); 
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const renderPosts = () => {
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
        <ul className="users-list w-90 mx-auto mb-5 list-group list-group-flush border border-dark rounded-3 shadow-sm overflow-hidden">
          {
            postsData.map(post => {
              return (
                <li key={post.id} className="d-flex align-items-center list-group-item list-group-item-action">
                  <Link 
                  className="custom-link" 
                    to={{ 
                      pathname: `/posts/${post.id}`, 
                      search: `?title=${post.title}` 
                    }}
                  >Title: { post.title}</Link>
                </li>
              );
            })
          }
        </ul> 
      );
    }

    return null; 
  };


  return (
    <React.Fragment>
      <h2 className="my-5 text-white-3d text-center">Posts</h2>

      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>

      { renderPosts() } 
    </React.Fragment>     
  );
}


export default PostsPage;