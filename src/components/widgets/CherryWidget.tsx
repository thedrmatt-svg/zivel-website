export default function CherryWidget() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
    (function (w, d, s, o, f, js, fjs) {
        w[o] = w[o] || function () {
            (w[o].q = w[o].q || []).push(arguments);
        };
        (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
        js.id = o;
        js.src = f;
        js.async = 1;
        fjs.parentNode.insertBefore(js, fjs);
    })(window, document, "script", "_hw", "https://files.withcherry.com/widgets/widget.js");

    _hw("init", {
        debug: false,
        variables: {
            slug: 'zivel',
            name: "Zivel",
            images: [26],
            customLogo: '',
            defaultPurchaseAmount: 750,
            imageCategory: 'medspa',
            language: 'en',
        },
        styles: {
            primaryColor: '#cab14c',
            secondaryColor: '#0f766e10',
            fontFamily: 'Montserrat',
            headerFontFamily: 'Montserrat',
            floatingEstimator: {
                position: 'bottom-right',
                offset: { x: '20px', y: '20px' },
                zIndex: 9999,
                ctaFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                ctaColor: '#cab14c',
                ctaTextColor: '#FFFFFF'
            }
        }
    }, ['floatingEstimator']);
`,
        }}
      />
      <div id="floatingEstimator" />
    </>
  );
}
