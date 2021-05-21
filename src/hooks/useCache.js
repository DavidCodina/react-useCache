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
            if (dataExpired){ delete cache.current[url]; } 
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


  const clearCacheByKey = (key) => {
    console.log("Deleted cached data with key of: ", key);
    delete cache.current[key];
  };


  return [ state, fetchData, clearCacheByKey ];
};


export default useCache;

