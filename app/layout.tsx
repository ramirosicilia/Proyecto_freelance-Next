
import Footer from "../app/components/footer/Footer"
import Header from "../app/components/header/Header"
import "../app/styles/global.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    
    >
      <body> 
     
        <Header/>
        
        {children} 

        <Footer/>
        
        </body>
    </html>
  );
}
