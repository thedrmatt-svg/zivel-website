export const HOLLYWOOD_GTM_ID = "GTM-NR6P7MB7";

// This bootstrap may run from the server-rendered head and Next's navigation
// fallback. Only one consent listener and one container initialization are allowed.
export const HOLLYWOOD_GTM_BOOTSTRAP = `
(function(w,d){
  if(w.__zivelHollywoodGtmConsentInstalled) return;
  w.__zivelHollywoodGtmConsentInstalled = true;
  function load(){
    if(!/^(?:\\/(?:en|es))?\\/locations\\/florida\\/hollywood(?:\\/|$)/.test(w.location.pathname)) return;
    if(w.__zivelHollywoodGtmLoaded || d.querySelector('script[src^="https://www.googletagmanager.com/gtm.js?id=${HOLLYWOOD_GTM_ID}"]')) return;
    w.__zivelHollywoodGtmLoaded = true;
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(w,d,'script','dataLayer','${HOLLYWOOD_GTM_ID}');
  }
  w.addEventListener('zivel:consent-accept', load);
  function activate(){
    try { if(w.localStorage.getItem('zivel_cookie_consent') === 'accepted') load(); } catch(e) {}
  }
  w.addEventListener('zivel:hollywood-route-ready', activate);
  activate();
})(window,document);
`;

export const HOLLYWOOD_GTM_NOSCRIPT_HTML =
  `<iframe src="https://www.googletagmanager.com/ns.html?id=${HOLLYWOOD_GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
