import React from 'react';
import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"
export const dynamic = "force-static";
const RootLayout = ({children}) => {
  return (
    <div className="overflow-x-hidden">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;