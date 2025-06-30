import { cookies } from "next/headers";

export async function POST(req:Request){

   if(!(await cookies()).get("jwtToken1")?.value){
    return new Response("Unauthorized",{
        status:401
    })
   }
   (await cookies()).delete("jwtToken1")
    return new Response("ok",{
        status:200,
        headers:{
               "Redirect":"/login"
        }
    })
}