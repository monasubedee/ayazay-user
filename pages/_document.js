import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>

          <meta name="title" content="Aya Zay"></meta>
          <meta charSet="utf-8"></meta>

          <meta name="description" content="Aya Zay Ecommerce" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="ayazay" content="noindex, nofollow" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="AYA is well experienced to serve the customers and we understand their demands. AYA is servicing the country since 11.8.2010 and we are 2nd largest banking/financing service provider with largest infrastructure and network to provide the best in class services to our customers." />
          <meta name="keywords" content="e-commerce myanmar,first myanmar e-commerce,online e-commerce,aya-bank,aya-zay,aya-zay e-commerce,"></meta>
          <meta name="robots" content="index, follow"></meta>
          <meta name="language" content="English"></meta>
          <meta name="theme-color" content="#000000" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://uat-aya-zay.com/" />
          <meta property="og:title" content="Aya Zay User Portal" />
          <meta property="og:description" content="AYA is well experienced to serve the customers and we understand their demands. AYA is servicing the country since 11.8.2010 and we are 2nd largest banking/financing service provider with largest infrastructure and network to provide the best in class services to our customers." />
          <meta property="og:image" content="/images/ayazaylogo.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://uat-aya-zay.com/" />
          <meta property="twitter:title" content="Aya Zay User Portal" />
          <meta property="twitter:description" content="AYA is well experienced to serve the customers and we understand their demands. AYA is servicing the country since 11.8.2010 and we are 2nd largest banking/financing service provider with largest infrastructure and network to provide the best in class services to our customers." />
          <meta property="twitter:image" content="/images/ayazaylogo.png" />

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap" rel="stylesheet" />
          <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          <link rel="icon" href="/images/icon-72x72.png" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-149962487-1"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-149962487-1');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>

        <script>

        </script>
      </Html>
    )
  }
}

export default MyDocument