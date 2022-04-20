import { User } from "@db/models/User";

const findByEmail = async (email: string) => {
    const recipe = await User.findByPk(email);
    return recipe;
};

const createUser = async (params: Partial<User>) => {
    const user = new User({
        email: params.email,
        passwordHash: params.passwordHash,
    });

    return user.save();
};

export { findByEmail, createUser };
