import { useState, useEffect } from 'react';


//////////////////////////////////////////////////////////////////////////
//
//  Generally, this hook is used only once.
//  It's invoked in the App-level state, context, or store.
//  Then the setter is passed to the place where Routes are defined (e.g., <CustomRouter />, <Router />, etc.);
//  It is used as follows:
//
//     const location             = useLocation();
//     const { value }            = props;
//     const { setRecentHistory } = props.value;
//     useEffect(() => {
//       setRecentHistory(location.pathname);
//     }, [location.pathname]);
//
//////////////////////////////////////////////////////////////////////////


function useRecentHistory(historyLength = 3){ // historyLength: the number of previous locations to remember.
  const [ recentHistory, _setRecentHistory ] = useState([]);

  const setRecentHistory = (value) => {
    const newHistory = [...recentHistory];
    if (typeof value === 'function'){ newHistory.push(value());    } 
    else {                            newHistory.push(value);      }
    while (newHistory.length > historyLength){ newHistory.shift(); }
    _setRecentHistory(newHistory);
  };

  useEffect(() => console.log("Recent History: ", recentHistory), [recentHistory]); // Development only
  return [recentHistory, setRecentHistory];
}


export default useRecentHistory;
