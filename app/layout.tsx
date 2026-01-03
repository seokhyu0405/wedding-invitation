'use client';

import { weddingConfig } from "../src/config/wedding-config";
import StyledComponentsRegistry from "../src/lib/registry";
import { GlobalStyle } from "../src/styles/globalStyles";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <title>{weddingConfig.meta.title}</title>
        <meta name="description" content={weddingConfig.meta.description} />
        <meta property="og:title" content={weddingConfig.meta.title} />
        <meta property="og:description" content={weddingConfig.meta.description} />
        <meta property="og:image" content={weddingConfig.meta.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="웨딩 청첩장" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🕊️</text></svg>" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
        {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
