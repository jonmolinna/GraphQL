import { GraphQLBoolean, GraphQLID, GraphQLString } from 'graphql';
import { Users } from '../../Entities/Users';
import { UserType } from '../typeDefs/User';
import { MessageType } from '../typeDefs/Message';
import bcrypt from 'bcryptjs';

export const CREATE_USER = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(_: any, args: any) {
        const { name, username, password } = args;

        const encryptPassword = await bcrypt.hash(password, 10); 

        const result = await Users.insert({
            name,
            username,
            password: encryptPassword
        })
        console.log(result);
        return { ...args, id: result.identifiers[0].id, password: encryptPassword }
    }
};

export const DELETE_USER = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLID },
    },
    async resolve( _: any, { id }: any ) {
        const result = await Users.delete(id);
        // console.log(result)
        if (result.affected === 1) return true
        return false;
    }
};

export const UPDATE_USER = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        oldPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString },
    },
    async resolve( _:any, {id, name, username, oldPassword, newPassword}: any) {
        const userFound = await Users.findOne(id);

        if (!userFound) return {
            success: false,
            message: "User not found",
        }

        const isMatch = await bcrypt.compare(oldPassword, userFound.password)
        
        if (!isMatch) return {
            success: false,
            message: "Old password is incorrect",
        };

        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        const response = await Users.update({ id }, {name, username, password: newPasswordHash});

        if (response.affected === 0) return false;
        return {
            success: true,
            message: "User updated successfully"
        }
    }
}


/**
 * resolve(parent, args){
 *  parent => recibe datos de sus parientes,
 *  args: recibe los parametros o datos // req.body
 * }
 */