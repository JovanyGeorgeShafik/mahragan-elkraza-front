import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req:Request){
    let jwtString= (await req.json()).jwt;

   
    return new Response("ok",{
        status:200,
        headers:{
            "Set-Cookie":`jwtToken1=${jwtString}; expires=30d; path=/; httponly`
         
        }
    })
}
export async function GET(req:Request){
    let jwtString= (await cookies()).get("jwtToken1")?.value;

   
    return new Response(JSON.stringify({jwt:jwtString}),{
        status:200,
        
    })
}