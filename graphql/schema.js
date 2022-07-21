const {buildSchema} = require("graphql")

//Schema

/*Schema {
    // Query: Nơi định nghĩa để lấy dữ liệu => tương ứng với phương thức get của RestfulAPI
    // Mutation: Xây dựng những hàm liên quan đến: thêm, xóa, sửa => tương ứng với post, get, delete bên RestfulAPI
}
*/

const graphqlSchema = buildSchema(`#graphql
    type Post  {
        title: String!
        content: String!
        imageURL: String!
    }

    type User {
        name: String
        age: Int
        balance: Float
    }

    type Role {
        id: Int
        name: String
    }

    type RootQuery {
        post: [Post]
        user(name:String, age:Int): [User]
        role: [Role]
    }

    type RootMutation {
        createUser(Name: String, age: Int, balance: Float): Boolean
        createData(id: Int, name: String): [Role]
        deleteRole(id: Int): [Role]
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)

/*
    tao ra mot graphql tra ra mot doi tuong Role => id, name
    - Dinh nghia mot GrapHQL de lay toan bo role
    - Dinh nghia mot GrapHQL de them moi mot role
    - Dinh nghia mot GrapHQL de xoa mot role
*/

module.exports = graphqlSchema