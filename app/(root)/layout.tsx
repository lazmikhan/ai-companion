import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

const RootLayout =({children}:{
    children:React.ReactNode
})=>{
return(
    <div className="h-full flex ">
        <Navbar/>
        <div className="hidden md:w-1/8 md:flex pt-16  flex-col">
        <Sidebar/>
        </div>
        <main className="md:pl-8 w-full    pr-4 pt-24 h-full">

{children}


</main>
  
    </div>
)
}

export default RootLayout;