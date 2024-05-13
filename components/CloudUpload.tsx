"use client";
import { CldImage, CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
interface CloudImageProps {
    value:string,
    disabled:boolean,
    onValueChange: (src:string)=>void

}
export default function CloudUpload({value, disabled,onValueChange}:CloudImageProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(()=>{
        setMounted(true)
    },[])
    if(!mounted){
        return null;
    }
  return (

<div className='space-y-4 w-full justify-center items-center'>
<CldUploadButton onUpload={
    (result:any)=> onValueChange(result.info.secure_url)
} options={{
    maxFiles:1
}} uploadPreset='angwcyygq'>


<div className=' h-40 w-40 p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center '>
  <div className=''>
<Image alt='Upload' className=' rounded-lg object-cover' width={100} height={100} src={value||"/img.jpg"}/>
  </div>
</div>
</CldUploadButton>
</div>
  );
}