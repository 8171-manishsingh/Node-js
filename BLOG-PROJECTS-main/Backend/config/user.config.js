import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
const AdduserToDb = async ({ email, username, password, role }) => {
    try {
        bcrypt.hash(password, 8, (err, hash) => {
            if (err) {
                return console.log(err)
            }
            const newUser = new userModel({ email, username, password: hash, role })
            newUser.save()
        })

    } catch (error) {
        console.log(error)
    }
}

export { AdduserToDb }
