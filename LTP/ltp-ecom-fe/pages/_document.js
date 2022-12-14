import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function (w, d, s, l, i) {
                console.log("xxx");
                w[l] = w[l] || [];
                w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
                var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != "dataLayer" ? "&l=" + l : "";
                j.async = true;
                j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
                f.parentNode.insertBefore(j, f);
              })(window, document, "script", "dataLayer", "GTM-54BCTRF");              
            `,
            }}
          />
          <meta
            name="google-site-verification"
            content="-gv04NVb_nnC4UMuoR8Y_vWNtkBUKJAPnRP0EedrkZ8"
          />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                <noscript>
                  <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-54BCTRF"
                    height="0"
                    width="0"
                    style="display:none;visibility:hidden"
                  ></iframe>
                </noscript>;
            `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
