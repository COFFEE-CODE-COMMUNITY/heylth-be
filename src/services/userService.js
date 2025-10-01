import { nanoid } from "nanoid";

export const addUser = async data => {
    const user = await {id: nanoid(12), ...data, password: hashPassword(data.password)};
    return createUser(user);
};