import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { checkSubscription } from "@/lib/subscription";

const RootLayout =async({children}:{
    children:React.ReactNode
})=>{
    const isPro = await checkSubscription();
return(
    <div className="h-full flex ">
        <Navbar isPro={isPro}/>
        <div className="hidden md:w-1/8 md:flex pt-16  flex-col">
        <Sidebar isPro={isPro}/>
        </div>
        <main className="md:pl-8 w-full    pr-4 pt-24 h-full">

{children}


</main>
  
    </div>
)
}

export default RootLayout;