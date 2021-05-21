import React from 'react'; 

// Gotcha: Something about the PolygonContainer prevents elements inside
// of it from being position: fixed.
// https://stackoverflow.com/questions/38679945/why-is-an-element-with-position-fixed-moving-with-a-non-positioned-sibling
// https://dev.to/takaaki_suger/when-position-fixed-is-not-working-7i6


function HomePage(props){
  const { value: { clearPostsDataByKey  } } = props;



  const forceRefreshPosts = () => props.history.push({ pathname: '/posts', search: '?forceRefresh=true' });
  const goToPosts         = () => props.history.push('/posts');
  const clearPosts        = () => {
    clearPostsDataByKey('https://jsonplaceholder.typicode.com/posts?_limit=10');
  };
  
  return (
    <article className="mt-5 article">
      <h2 className="text-white-3d">Overview:</h2>


      <p>Open the browser console to see log statements of the underlying operations.</p>


      <div className="text-center">
        <button className="btn btn-outline-gray me-3" onClick={forceRefreshPosts} style={{ minWidth: 160 }}>Force Refresh Posts</button>
        <button className="btn btn-outline-gray me-3" onClick={goToPosts} style={{ minWidth: 160 }}>Go To Posts</button>
        <button className="btn btn-outline-gray"      onClick={clearPosts} style={{ minWidth: 160 }}>Clear Posts</button>
      </div>


      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>


      <p>The <code>useCache()</code> hook is built on top of Axios. It provides fetching, caching,
      cache-busting, and cache-clearing functionality.</p>


      <pre><code>{`
  import { useReducer, useRef } from 'react';
  import axios                  from 'axios';
  axios.defaults.validateStatus = function(status){ return true; }; // Default: return status >= 200 && status < 300; 
  
  
  /* ====================================================================
                              Helpers
  ==================================================================== */
  
  
  function getData(url, config){
    config = config || { timeout: 1000 * 25 };
    return axios.get(url, config);
  }
  
  
  function createTimestamp(){ 
    const timestamp = new Date().getTime();
    return timestamp;
  }
  
  
  function getTimestampDifference(t1, t2){
    if (typeof t1 !== 'number' || typeof t2 !== 'number'){ throw new Error('getTimestampDifference only accepts numbers.'); }
    let earlierTimestamp = t1;
    let laterTimestamp   = t2;
    if (t1 > t2){
      earlierTimestamp = t2;
      laterTimestamp   = t1;
    }
    const difference = laterTimestamp - earlierTimestamp;
    return difference;
  }
  
  
  function exceedsMaxAge(t1, t2, maxAge){ 
    if (typeof t1 !== 'number' || typeof t2 !== 'number' || typeof maxAge !== 'number'){ 
      throw new Error('exceedsMaxAge only accepts numbers.'); 
    }
    const difference = getTimestampDifference(t1, t2);
    if (difference > maxAge){ return true; }
    return false;
  }
  
  
  /* ====================================================================
                              reducer
  ==================================================================== */
  
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOADING':  
      console.log("Loading at:", new Date().toLocaleTimeString('en-US'));    
        return { 
          ...state, 
          loading: true,
          loaded: false,
          data: null, 
          error: null 
        };
  
      case 'LOADED_CACHE': 
        console.log("Loaded data from cache at:", new Date().toLocaleTimeString('en-US'));
        return { 
          ...state,         
          loading: false,
          loaded: true,         
          data: action.payload,  
          error: null
        };
      
      case 'LOADED_NEW': 
        console.log("Loaded data from API response at:", new Date().toLocaleTimeString('en-US'));
        return { 
          ...state, 
          loading: false, 
          loaded: true, 
          data: action.payload,
          error: null
        };
  
      case 'ERROR':    
        console.log("Error occurred at:", new Date().toLocaleTimeString('en-US'));
        return { 
          ...state, 
          loading: false, 
          loaded: false, 
          data: null,
          error: action.payload 
        };
  
      default: 
        return state;
    }
  };
  
  
  /* ====================================================================
                              useCache
  ==================================================================== */
  
  
  const useCache = (maxAge = 1000 * 60 * 5) => {
    const cache = useRef({});
  
    const initialState = {
      maxAge:  maxAge, // Defaults to 5 minutes.
      loading: false,
      loaded:  false, 
      data:    null,  
      error:   null
    };
    
    const [ state, dispatch ] = useReducer(reducer, initialState);
  
  
    const fetchData = (url, config = null, forceRefresh = false) => {
      if (!url){ return; }
      if (state.loading){ return; }
  
      
      dispatch({ type: 'LOADING' });
  
      
      if (!forceRefresh){ 
        if (cache.current[url]){
          const cachedData = cache.current[url];
          dispatch({ type: 'LOADED_CACHE', payload: cachedData });
          return; // DO NOT PROCEED IF YOU HAVE CACHED DATA! 
        }
      } 
  
  
      setTimeout(() => { // Delayed response for demo only.
        getData(url, config)
        .then(res  => { 
          if (res.status >= 200 && res.status < 300 && res.data){
            res.data.cachedAt  = createTimestamp();
            cache.current[url] = res.data;
            dispatch({ type: 'LOADED_NEW', payload: res.data });
  
            // Cache Busting!
            setTimeout(function(){
              const now         = createTimestamp();
              const dataExpired = exceedsMaxAge(cache.current[url].cachedAt, now, maxAge);
              if (dataExpired){
                delete cache.current[url]; 
              } 
            }, maxAge + 1000);
          } else {
            // Axios is currently set up such that NO STATUS CODE WILL GO TO THE CATCH BLOCK.
            dispatch({ type: 'ERROR', payload: res.data });
          }
        })
        .catch(err => {
          dispatch({ type: 'ERROR', payload: err }); 
        });
      }, 1000);
    };
  
    return [ state, fetchData ];
  };
  
  
  export default useCache;
  
      `}</code></pre>



      <p>It returns a <code>fetchData</code> function, and <code>state</code> 
      associated to the data request (i.e., cached data, or new API call).</p>


      <pre><code>{`
  {
    maxAge:  Number, // milliseconds
    loading: Boolean,
    loaded:  Boolean, 
    data:    [] | {} | ...
    error:   null | {}
  }
      `}</code></pre>


      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>


      <h3 className="text-gray">Usage:</h3>


      <p>It is important that the hook be implemented at a higher level than
      the component presenting the data. The current demo implements the hook 
      inside of Context.js:</p>


      <pre><code>{`
  import React, { createContext } from 'react';
  import useCache                 from './hooks/useCache';


  export const Context  = createContext({});
  export const Consumer = Context.Consumer;


  export const Provider = (props) => {

    // Admittedly, the naming conventions are confusing.
    //      state,          fetchData   
    const [ fetchUsersData, fetchUsers ] = useCache(1000 * 60); 
    const [ fetchPostsData, fetchPosts ] = useCache(1000 * 60); 
    const [ fetchPostData,  fetchPost  ] = useCache(1000 * 60); 


    return (
      <Context.Provider 
        value={{ 
          fetchUsersData, fetchUsers,
          fetchPostsData, fetchPosts,
          fetchPostData,  fetchPost
        }}
      >
        { props.children }
      </Context.Provider>
    );
  };
      `}</code></pre>
      
      
      <p>Usage looks something like this:</p>


      <pre><code>{`
  function PostsPage(props){
    const { value: { fetchPostsData, fetchPosts } } = props;
    const { 
      loading: loadingPosts, 
      loaded:  loadedPosts, 
      data:    postsData, 
      error:   postsDataError 
    } = fetchPostsData;
  
  
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
      if (showSpinner){ return ... } 
      if (showError){   return ... }
      if (showData){    return ... }
      return null; 
    };
  
  
    return (
      <React.Fragment>
        { renderPosts() } 
      </React.Fragment>     
    );
  }
      `}</code></pre>


      <p>When cached data exists, it will attempt to show that data instead of making a 
      new API request. However, if the cached data has exceeded <code>maxAge</code> a
      new API request will be made and the cache will be updated.</p>


      <div className="horizontal-ruler">
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
      </div>
      

      <h3 className="text-gray">Force Refreshing:</h3>


      <p>One may pass the <code>?forceRefresh=true</code> query string parameter. 
      Then on the associated page some  code could be set up to check for query parameters:</p>


      <pre><code>{`
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
      `}</code></pre>


      <p>With this setup one can force a data refresh. This is especially important after a user has 
      updated their information and is programmatically redirected to the corresponding page. Otherwise,
      it will <em>appear</em> as though the <code>POST</code>, <code>PUT</code>, <code>PATCH</code>,
      or <code>DELETE</code> reqiests did not occur.</p>


      <p>But what if the user is not programmatically redirected?
      A better solution would simply be to clear the cached data at the same time that the request was
      determined to be successful. This can be done using <code>clearCacheByKey(<em>key</em>)</code>.
      Once that piece of cached data is cleared, then we know that the next time the user attempts
      to access that data a fresh request will be made. This also avoids the annoying affect of a user
      going <em>back</em> to a page that was force refreshed with <code>?forceRefesh=true</code>, and having it reload unnecessarily.</p>


      <p>For other caching solutions 
      see <a href="https://react-query.tanstack.com" target="_blank" rel="noreferrer">React Query</a> and <a href="https://swr.vercel.app" target="_blank" rel="noreferrer">SWR</a>.</p>


      


      <p><strong>Note:</strong> this system will not persist data across refreshes.
      In most cases that shouldn't be necessary, excepting login data. For that use
      a <code>useLocalStorage()</code> hook.</p>
    </article>     
  );
}


export default HomePage;