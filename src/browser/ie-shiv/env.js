/* eslint-disable */
// cross environment
if (typeof window === 'undefined') {
  window = {}
}

export const {userAgent: UA} = window.navigator || {}

export const isWin = UA.toLowerCase().indexOf('windows') > -1
export const isIE = /*@cc_on!@*/false || UA.indexOf('MSIE') > -1
// http://stackoverflow.com/questions/31757852/how-can-i-detect-internet-explorer-ie-and-microsoft-edge-using-javascript
export function checkIEVersion () {
  var rv = -1 // Return value assumes failure.

  if (navigator.appName == 'Microsoft Internet Explorer'){

    var ua = navigator.userAgent,
      re  = new RegExp('MSIE ([0-9]{1,}[\\.0-9]{0,})')

    if (re.exec(ua) !== null){
     rv = parseFloat( RegExp.$1 )
    }
  }
  else if(navigator.appName == "Netscape"){
    /// in IE 11 the navigator.appVersion says 'trident'
    /// in Edge the navigator.appVersion does not say trident
    if(navigator.appVersion.indexOf('Trident') === -1) rv = 12
    else rv = 11
  }

  return {
    rv,
    lteIE8: isIE && ieVersion <= 8 || ( UA.indexOf('MSIE 6.0') > -1 || UA.indexOf('MSIE 7.0') > -1 || UA.indexOf('MSIE 8.0') > -1 )
  }
}
/* eslint-enable */

//   isIE ? 'ie-browser' : 'non-ie',
//   ieVersion ? `ie-browser-${ieVersion}` : '',
//   lteIE8 ? 'ie-lte8' : ''
// ].filter(x => x)
