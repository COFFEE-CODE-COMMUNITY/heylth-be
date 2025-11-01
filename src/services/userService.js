import { nanoid } from "nanoid";
import { createUser, getUsersUsername, getUserEmail, getAllUser } from "../repositories/userRepository.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import { signToken } from "../utils/jwt.js";

export const addUser = async data => {
    const allUsername = await getUsersUsername();
    const allEmail = await getUserEmail();
    // cek duplikasi username dan email
    const isDuplicateEmail = allEmail.filter(user => user.email === data.email.toLowerCase());
    const isDuplicateUsername = allUsername.filter(usn => usn.username.toLowerCase() === data.username.toLowerCase());
    if(isDuplicateEmail.length) throw new Error(`Email ${data.email} already exist!`);
    if(isDuplicateUsername.length) throw new Error(`Username ${data.username} already exist!`);
    
    const user = {id: nanoid(), ...data, password: await hashPassword(data.password)};
    return createUser(user);
};

export const getUser = async data => {
    const result = await getAllUser(data);
    if(!result.length) throw new Error(`No user dat yet!`);
    
    const user = result.find(u => u.username.toLowerCase() === data.username.toLowerCase());
    if(!user) throw new Error(`Wrong username or password!`);

    const isMatchPassword = await comparePassword(data.password, user.password);
    if(!isMatchPassword) throw new Error(`Wrong password!`);

    const payload = {
        id: user.id,
        email: user.email,
        username: user.username, 
    };

    const { password, ...safeUser } = user;

    const token = signToken(payload);
    return { token, ...safeUser };
};