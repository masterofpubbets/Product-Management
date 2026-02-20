import bcrypt from 'bcryptjs'
import {PASS_KEY} from 'src/config-global'


export const hashPassword = (pass) => {
    const hashedPassword = bcrypt.hashSync(pass, PASS_KEY)
    return hashedPassword
};