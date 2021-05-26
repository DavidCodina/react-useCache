import {  useEffect, useState } from 'react';


/* ====================================================================
                            Helpers
==================================================================== */


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


const cache = {};


/* ====================================================================
                            useCache()
==================================================================== */


export const useCache = (_queryKey, queryFunction, config = {}) => {
  if (!config.hasOwnProperty('enabled')){ config.enabled = true; }
  if (!config.hasOwnProperty('maxAge')){  config.maxAge  = 1000 * 60 * 5; }
  if (!config.hasOwnProperty('refetchOnWindowFocus')){ config.refetchOnWindowFocus = true; }


  const [ cacheState, setCacheState ] = useState({
    status: "idle",
    isSuccess: false,
    data: null,
    dataUpdatedAt: null,
    isLoading: false,
    isError: false,
    error: null,
    fetchData: null,
    remove: null
  });


  const { enabled, maxAge, onError, onSuccess, refetchOnWindowFocus } = config;
  const { isError, error, isSuccess, data } = cacheState;


  /* =========================
      validate _queryKey
  ========================= */

  
  const _queryKeyIsString           = typeof _queryKey === 'string';
  if (_queryKeyIsString){ _queryKey = [_queryKey]; }
  const _queryKeyIsArray            = Array.isArray(_queryKey);
  let queryKey                      = '';
  let allArrayItemsAreStrings       = true;


  if (_queryKeyIsArray){
    for (let i = 0; i < _queryKey.length; i++){
      const arrayItem = _queryKey[i];

      if (typeof arrayItem !== 'string'){ allArrayItemsAreStrings = false; }
      queryKey += arrayItem;
    }
  }


  /* =========================

  ========================= */


  useEffect(() => { 
    let expirationTimeout = null;


    function remove(){ 
      console.log(`\n%cremove() deleted cached data with a key of '${queryKey}' at: ${new Date().toLocaleString('en-US')}.`, 'background: transparent; color: #FF355E');
      delete cache[queryKey]; 
      clearTimeout(expirationTimeout);
    }


    function fetchData(){
      if (!queryKey){ 
        throw new Error("The queryKey must be a string or an array.");
      }
  
      if (!allArrayItemsAreStrings){
        throw new Error("All queryKey array items must be strings.");
      }
  
  
      if (cache[queryKey]){
        setCacheState(currentState => {
          return {
            ...currentState,
            status: "Data fetched from cache.",
            isSuccess: true,
            data: cache[queryKey],
            isLoading: false,
            isError: false,
            error: null,
            fetchData: fetchData,
            remove: () => remove(queryKey)
           
          }
        });
        return;
      } // End of if (cache[queryKey]){ ... }
  
  
      // Set local cacheState to isLoading.
      setCacheState(currentState => {
        return {
          ...currentState,
          status: "Fetching data from API.",
          isSuccess: false,
          data: null,
          dataUpdatedAt: null,
          isLoading: true,
          isError: false,
          error: null,
          fetchData: null,
          remove: null
        }
      });
  
  
      setTimeout(() => { //! Delayed response for demo only.  
        queryFunction()
        .then(data => {
          // Update cache:
          const dataCachedAt = createTimestamp(); 
          cache[queryKey]    = data;
  
          // Set local cacheState to loaded.
          setCacheState(currentState => {
            return {
              ...currentState,
              status: "Data fetched from API.",
              isSuccess: true,
              data: data,
              dataUpdatedAt: dataCachedAt,
              isLoading: false,
              isError: false,
              error: null,
              fetchData: fetchData,
              remove: () => remove(queryKey)
            };
          });
  
  
          // Cache Busting: set a timer to remove cached data.
          clearTimeout(expirationTimeout);
          expirationTimeout   = setTimeout(function(){
            const now         = createTimestamp(); 
            const dataExpired = exceedsMaxAge(dataCachedAt, now, maxAge);
            if (dataExpired){
              if (cache[queryKey]){
                console.log(`\n%c expirationTimeout deleted cached data with key of '${queryKey}' at: ${new Date().toLocaleString('en-US')}.`, 'background: transparent; color: #FF355E');
  
                delete cache[queryKey]; 
              } 
            } 
          }, maxAge + 1000);  
        })
  
        .catch(err => {
          setCacheState(currentState => {
            return {
              ...currentState,
              status: "An error occurred.",
              isSuccess: false,
              isLoading: false,
              isError: true,
              error: err
            };
          });
        });
      }, 2000); //! Delayed response for demo only.
    }

    if (enabled){
      fetchData();
    } else {
      setCacheState(currentState => {
        return {
          ...currentState,
          status: "idle",
          isSuccess: false,
          data: null,
          dataUpdatedAt: null,
          isLoading: false,
          isError: false,
          error: null,
          fetchData: fetchData,
          remove: () => remove(queryKey)
        };
      });
    }


    function handleWindowFocus(){
      if (!enabled){ return; }
      console.log(`\n%cThe window was focused at: ${new Date().toLocaleString('en-US')}. Both 'enabled' and 'refetchOnWindowFocus' are true, so calling remove() and fetchData().`, 'background: transparent; color: green');
      remove(queryKey);
      fetchData();
    }


    if (enabled && refetchOnWindowFocus){
      window.addEventListener('focus', handleWindowFocus);
    }
    

    return () => {
      console.log(`\n%cUnmounting component at: ${new Date().toLocaleString('en-US')},`, 'background: transparent; color: green');
      console.log(`%cand removing potential handleWindowFocus event listener.`, 'background: transparent; color: green');
      window.removeEventListener('focus', handleWindowFocus);
    }  
  }, [enabled, queryKey, queryFunction, allArrayItemsAreStrings, maxAge, refetchOnWindowFocus]); 


  useEffect(() => {
    if (isError && onError && typeof onError === 'function'){ 
      onError(error); 
    } else if (isError){
      console.log("\n%cAn error occurred, but no optional onError() callback was provided. Errors are always handled gracefully within fetchData's catch block. The rendering component can still use isError and error from cacheState to handle the UI.", 'background: transparent; color: #FF355E');
    }
  }, [isError, error, onError]);



  useEffect(() => {
    if (isSuccess && onSuccess && typeof onSuccess === 'function'){ 
      onSuccess(data); 
    } else if (isSuccess){
      console.log("\n%cThe request was successful, but no optional onSuccess() callback was provided. The rendering component can still use isSuccess and data from cacheState to handle the UI.", 'background: transparent; color: green');
    }
  }, [isSuccess, data, onSuccess]);


  /* =========================
        Return Something
  ========================= */


  if (!queryKey){
    throw new Error("The queryKey must be a string or an array.");
  }

  return cacheState;
};









  
