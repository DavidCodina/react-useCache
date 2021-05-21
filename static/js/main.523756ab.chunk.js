(this.webpackJsonpdemo=this.webpackJsonpdemo||[]).push([[0],{57:function(e,t,s){},58:function(e,t,s){},59:function(e,t,s){},60:function(e,t,s){"use strict";s.r(t);var n=s(27),r=s.n(n),c=s(9),a=s(1),o=s.n(a),i=s(3),j=s(15),l=s.n(j);function h(e,t){return t=t||{timeout:25e3},l.a.get(e,t)}function d(){return(new Date).getTime()}function b(e,t,s){if("number"!==typeof e||"number"!==typeof t||"number"!==typeof s)throw new Error("exceedsMaxAge only accepts numbers.");return function(e,t){if("number"!==typeof e||"number"!==typeof t)throw new Error("getTimestampDifference only accepts numbers.");var s=e,n=t;return e>t&&(s=t,n=e),n-s}(e,t)>s}l.a.defaults.validateStatus=function(e){return!0};var x=function(e,t){switch(t.type){case"LOADING":return console.log("Loading at:",(new Date).toLocaleTimeString("en-US")),Object(i.a)(Object(i.a)({},e),{},{loading:!0,loaded:!1,data:null,error:null});case"LOADED_CACHE":return console.log("Loaded data from cache at:",(new Date).toLocaleTimeString("en-US")),Object(i.a)(Object(i.a)({},e),{},{loading:!1,loaded:!0,data:t.payload,error:null});case"LOADED_NEW":return console.log("Loaded data from API response at:",(new Date).toLocaleTimeString("en-US")),Object(i.a)(Object(i.a)({},e),{},{loading:!1,loaded:!0,data:t.payload,error:null});case"ERROR":return console.log("Error occurred at:",(new Date).toLocaleTimeString("en-US")),Object(i.a)(Object(i.a)({},e),{},{loading:!1,loaded:!1,data:null,error:t.payload});default:return e}},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e5,t=Object(a.useRef)({}),s={maxAge:e,loading:!1,loaded:!1,data:null,error:null},n=Object(a.useReducer)(x,s),r=Object(c.a)(n,2),o=r[0],i=r[1],j=function(s){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(s&&!o.loading)if(i({type:"LOADING"}),r||!t.current[s])setTimeout((function(){h(s,n).then((function(n){n.status>=200&&n.status<300&&n.data?(n.data.cachedAt=d(),t.current[s]=n.data,i({type:"LOADED_NEW",payload:n.data}),setTimeout((function(){var n=d();b(t.current[s].cachedAt,n,e)&&delete t.current[s]}),e+1e3)):i({type:"ERROR",payload:n.data})})).catch((function(e){i({type:"ERROR",payload:e})}))}),1e3);else{var c=t.current[s];i({type:"LOADED_CACHE",payload:c})}};return[o,j]},O=s(0),p=Object(a.createContext)({}),f=(p.Consumer,function(e){var t=u(6e4),s=Object(c.a)(t,2),n=s[0],r=s[1],a=u(6e4),o=Object(c.a)(a,2),i=o[0],j=o[1],l=u(6e4),h=Object(c.a)(l,2),d=h[0],b=h[1];return Object(O.jsx)(p.Provider,{value:{fetchUsersData:n,fetchUsers:r,fetchPostsData:i,fetchPosts:j,fetchPostData:d,fetchPost:b},children:e.children})}),m=s(10),g=s(2);var v=function(e){return Object(O.jsxs)("article",{className:"mt-5 article",children:[Object(O.jsx)("h2",{className:"text-white-3d",children:"Overview:"}),Object(O.jsx)("p",{children:"Open the browser console to see log statements of the underlying operations."}),Object(O.jsxs)("div",{className:"text-center",children:[Object(O.jsx)("button",{className:"btn btn-outline-gray me-3",onClick:function(){return e.history.push({pathname:"/posts",search:"?forceRefresh=true"})},style:{minWidth:160},children:"Force Refresh Posts"}),Object(O.jsx)("button",{className:"btn btn-outline-gray",onClick:function(){return e.history.push("/posts")},style:{minWidth:160},children:"Go To Posts"})]}),Object(O.jsxs)("div",{className:"horizontal-ruler",children:[Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{})]}),Object(O.jsxs)("p",{children:["The ",Object(O.jsx)("code",{children:"useCache()"})," hook is built on top of Axios. It provides fetching, caching, and cache-busting functionality."]}),Object(O.jsx)("pre",{children:Object(O.jsx)("code",{children:"\n  import { useReducer, useRef } from 'react';\n  import axios                  from 'axios';\n  axios.defaults.validateStatus = function(status){ return true; }; // Default: return status >= 200 && status < 300; \n  \n  \n  /* ====================================================================\n                              Helpers\n  ==================================================================== */\n  \n  \n  function getData(url, config){\n    config = config || { timeout: 1000 * 25 };\n    return axios.get(url, config);\n  }\n  \n  \n  function createTimestamp(){ \n    const timestamp = new Date().getTime();\n    return timestamp;\n  }\n  \n  \n  function getTimestampDifference(t1, t2){\n    if (typeof t1 !== 'number' || typeof t2 !== 'number'){ throw new Error('getTimestampDifference only accepts numbers.'); }\n    let earlierTimestamp = t1;\n    let laterTimestamp   = t2;\n    if (t1 > t2){\n      earlierTimestamp = t2;\n      laterTimestamp   = t1;\n    }\n    const difference = laterTimestamp - earlierTimestamp;\n    return difference;\n  }\n  \n  \n  function exceedsMaxAge(t1, t2, maxAge){ \n    if (typeof t1 !== 'number' || typeof t2 !== 'number' || typeof maxAge !== 'number'){ \n      throw new Error('exceedsMaxAge only accepts numbers.'); \n    }\n    const difference = getTimestampDifference(t1, t2);\n    if (difference > maxAge){ return true; }\n    return false;\n  }\n  \n  \n  /* ====================================================================\n                              reducer\n  ==================================================================== */\n  \n  \n  const reducer = (state, action) => {\n    switch (action.type) {\n      case 'LOADING':  \n      console.log(\"Loading at:\", new Date().toLocaleTimeString('en-US'));    \n        return { \n          ...state, \n          loading: true,\n          loaded: false,\n          data: null, \n          error: null \n        };\n  \n      case 'LOADED_CACHE': \n        console.log(\"Loaded data from cache at:\", new Date().toLocaleTimeString('en-US'));\n        return { \n          ...state,         \n          loading: false,\n          loaded: true,         \n          data: action.payload,  \n          error: null\n        };\n      \n      case 'LOADED_NEW': \n        console.log(\"Loaded data from API response at:\", new Date().toLocaleTimeString('en-US'));\n        return { \n          ...state, \n          loading: false, \n          loaded: true, \n          data: action.payload,\n          error: null\n        };\n  \n      case 'ERROR':    \n        console.log(\"Error occurred at:\", new Date().toLocaleTimeString('en-US'));\n        return { \n          ...state, \n          loading: false, \n          loaded: false, \n          data: null,\n          error: action.payload \n        };\n  \n      default: \n        return state;\n    }\n  };\n  \n  \n  /* ====================================================================\n                              useCache\n  ==================================================================== */\n  \n  \n  const useCache = (maxAge = 1000 * 60 * 5) => {\n    const cache = useRef({});\n  \n    const initialState = {\n      maxAge:  maxAge, // Defaults to 5 minutes.\n      loading: false,\n      loaded:  false, \n      data:    null,  \n      error:   null\n    };\n    \n    const [ state, dispatch ] = useReducer(reducer, initialState);\n  \n  \n    const fetchData = (url, config = null, forceRefresh = false) => {\n      if (!url){ return; }\n      if (state.loading){ return; }\n  \n      \n      dispatch({ type: 'LOADING' });\n  \n      \n      if (!forceRefresh){ \n        if (cache.current[url]){\n          const cachedData = cache.current[url];\n          dispatch({ type: 'LOADED_CACHE', payload: cachedData });\n          return; // DO NOT PROCEED IF YOU HAVE CACHED DATA! \n        }\n      } \n  \n  \n      setTimeout(() => { // Delayed response for demo only.\n        getData(url, config)\n        .then(res  => { \n          if (res.status >= 200 && res.status < 300 && res.data){\n            res.data.cachedAt  = createTimestamp();\n            cache.current[url] = res.data;\n            dispatch({ type: 'LOADED_NEW', payload: res.data });\n  \n            // Cache Busting!\n            setTimeout(function(){\n              const now         = createTimestamp();\n              const dataExpired = exceedsMaxAge(cache.current[url].cachedAt, now, maxAge);\n              if (dataExpired){\n                delete cache.current[url]; \n              } \n            }, maxAge + 1000);\n          } else {\n            // Axios is currently set up such that NO STATUS CODE WILL GO TO THE CATCH BLOCK.\n            dispatch({ type: 'ERROR', payload: res.data });\n          }\n        })\n        .catch(err => {\n          dispatch({ type: 'ERROR', payload: err }); \n        });\n      }, 1000);\n    };\n  \n    return [ state, fetchData ];\n  };\n  \n  \n  export default useCache;\n  \n      "})}),Object(O.jsxs)("p",{children:["It returns a ",Object(O.jsx)("code",{children:"fetchData"})," function, and ",Object(O.jsx)("code",{children:"state"}),"associated to the data request (i.e., cached data, or new API call)."]}),Object(O.jsx)("pre",{children:Object(O.jsx)("code",{children:"\n  {\n    maxAge:  Number, // milliseconds\n    loading: Boolean,\n    loaded:  Boolean, \n    data:    [] | {} | ...\n    error:   null | {}\n  }\n      "})}),Object(O.jsx)("p",{children:"It is important that the hook be implemented at a higher level than the component presenting the data. The current demo implements the hook inside of Context.js:"}),Object(O.jsx)("pre",{children:Object(O.jsx)("code",{children:"\n  import React, { createContext } from 'react';\n  import useCache                 from './hooks/useCache';\n\n\n  export const Context  = createContext({});\n  export const Consumer = Context.Consumer;\n\n\n  export const Provider = (props) => {\n\n    // Admittedly, the naming conventions are confusing.\n    //      state,          fetchData   \n    const [ fetchUsersData, fetchUsers ] = useCache(1000 * 60); \n    const [ fetchPostsData, fetchPosts ] = useCache(1000 * 60); \n    const [ fetchPostData,  fetchPost  ] = useCache(1000 * 60); \n\n\n    return (\n      <Context.Provider \n        value={{ \n          fetchUsersData, fetchUsers,\n          fetchPostsData, fetchPosts,\n          fetchPostData,  fetchPost\n        }}\n      >\n        { props.children }\n      </Context.Provider>\n    );\n  };\n      "})}),Object(O.jsx)("p",{children:"Usage looks something like this:"}),Object(O.jsx)("pre",{children:Object(O.jsx)("code",{children:"\n  function PostsPage(props){\n    const { value: { fetchPostsData, fetchPosts } } = props;\n    const { \n      loading: loadingPosts, \n      loaded:  loadedPosts, \n      data:    postsData, \n      error:   postsDataError \n    } = fetchPostsData;\n  \n  \n    const showSpinner = loadingPosts   && !loadedPosts;\n    const showError   = postsDataError && !loadingPosts && !loadedPosts;\n    const showData    = loadedPosts    && Array.isArray(postsData) && postsData.length > 0; \n  \n  \n    useEffect(() => { \n      if (props.location.search){\n        const params = getAllUrlParams(decodeURIComponent(props.location.search));\n  \n        if (params.forceRefresh && params.forceRefresh === 'true'){\n          fetchPosts('https://jsonplaceholder.typicode.com/posts?_limit=10', null, true); \n        } else {\n          fetchPosts('https://jsonplaceholder.typicode.com/posts?_limit=10'); \n        }\n      } else {\n        fetchPosts('https://jsonplaceholder.typicode.com/posts?_limit=10'); \n      }\n    }, []); // eslint-disable-line react-hooks/exhaustive-deps\n  \n  \n    const renderPosts = () => {\n      if (showSpinner){   return ... } \n      if (showError){     return ... }\n      else if (showData){ return ... }\n      return null; \n    };\n  \n  \n    return (\n      <React.Fragment>\n        { renderPosts() } \n      </React.Fragment>     \n    );\n  }\n      "})}),Object(O.jsxs)("p",{children:["When cached data exists, it will attempt to show that data instead of making a new API request. However, if the cached data has exceeded ",Object(O.jsx)("code",{children:"maxAge"})," a new API request will be made and the cache will be updated. Additionally, one may pass ",Object(O.jsx)("code",{children:"?forceRefresh=true"}),". Then on the associated page some code should be set up to check for query parameters:"]}),Object(O.jsx)("pre",{children:Object(O.jsx)("code",{children:"\n  useEffect(() => { \n    if (props.location.search){\n      const params = getAllUrlParams(decodeURIComponent(props.location.search));\n\n      if (params.forceRefresh && params.forceRefresh === 'true'){\n        fetchPosts('https://jsonplaceholder.typicode.com/posts?_limit=10', null, true); \n      } else {\n        fetchPosts('https://jsonplaceholder.typicode.com/posts?_limit=10'); \n      }\n    } else {\n      fetchPosts('https://jsonplaceholder.typicode.com/posts?_limit=10'); \n    }\n  }, []); // eslint-disable-line react-hooks/exhaustive-deps\n      "})}),Object(O.jsxs)("p",{children:["With this setup one can force a data refresh. This is especially important after a user has updated their information and is programmatically redirected to the corresponding page. Otherwise, it will ",Object(O.jsx)("em",{children:"appear"})," as though the ",Object(O.jsx)("code",{children:"POST"}),", ",Object(O.jsx)("code",{children:"PUT"}),", ",Object(O.jsx)("code",{children:"PATCH"}),", or ",Object(O.jsx)("code",{children:"DELETE"})," reqiests did not occur. For other caching solutions see ",Object(O.jsx)("a",{href:"https://react-query.tanstack.com",target:"_blank",rel:"noreferrer",children:"React Query"})," and ",Object(O.jsx)("a",{href:"https://swr.vercel.app",target:"_blank",rel:"noreferrer",children:"SWR"}),"."]}),Object(O.jsxs)("p",{children:["I don't know if it's possible, but one might also try to remove ",Object(O.jsx)("code",{children:"?forceRefesh=true"})," in cases where the user is going back using the browser's back button."]}),Object(O.jsxs)("p",{children:[Object(O.jsx)("strong",{children:"Note:"})," this system will not persist data across refreshes. In most cases that shouldn't be necessary, excepting login data. For that use a ",Object(O.jsx)("code",{children:"useLocalStorage()"})," hook."]})]})};var y=function(e){var t=e.variant,s=void 0===t?"":t,n=e.classes,r=void 0===n?"":n,c=e.size,a=void 0===c?50:c,o=e.style,j=void 0===o?{}:o,l=e.containerStyle,h=void 0===l?{}:l,d=e.containerClasses,b=void 0===d?"":d,x=e.useContainer,u=function(){return s&&r?"spinner-border text-".concat(s," ").concat(r):s&&!r?"spinner-border text-".concat(s):!s&&r?"spinner-border ".concat(r):"spinner-border"};return void 0!==x&&x||b||!function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0}(h)?Object(O.jsx)("div",{className:b,style:h,children:Object(O.jsx)("div",{className:u(),style:Object(i.a)({width:a,height:a},j),role:"status",children:Object(O.jsx)("span",{className:"visually-hidden",children:"Loading..."})})}):Object(O.jsx)("div",{className:u(),style:Object(i.a)({width:a,height:a},j),role:"status",children:Object(O.jsx)("span",{className:"visually-hidden",children:"Loading..."})})};var w=function(e){var t=e.value,s=t.fetchUsersData,n=t.fetchUsers,r=s.loading,c=s.loaded,a=s.data,i=s.error,j=r&&!c,l=i&&!r&&!c,h=c&&Array.isArray(a)&&a.length>0;return Object(O.jsxs)(o.a.Fragment,{children:[Object(O.jsx)("h2",{className:"my-5 text-white-3d text-center",children:"Users"}),Object(O.jsxs)("div",{className:"horizontal-ruler",children:[Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{})]}),Object(O.jsx)("div",{className:"mb-5 text-center",children:Object(O.jsx)("button",{className:"btn btn-outline-gray",onClick:function(){n("https://jsonplaceholder.typicode.com/users")},children:"Manually Get Users "})}),j?Object(O.jsx)(y,{size:75,variant:"pink",style:{filter:"drop-shadow(0px 1px 1px rgba(0,0,0,0.5))"},containerClasses:"d-inline-block",containerStyle:{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%"},useContainer:!1}):l?Object(O.jsx)("h1",{className:"text-pink text-center",style:{fontFamily:"Montserrat",textShadow:"0px 1px 2px rgba(0,0,0,0.25"},children:"An error occurred!"}):h?Object(O.jsx)(o.a.Fragment,{children:a.map((function(e){return Object(O.jsxs)("div",{className:"mx-auto mb-5 bg-light p-3 border border-dark rounded-3 shadow-sm",style:{maxWidth:600},children:[Object(O.jsxs)("p",{children:[Object(O.jsx)("strong",{children:"Name:"})," ",e.name]}),Object(O.jsxs)("p",{className:"mb-0",children:[Object(O.jsx)("strong",{children:"Email:"})," ",e.email]})]},e.id)}))}):null]})};function C(e){var t="";e?t=e.split("?")[1]:window.location.search?t=window.location.search.slice(1):window.location.hash&&(console.log("hash worked."),t=window.location.hash.split("?")[1]);var s={};if(t)for(var n=(t=t.split("#")[0]).split("&"),r=0;r<n.length;r++){var c=n[r].split("="),a=c[0],o="undefined"===typeof c[1]||c[1];if(a.match(/\[(\d+)?\]$/)){var i=a.replace(/\[(\d+)?\]/,"");if(s[i]||(s[i]=[]),a.match(/\[\d+\]$/)){var j=/\[(\d+)\]/.exec(a)[1];s[i][j]=o}else s[i].push(o)}else s[a]?s[a]&&"string"===typeof s[a]?(s[a]=[s[a]],s[a].push(o)):s[a].push(o):s[a]=o}return s}var D=function(e){var t=e.value,s=t.fetchPostsData,n=t.fetchPosts,r=s.loading,c=s.loaded,i=s.data,j=s.error,l=r&&!c,h=j&&!r&&!c,d=c&&Array.isArray(i)&&i.length>0;return Object(a.useEffect)((function(){if(e.location.search){var t=C(decodeURIComponent(e.location.search));t.forceRefresh&&"true"===t.forceRefresh?n("https://jsonplaceholder.typicode.com/posts?_limit=10",null,!0):n("https://jsonplaceholder.typicode.com/posts?_limit=10")}else n("https://jsonplaceholder.typicode.com/posts?_limit=10")}),[]),Object(O.jsxs)(o.a.Fragment,{children:[Object(O.jsx)("h2",{className:"my-5 text-white-3d text-center",children:"Posts"}),Object(O.jsxs)("div",{className:"horizontal-ruler",children:[Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{})]}),l?Object(O.jsx)(y,{size:75,variant:"pink",style:{filter:"drop-shadow(0px 1px 1px rgba(0,0,0,0.5))"},containerClasses:"d-inline-block",containerStyle:{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%"},useContainer:!1}):h?Object(O.jsx)("h1",{className:"text-pink text-center",style:{fontFamily:"Montserrat",textShadow:"0px 1px 2px rgba(0,0,0,0.25"},children:"An error occurred!"}):d?Object(O.jsx)("ul",{className:"users-list w-90 mx-auto mb-5 list-group list-group-flush border border-dark rounded-3 shadow-sm overflow-hidden",children:i.map((function(e){return Object(O.jsx)("li",{className:"d-flex align-items-center list-group-item list-group-item-action",children:Object(O.jsxs)(m.b,{className:"custom-link",to:{pathname:"/posts/".concat(e.id),search:"?title=".concat(e.title)},children:["Title: ",e.title]})},e.id)}))}):null]})};var N=function(e){var t=e.value,s=t.fetchPostData,n=t.fetchPost,r=s.loading,i=s.loaded,j=s.data,l=s.error,h=Object(a.useState)("?"),d=Object(c.a)(h,2),b=d[0],x=d[1],u=r&&!i,p=l&&!r&&!i,f=i&&!function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0}(j);return Object(a.useEffect)((function(){e.match.params.id&&n("https://jsonplaceholder.typicode.com/posts/".concat(e.match.params.id))}),[]),Object(a.useEffect)((function(){if(e.location.search){var t=C(decodeURIComponent(e.location.search));t.title&&x(t.title)}}),[e.location.search]),Object(O.jsxs)(o.a.Fragment,{children:[Object(O.jsx)("h2",{className:"mt-5 text-white-3d text-center",children:b}),Object(O.jsxs)("div",{className:"horizontal-ruler",children:[Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{})]}),u?Object(O.jsx)(y,{size:75,variant:"pink",style:{filter:"drop-shadow(0px 1px 1px rgba(0,0,0,0.5))"},containerClasses:"d-inline-block",containerStyle:{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%"},useContainer:!1}):p?Object(O.jsx)("h1",{className:"text-pink text-center",style:{fontFamily:"Montserrat",textShadow:"0px 1px 2px rgba(0,0,0,0.25"},children:"An error occurred!"}):f?Object(O.jsxs)("div",{className:"mx-auto mb-5 bg-light p-3 border border-dark rounded-3 shadow-sm",style:{maxWidth:600},children:[Object(O.jsxs)("p",{children:[Object(O.jsx)("strong",{children:"Title:"})," ",j.title]}),Object(O.jsxs)("p",{className:"mb-0",children:[Object(O.jsx)("strong",{children:"Body:"})," ",j.body]})]}):null]})};var A=function(){return Object(O.jsxs)(o.a.Fragment,{children:[Object(O.jsx)("h1",{className:"my-5 text-center",style:{color:"#FF355E",fontFamily:"Creepster",fontSize:64,textShadow:"0px 2px 4px rgba(0,0,0,0.5)"},children:"Not Found!!!"}),Object(O.jsxs)("div",{className:"horizontal-ruler red",children:[Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{}),Object(O.jsx)("hr",{})]}),Object(O.jsx)("div",{className:"mx-auto",style:{width:"40%"},children:Object(O.jsxs)("svg",{style:{margin:"0 auto",width:"100%",filter:"drop-shadow(0px 2px 4px rgba(0,0,0,0.5))"},viewBox:"0 0 512 512",fill:"#FF355E",children:[Object(O.jsx)("path",{d:"M296.606,364.393l-29.999-30c-5.857-5.858-15.355-5.858-21.213,0l-30,30C205.985,373.801,212.646,390,226,390H286 C299.304,390,306.05,373.836,296.606,364.393z"}),Object(O.jsx)("path",{d:"M165.999,179.997c-41.355,0-75.001,33.645-75.001,75.001c0,41.355,33.645,75.001,75.001,75.001S241,296.354,241,254.997 C241,213.642,207.354,179.997,165.999,179.997z M165.999,300.198c-24.813,0-45.2-20.387-45.2-45.2s20.387-45.2,45.2-45.2 s45.2,20.387,45.2,45.2S190.812,300.198,165.999,300.198z"}),Object(O.jsx)("path",{d:"M346.001,179.997c-41.355,0-75.001,33.645-75.001,75.001c0,41.355,33.645,75.001,75.001,75.001 c41.355,0,75.001-33.645,75.001-75.001S387.356,179.997,346.001,179.997z M346.001,300.198c-24.813,0-45.2-20.387-45.2-45.2 s20.387-45.2,45.2-45.2s45.201,20.387,45.201,45.2S370.814,300.198,346.001,300.198z"}),Object(O.jsx)("path",{d:"M476.108,270.988c15.607-74.732-7.02-151.096-61.007-205.086v-0.001C372.602,23.404,316.099,0,256,0 C195.901,0,139.398,23.404,96.898,65.902c-53.869,53.87-76.716,130.182-61.007,205.091c-6.143,17.917-6.485,37.065-0.951,55.682 c9.404,31.617,35.56,54.97,68.461,61.251c3.795,1.08,4.018,0.017,11.46,1.242c2.047,0.337,4.001,0.621,6.139,0.763L121,447.954 c0,18.193,10.705,34.432,27.272,41.369c24.699,10.343,63.434,22.671,107.706,22.675c0.008,0,0.015,0.001,0.023,0.001 c0.008,0,0.016-0.001,0.023-0.001c44.269-0.004,83.006-12.333,107.709-22.676c16.565-6.938,27.269-23.176,27.269-41.367v-58.095 c2.077-0.139,4.014-0.403,6.046-0.714c7.929-1.213,8.245-0.09,12.239-1.437c32.914-6.607,58.868-30.138,68.004-61.833 C482.584,307.52,482.162,288.646,476.108,270.988z M448.465,317.568c-6.117,21.222-23.856,36.907-46.311,40.962 c-12.258,0.374-10.552,2.829-23.167,0.267c-9.289-1.887-17.985,5.224-17.985,14.7v74.458c0,6.066-3.477,11.442-8.856,13.696 c-5.484,2.296-12.864,4.862-21.343,7.605v-32.457c0-8.284-6.516-14.8-14.8-14.8c-8.284,0-15,6.716-15,15v40.324 c-9.389,1.89-19.669,3.176-30.2,3.93V436.8c0-8.284-6.516-14.8-14.8-14.8c-8.284,0-15,6.716-15,15v44.453 c-10.531-0.753-20.811-2.44-30.2-4.329V436.8c0-8.284-6.516-14.8-14.8-14.8s-15,6.716-15,15v32.457 c-8.478-2.743-15.658-5.509-21.141-7.805c-5.382-2.254-9.059-7.83-9.059-13.897l0.002-74.45c0-9.462-8.482-16.39-17.784-14.501 c-13.377,2.716-10.435,0.035-23.659-0.285c-21.986-4.08-39.448-19.506-45.661-40.396c-4.049-13.621-3.459-27.605,1.707-40.441 c1.144-2.843,1.39-5.968,0.705-8.954c-15.458-67.379,5.15-134.755,52.005-181.612C154.945,50.284,203.914,29.8,256,29.8 s101.055,20.483,137.887,57.314c47.708,47.711,67.151,115.603,52.006,181.611c-0.685,2.987-0.439,6.112,0.705,8.954 C451.693,290.339,452.338,304.132,448.465,317.568z"})]})})]})},E=function(e){var t=e.value;return Object(O.jsxs)(g.c,{children:[Object(O.jsx)(g.a,{exact:!0,path:"/",render:function(e){return Object(O.jsx)(v,Object(i.a)(Object(i.a)({},e),{},{value:t}))}}),Object(O.jsx)(g.a,{exact:!0,path:"/users",render:function(e){return Object(O.jsx)(w,Object(i.a)(Object(i.a)({},e),{},{value:t}))}}),Object(O.jsx)(g.a,{exact:!0,path:"/posts",render:function(e){return Object(O.jsx)(D,Object(i.a)(Object(i.a)({},e),{},{value:t}))}}),Object(O.jsx)(g.a,{path:"/posts/:id",render:function(e){return Object(O.jsx)(N,Object(i.a)(Object(i.a)({},e),{},{value:t}))}}),Object(O.jsx)(g.a,{component:A})]})};var P=function(e){var t=e.title,s=void 0===t?null:t,n=e.headerContent,r=void 0===n?null:n,i=e.bodyContent,j=void 0===i?Object(O.jsx)("div",{className:"p-5 bg-light text-center border rounded-3",children:"Body Content Goes Here..."}):i,l=e.position,h=void 0===l?"start":l,d=e.backdrop,b=void 0!==d&&d,x=e.closeButton,u=void 0===x||x,p=e.closeButtonTheme,f=void 0===p?"default":p,m=e.scrollable,g=void 0!==m&&m,v=e.classes,y=void 0===v?"":v,w=e.style,C=void 0===w?{}:w,D=document.getElementsByTagName("html")[0],N=document.getElementsByTagName("body")[0],A=Object(a.useRef)(),E=Object(a.useRef)(),P=Object(a.useRef)(),k=Object(a.useState)(!1),T=Object(c.a)(k,2),R=T[0],L=T[1],S=Object(a.useState)(!1),U=Object(c.a)(S,2),F=U[0],I=U[1];Object(a.useEffect)((function(){var e=function(e){e.target.contains(A.current)&&R&&e.target!==E.current&&e.target.parentElement!==E.current&&_()};return N.addEventListener("click",e),function(){N.removeEventListener("click",e)}}),[R,N]);var _=function(){if(A.current){var e=A.current;e.classList.contains("show")&&(e.classList.remove("show"),L(!1),b&&P.current&&P.current.classList.remove("show"),setTimeout((function(){e.style.visibility="hidden",g||(D.style.overflow="",N.style.overflow="")}),300),setTimeout((function(){b&&I(!1)}),250))}};return Object(O.jsxs)(o.a.Fragment,{children:[Object(O.jsxs)("div",{ref:A,className:y?"offcanvas offcanvas-".concat(h," ").concat(y):"offcanvas offcanvas-".concat(h),style:C,tabIndex:"-1",children:[r&&Object(O.jsxs)("div",{className:"offcanvas-header",children:["function"!==typeof r?r:r(),u&&Object(O.jsx)("button",{className:"white"===f?"btn-close btn-close-white text-reset":"btn-close text-reset",type:"button",onClick:_})]}),!r&&s&&Object(O.jsxs)("div",{className:"offcanvas-header",children:[Object(O.jsx)("h5",{className:"offcanvas-title",children:s}),u&&Object(O.jsx)("button",{className:"btn-close text-reset",type:"button",onClick:_})]}),Object(O.jsx)("div",{className:"offcanvas-body",children:"function"!==typeof j?j:j()})]}),Object(O.jsx)("button",{ref:E,id:"custom-toggler",className:"navbar-toggler",type:"button",onClick:function(){if(A.current){var e=A.current;e.classList.contains("show")?e.classList.contains("show")&&_(e):function(){if(A.current){var e=A.current;e.classList.contains("show")||(b&&(document.querySelector(".modal-backdrop.show")||(I(!0),setTimeout((function(){P.current&&P.current.classList.add("show")}),100))),g||(D.style.overflow="hidden",N.style.overflow="hidden"),e.style.visibility="visible",e.classList.add("show"),L(!0))}}()}},style:"end"===h?{left:25,right:0}:{},children:Object(O.jsx)("span",{className:"navbar-toggler-icon"})}),F&&Object(O.jsx)("div",{ref:P,className:"modal-backdrop fade",onClick:_})]})},k=function(e){return Object(O.jsx)(P,{title:"not used",headerContent:function(){return Object(O.jsx)(m.b,{className:"navbar-brand p-0 fs-1 lh-1 link-light",style:{fontFamily:"Montserrat"},to:"/",children:"WebTek"})},bodyContent:function(){return Object(O.jsx)("nav",{id:"primary-navigation",children:Object(O.jsxs)("div",{className:"container-fluid",children:[Object(O.jsx)(m.c,{className:"nav-link",activeClassName:"active-link",exact:!0,to:"/",children:"Home"}),Object(O.jsx)(m.c,{className:"nav-link",activeClassName:"active-link",to:"/users",children:"Users"}),Object(O.jsx)(m.c,{className:"nav-link",activeClassName:"active-link",to:"/posts",children:"Posts"})]})})},backdrop:!0,position:"start",scrollable:!1,closeButton:!0,closeButtonTheme:"white",classes:"bg-deep-space",style:{borderRight:"2px solid #000"}})};s(57),s(58),s(59);var T=function(){var e=Object(a.useContext)(p);return Object(O.jsxs)(m.a,{children:[Object(O.jsx)("header",{id:"primary-header",children:Object(O.jsx)(k,{})}),Object(O.jsx)("main",{className:"pb-5",children:Object(O.jsx)("div",{className:"container-fluid pt-3 px-md-5",children:Object(O.jsx)(E,{value:e})})})]})};r.a.render(Object(O.jsx)(f,{children:Object(O.jsx)(T,{})}),document.getElementById("root"))}},[[60,1,2]]]);
//# sourceMappingURL=main.523756ab.chunk.js.map