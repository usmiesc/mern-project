const {User}=require("../models")
const {signToken}=require("../utils/auth")

const resolvers={
    Query:{
        me:async(parents,args,context)=>{
            if(context.User){
                const Userdata=await User.findOne({_id:context.user._id})
                return Userdata
            }
            throw new Error("Not logged in")
        }
    },
    Mutation:{
        addUser:async(parents,args)=>{
            const user = await User.create(args)
            const token = signToken(user)
            return {user,token}
        },
        login:async(parents,args)=>{
            const user = await User.findOne({email:args.email})
            if (!user){
                throw new Error("invalid email")
            }
            const correctpassword = await user.isCorrectPassword(args.password)
            if (!correctpassword){throw new Error("Invalid Password")}
            
            const token = signToken(user)
            return {user,token}
            
        },
        saveBook:async(parents,{bookData},context)=>{
            if (context.user){
                const updatedUser= await findOneAndUpdate(
                    {_id:context.user._id},
                    {$push:{savedBooks:bookData}},
                    {new:true}
                )
                return updatedUser
            }
            throw new Error("Not logged in")
        },
        removeBook:async(parents,{bookId},context)=>{
            if (context.user){
                const updatedUser=await findOneAndUpdate(
                    {_id:context.user._id},
                    {$pull:{savedBooks:{bookId}}},
                    {new:true}
                )
                return updatedUser
            }
            throw new Error("Not logged in")
        }
    }
}
module.exports=resolvers