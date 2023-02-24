import userModel from "../models/users.model";
import userconversationModel from "../models/userConversations.model";

class userServices {
    checkUserData = async(query: any) => {
        try {
            const findUser = await userModel.findOne(query)
            return findUser;
        } catch (err: any) {
            throw err;
        }
    }

    checkUserExits = async (email: any, mobile: any) => {
        try {
            const findUser = await userModel.findOne({ $or: [{ email: email }, { mobile: mobile }] })
            return findUser;
        } catch (err: any) {
            throw err;
        }
    }

    createUser = async (userData: any) => {
        try {
            const createUser: any = await userModel.create(userData);
            if (createUser){
                await userconversationModel.create({ user: createUser._id })
            }
            return createUser;
        } catch (err: any) {
            throw err;
        }
    }

    getUserDetails = async (userId: any) => {
        try {
            const findUser: any = await userModel.findById(userId);
            return findUser;
        } catch (err: any) {
            throw err;
        }
    }

    getAllUsers = async () => {
        try {
            const findUsers: any = await userModel.find({});
            return findUsers;
        } catch (err: any) {
            throw err;
        }
    }

    createPassword = async (userId: any, hashPasword: any) => {
        try {
            const findUsers: any = await userModel.findByIdAndUpdate({ _id: userId }, { $set: { password: hashPasword } }, { new: true });
            return findUsers;
        } catch (err: any) {
            throw err;
        }
    }

    

    getUserListRegex = async (query: any) => {
        try {
            const findUserqueryData: any = await userModel.find({ email: { $regex: query } })

            return findUserqueryData;
        } catch (err: any) {
            throw err;
        }
    }
}

export default userServices;