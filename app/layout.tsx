export const metadata = {
  title: 'Cleaning Business Form',
  description: 'Submit your request for cleaning services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
