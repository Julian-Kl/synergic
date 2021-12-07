import { HelmetData } from 'react-helmet-async'

export const html = (helmet: HelmetData, body: string): string => `
<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()} lang="de">
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    <meta charset="UTF-8">
    <meta http-equiv="content-language” content="de-de”>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
    <link rel="manifest" href="/favicon/site.webmanifest">
    <link rel="stylesheet" type="text/css" href="/app.css" media="screen">
    <script src="/modernizr-webp.js"></script>
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="app">${body}</div>
  </body>
  <script src="/client.js" defer></script>
</html>
`
