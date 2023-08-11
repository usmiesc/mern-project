const {gql}= require('apollo-server-express')

const typeDefs=gql`
type User{
    _id:ID!
    username:String!
    email:String!
    bookCount:Int!
    saveBooks:[Book]
}
type Book{
    bookId:ID!
    authors:[String]
    Description:String!
    image:String!
    link:String!
    title:String!
}
type Auth{
    tokenId:ID!
    user:User!

}
input BookInput{
    authors:[String]
    Description:String!
    image:String!
    link:String!
    title:String!
    bookId:String!
}
type Query{
    me:User!
}
type Mutation{
    login(email:String!,password:String!):Auth
    addUser(email:String!,password:String!,username:String!):Auth
    saveBook(bookData:BookInput):User
    removeBook(bookId:ID!):User
}
`
module.exports=typeDefs