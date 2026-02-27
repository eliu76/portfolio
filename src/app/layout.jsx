import "./globals.css";

export const metadata = {
  title: "Evan Liu — Software Engineer",
  description:
    "Software engineer specializing in web development and machine learning. CS graduate from University of Maryland, 2025.",
  openGraph: {
    title: "Evan Liu — Software Engineer",
    description:
      "Software engineer specializing in web development and machine learning.",
    url: "https://evanliu.dev",
    siteName: "Evan Liu",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evan Liu — Software Engineer",
    description:
      "Software engineer specializing in web development and machine learning.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = 'manual'; window.scrollTo(0, 0);`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
