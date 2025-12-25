import "./globals.css"
import { Providers } from "./providers"

export const metadata = {
  title: "PeopleFusion Org Chart",
  description: "Employee Organizational Chart",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
