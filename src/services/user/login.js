import { prisma } from "e:/instant-back-end/course-pharmacy-master/src";
import * as functions from "../../helpers/functions/ResponseHandler.js";

export async function login (req,res,next ){
    try{
        const {email,password}=req.body;
        const user= await prisma.user.findUnique({
            where:{
                email,
            }
        });
        if(!user){
            return functions.badRequestResponse(res,"Email Not Found In Website");
        }
        const enbcyrptpassword= await bcrypt.compare(password, user.password);
     if(!enbcyrptpassword){
        return functions.badRequestResponse(res,"Incorrect Password");
     }
    }
    catch(err){
        next();
    }
}