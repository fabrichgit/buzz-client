import {v4 as uuid} from "uuid";

function isValidateUsername(name) {
    const nameArray = name.split('');
    for (let index = 0; index < nameArray.length; index++) {
        const char = nameArray[index];
        if (char.toUpperCase()==char.toLowerCase()) {
            return false;
        }
    }
    return true;
}

function parseDataAuth(dataForm) {
    return {
        id: uuid(),
        username: dataForm.username.trim().toUpperCase(),
        password: dataForm.password.trim()
    }
}

export default {
    isValidateUsername,
    parseDataAuth
}