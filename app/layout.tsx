
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Providers } from "@/components/Providers"
import "./globals.css";

import { Roboto } from "next/font/google"

const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700"] 
})

 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
 