import {  useEffect, useState } from 'react';


/* ====================================================================
                            Helpers
==================================================================== */


// https://flaviocopes.com/how-to-get-timestamp-javascript/
// Return the number of milliseconds since 1970/01/01:
function createTimestamp(){ 
  const timestamp = new Date().getTime();
  return timestamp;
}


function getTimestampDifference(t1, t2){
  // https://humanwhocodes.com/blog/2009/03/10/the-art-of-throwing-javascript-errors-part-2/
  // http://www.javascriptkit.com/javatutors/trycatch2.shtml
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
                              useCache
==================================================================== */
//! //////////////////////////////////////////////////////////////////////////////
//!
//!  We probably also want to change useState to useReducer.
//!  I don't think useReducer helps prevent race conditions.
//!  Rather, it just standardizes actions. 
//!
//!  The cacheState is scoped to each instance the hook, so
//!  It's not like there's a huge risk for race conditions.
//!  But what if a cacheState was changing right as the setTimeout ran? 
//!  Fortunately, the setTimeout doesn't actually effect cacheState.
//!
//!  Would be nice to have the feature whereby it makes another call 
//!  when the window is refocused.
//!
//! //////////////////////////////////////////////////////////////////////////////


// queryFunction can be any function, so long as it returns data in a Promise.
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
  const { isError, error, isSuccess, data, dataUpdatedAt }            = cacheState;


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


    //! It's super annoying to have to write fetchData INSIDE of the useEffect, 
    //! but it seems to be the only way to make it work.


    function fetchData(){
      if (!queryKey){ // If true, then _queryKeyIsArray is false and queryKey is ''.
        throw new Error("The queryKey must be a string or an array.");
      }
  
      if (!allArrayItemsAreStrings){
        // Technically, this isn't true, but I don't want to deal with non-strings just yet.
        throw new Error("All queryKey array items must be strings.");
      }
  
  
      if (cache[queryKey]){
        setCacheState(currentState => {
          return {
            ...currentState,
            status: "Data fetched from cache.",
            isSuccess: true,
            data: cache[queryKey],
            // dataUpdatedAt: - just let it default to whatever it already is.
            isLoading: false,
            isError: false,
            error: null,
            fetchData: fetchData,
            remove: () => remove(queryKey)
           
          }
        });
        return;
      } // End of if (cache[queryKey]){ ... }
  
  
      //! If there is NO cache[queryKey] then this will run.
  
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
          const dataCachedAt = createTimestamp(); // Different name to avoid shadowing.
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
                //! //////////////////////////////////////////////////////////////////////////////
                //!
                //!  DO NOT delete cacheState. Suppose a user is viewing a page that uses 
                //!  that state, then removing it would suddenly cause their view to also remove that
                //!  data. However, because cacheState is local, we don't have to worry about
                //!  amassing a huge amount of data over time (i.e., with each new request).
                //!  Note: unlike cachedState, the actual cache DOES hold ALL CACHED DATA.
                //!
                //! //////////////////////////////////////////////////////////////////////////////
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
              // data           - just let it default to whatever it already is.
              // dataUpdatedAt: - just let it default to whatever it already is.
              isLoading: false,
              isError: true,
              error: err,
              // fetchData: - just let it default to whatever it already is.
              // remove:    - just let it default to whatever it already is.
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
      //////////////////////////////////////////////////////////////////////////////////
      //
      //  This was just for testing, but we don't actually want to set a focus
      //  listener on window if enabled is false, so instead of if (refetchOnWindowFocus){ ... }
      //  the condition is now if (enabled && refetchOnWindowFocus){ ... }
      //  Consequently, this never acually runs
      //
      //      if (!enabled){
      //        console.log(`\n%cThe window was focused at: ${new Date().toLocaleString('en-US')},`, 'background: transparent; color: green');
      //        console.log(`%cRegardless of the boolean value of 'refetchOnWindowFocus', 'enabled' is false, so no forced refetch will occur.`, 'background: transparent; color: green');
      //        return;
      //      }
      //
      //////////////////////////////////////////////////////////////////////////////////
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


  //////////////////////////////////////////////////////////////////////////////////
  //
  //  This note was originally created when the code for request data was directly
  //  inside of the previous useEffect. However, it's still an important reminder.
  //  onError is needed by the dependency array, but adding it will cause
  //  an infinite loop. Solution useCallback on onError, onSucces, etc.
  //  This would be done BEFORE passing them to the configuration object when
  //  calling useCache. The downside is that it means that every time you want to
  //  pass in a callack, you'd have to wra it in useCallback. As an alternative solution,
  //  you could do it in this hook: const _onError = useCallback(onError, []).
  //  And this works, but it won't make the linter errors disappear. Now
  //  React wants you to add [onError] to that dependency array instead, but
  //  if you do that, then you're back to square one.
  //  So... You can either disable the line, or... do this!!!
  //  A similar pattern should be implemented fro other callbacks -like onSuccess().
  //
  //////////////////////////////////////////////////////////////////////////////////


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


  if (!queryKey){ // If true, then _queryKeyIsArray is false and queryKey is ''
    throw new Error("The queryKey must be a string or an array.");
  }

  return cacheState;
};









  
