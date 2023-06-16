import mongoose from "mongoose";
import { Account } from "./Model.js";
import { AccountData } from "./DataType.js";

export default class MongoAPI {

    async connectMongoose(url: string) {
        var isConnected = false
        await mongoose.connect(url)
            .then(() => {
                isConnected = true
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
            });

        return isConnected
    }







    // ------------------ Account -------------------
    async getAccount(email: string) {
        try {
            const account = await Account.findOne({ email: email });
            console.log("fetch account")
            return account;

        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }

    async createAccount(accountData: AccountData) {
        try {
            const account = await Account.create(accountData)
            console.log("create account")
            return account

        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }

    async resetAccountPassword(accountId: string, newPassword: string) {
        try {
            const account = await Account.findByIdAndUpdate(accountId, { password: newPassword })
            console.log("reset account password")
            return account

        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }

}
