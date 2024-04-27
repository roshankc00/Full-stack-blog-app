"use client";
import { Provider } from "react-redux";
import { Inter } from "next/font/google";
import "./globals.css";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <Provider store={store}>
          <body className={inter.className}>{children}</body>
        </Provider>
        {/* </PersistGate> */}
      </>
    </html>
  );
}
