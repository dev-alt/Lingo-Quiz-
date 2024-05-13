import { Fira_Code as FontMono, Inter as FontSans, Roboto as FontRoboto, Open_Sans as FontOpenSans } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontRoboto = FontRoboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: "100"
});

export const fontOpenSans = FontOpenSans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

