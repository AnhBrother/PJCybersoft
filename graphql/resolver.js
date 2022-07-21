const { dataRole } = require("../contant");

const graphqlResolver = {
    post: () => {
        // Nơi xử lý logic code tương ứng với lại key post khai báo bên file schema.js
        console.log(`Resolver Post`)
        return [
            {
                title:"Graphql",
                content:"Mo ta GrapHQL",
                imageURL:"http://localhost:3000"
            },
            {
                title:"Graphql1",
                content:"Mo ta GrapHQL1",
                imageURL:"http://localhost:3000/graphq"
            }
        ]
    },

    user: (args) => {
        //args cho phep lay tham so nguoi dung truyen vao
        console.log(args);

        return [
            {
                name: "Nguyen Van A",
                age: 28,
                balance: 16000
            },
            {
                name: "Nguyen Van B",
                age: 22,
                balance: 1000
            }
        ]
    },

    role: () => {
        // Nơi xử lý logic code tương ứng với lại key duoc khai báo bên file schema.js
        console.log(`Ping`)
        return dataRole
    },

    createUser: (args) => {
        console.log(args)
        //Xu ly logic code
        return true
    },

    createData: (args) => {
        const newdata = [...dataRole, args]
        return newdata
    },

    deleteRole: (args) => {
        console.log(args.id);
        const newdata = dataRole.filter((item) => item.id != args.id)
        console.log(newdata);
        return newdata
    }
}

module.exports = graphqlResolver