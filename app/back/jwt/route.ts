import { cookies } from "next/headers";


export async function POST(req:Request){
    const jwtString= (await req.json()).jwt;

   
    return new Response("ok",{
        status:200,
        headers:{
            "Set-Cookie":`jwtToken1=${jwtString}; expires=30d; path=/; httponly`
         
        }
    })
}
export async function GET(){
    const jwtString= (await cookies()).get("jwtToken1")?.value;

   
    return new Response(JSON.stringify({jwt:jwtString}),{
        status:200,
        
    })
}