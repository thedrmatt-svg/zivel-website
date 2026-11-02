export const HOLLYWOOD_META_PIXEL_ID = "1571435273956274";

// Both the server head and Next.js navigation fallback can run this bootstrap.
// Keep the supplied Meta base code intact inside a consent/route/once guard.
export const HOLLYWOOD_META_PIXEL_BOOTSTRAP = `
(function(w,d){
  if(w.__zivelHollywoodMetaConsentInstalled) return;
  w.__zivelHollywoodMetaConsentInstalled = true;
  function load(){
    if(!/^(?:\\/(?:en|es))?\\/locations\\/florida\\/hollywood(?:\\/|$)/.test(w.location.pathname)) return;
    if(w.__zivelHollywoodMetaLoaded) return;
    w.__zivelHollywoodMetaLoaded = true;
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${HOLLYWOOD_META_PIXEL_ID}');
    fbq('track', 'PageView');
  }
  w.addEventListener('zivel:consent-accept', load);
  function activate(){
    try { if(w.localStorage.getItem('zivel_cookie_consent') === 'accepted') load(); } catch(e) {}
  }
  w.addEventListener('zivel:hollywood-meta-route-ready', activate);
  activate();
})(window,document);
`;

export const HOLLYWOOD_META_PIXEL_NOSCRIPT_HTML =
  `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${HOLLYWOOD_META_PIXEL_ID}&ev=PageView&noscript=1" />`;
