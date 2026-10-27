import Script from "next/script";

const GTM_ID = "GTM-5XRKPB32";

/**
 * Use in campaign document heads only. Riverton keeps its existing loader.
 * The guard prevents repeat initialization if this bootstrap runs again.
 */
export function CampaignGoogleTagManagerHead({
  consentRequired = false,
}: {
  consentRequired?: boolean;
}) {
  const bootstrap = `
(function(){
  function load(){
    if(window.__zivelCampaignGtmLoaded || document.querySelector('script[src^="https://www.googletagmanager.com/gtm.js?id=${GTM_ID}"]')) return;
    window.__zivelCampaignGtmLoaded = true;
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  }
  ${consentRequired ? `
  window.addEventListener('zivel:consent-accept', load);
  try { if(localStorage.getItem('zivel_cookie_consent') === 'accepted') load(); } catch(e) {}
  ` : "load();"}
})();`;

  return (
    <>
      <script id="gtm-campaign" dangerouslySetInnerHTML={{ __html: bootstrap }} />
      {/* Head scripts execute on document loads; Next Script also covers client navigation. */}
      <Script
        id={consentRequired ? "gtm-campaign-consent-navigation" : "gtm-campaign-immediate-navigation"}
        strategy="afterInteractive"
      >
        {bootstrap}
      </Script>
    </>
  );
}

/** Only use on documents without a cookie-consent requirement. */
export function CampaignGoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
