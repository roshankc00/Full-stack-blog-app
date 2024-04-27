"use client";
import { Provider } from "react-redux";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <>
        <body className={inter.className}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <div>
                <Navbar />
                <Toaster />
              </div>
              <div className="mt-2">{children}</div>
            </PersistGate>
          </Provider>
        </body>
      </>
    </html>
  );
}
