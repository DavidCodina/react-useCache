import React, { useState, useEffect } from 'react';
import getAllUrlParams from '../../helpers/getAllUrlParams';
import Spinner         from '../Spinner';


function isEmpty(obj){
  for (var prop in obj){
    if (obj.hasOwnProperty(prop)){ return false; }
  }
  return true;
}

function PostPage(props){
  const { value: { fetchPostData, fetchPost } } = props;
  const { loading: loadingPost, loaded: loadedPost, data: postData, error: postDataError } = fetchPostData;
  const [ title, setTitle ] = useState('?');
  const showSpinner         = loadingPost   && !loadedPost;
  const showError           = postDataError && !loadingPost && !loadedPost;
  const showData            = loadedPost    && !isEmpty(postData); 


  const getPost = () => { 
    if (!props.match.params.id){ return; }
    fetchPost(`https://jsonplaceholder.typicode.com/posts/${props.match.params.id}`); 
  };

  useEffect(() => getPost(), []); // eslint-disable-line react-hooks/exhaustive-deps
  

  // Set title based on value of query parameter.
  useEffect(() => {
    if (!props.location.search){ return; } 
    const params = getAllUrlParams(decodeURIComponent(props.location.search));
    if (params.title){ setTitle(params.title); }
  }, [props.location.search]);


  const renderPost = () => {
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
        <div className="mx-auto mb-5 bg-light p-3 border border-dark rounded-3 shadow-sm" style={{ maxWidth: 600 }}>
          <p><strong>Title:</strong> {postData.title}</p>
          <p className="mb-0"><strong>Body:</strong> {postData.body}</p>
        </div>
      );
    }

    return null; // This should never happen.
  };


  return (
    <React.Fragment>
      <h2 className='mt-5 text-white-3d text-center'>{ title }</h2>


      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>

      { renderPost() }
    </React.Fragment>     
  );
}


export default PostPage;