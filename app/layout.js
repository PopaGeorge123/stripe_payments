import { Inter } from "next/font/google";
import Styles from "../styles/globals.css";
import Navbar from "@/components/navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Topia Rank",
  description: "Upload you service or your product and get more visibility",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app_backgroud">
        <Navbar />
        {children}
        </body>
    </html>
  );
}
