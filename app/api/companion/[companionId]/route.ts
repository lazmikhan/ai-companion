
import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const  PATCH =async (req:Request,{params}:{params:{companionId:string}})=>
{
try{
const body = await req.json();
const user = await currentUser();
const {src,name, description, instructions,seed,categoryId}=body;
if(!params.companionId)
    {
        return new NextResponse("Companion ID is required", {status:400});
    }
if(!user||!user.id||!user.firstName){
    return new NextResponse("Unauthorized", {status:401});
}
const companionUnique = await prismadb.companion.findUnique({
    where:{id:params.companionId}
})
if(user.id!==companionUnique?.userId){
    return new NextResponse("Unauthorized", {status:401});
}
if(!src||!name||!description||!instructions||!seed)
    {
        return new NextResponse("Missing required fields", {status:400})
    }
  
const companion = await prismadb.companion.update({
    where:{id:params.companionId},
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
console.log("[COMPANION_PATCH]",error);
return new NextResponse("internal error", {status:500});
}
}

export async function DELETE( request:Request,
    {params}:{params:{companionId:string}}){
   try{
const {userId}=auth();
if(!userId){
return new NextResponse("Unauthorized",{status:401})
}
const companion = await prismadb.companion.delete({
    where:{
        userId,
        id:params.companionId
    }
})
return new NextResponse("Deleted",{status:200})
   }
   catch(error)
   {
return new NextResponse("Internal server error",{status:500})
   }
}