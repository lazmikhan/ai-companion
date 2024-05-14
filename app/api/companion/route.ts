import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const  POST =async (req:Request)=>
{
try{
const body = await req.json();
const user = await currentUser();
const {src,name, description, instructions,seed,categoryId}=body;
if(!user||!user.id||!user.firstName){
    return new NextResponse("Unauthorized", {status:401});
}
if(!src||!name||!description||!instructions||!seed)
    {
        return new NextResponse("Missing required fields", {status:400})
    }

const companion = await prismadb.companion.create({
    data:{
        categoryId,
        userId:user.id,
        username: user.firstName,
        src,
        name,
        description,
        instructions,
        seed
    }
})
return NextResponse.json(companion);
}catch(error){
console.log("[COMPANION_POST]",error);
return new NextResponse("internal error", {status:500});
}
}