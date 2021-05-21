export default function getAllUrlParams(url){
  var queryString = '';
  if (url){
    queryString = url.split('?')[1]
  } else if (window.location.search){
    queryString = window.location.search.slice(1);
  } else if (window.location.hash){
    console.log("hash worked.");
    queryString = window.location.hash.split('?')[1];
  }


  var obj = {}; 


  if (queryString){
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&'); 

    for (var i = 0; i < arr.length; i++) {
      var a          = arr[i].split('=');
      var paramName  = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      if (paramName.match(/\[(\d+)?\]$/)){
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]){ obj[key] = []; }

        if (paramName.match(/\[\d+\]$/)) {
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          obj[key].push(paramValue);
        }
      } else {
        if (!obj[paramName]){ // eslint-disable-line no-lonely-if
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}
