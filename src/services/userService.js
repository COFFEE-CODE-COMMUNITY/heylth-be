import { nanoid } from "nanoid";
import { createUser, getAllUsername, getAllEmail } from "../repositories/userRepository.js";
import { hashPassword } from "../utils/hashPassword.js";

export const addUser = async data => {
    const allUsername = await getAllUsername();
    const allEmail = await getAllEmail();
    // cek duplikasi username dan email
    const isDuplicateEmail = allEmail.filter(user => user.email === data.email.toLowerCase());
    const isDuplicateUsername = allUsername.filter(usn => usn.username.toLowerCase() === data.username.toLowerCase());
    if(isDuplicateEmail.length) throw new Error(`Email ${data.email} already exist!`);
    if(isDuplicateUsername.length) throw new Error(`Username ${data.username} already exist!`);
    
    const user = {id: nanoid(), ...data, password: await hashPassword(data.password)};
    return createUser(user);
};