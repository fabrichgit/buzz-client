function encripting (username, password) {
    const encriptSteps = {
        step1: (username, password)=>{
            if (username.length !== password.length) {
            
                if (username.length<password.length) {
                    const diff = password.length - username.length;
                    for (let index = 1; index <=diff ; index++) {
                        username+='`';
                    }
                    return {username, password};
                }
        
                if (username.length>password.length) {
                    const diff = username.length - password.length;
                    for (let index = 1; index <=diff ; index++) {
                        password+='`';
                    }
                    return {username, password};
                }
        
            }
                return {username, password};
        },
        step2: (object)=>{
            let result = {p1:[],p2:[]};
            for (let index = 0; index < object.username.length; index++) {
                const char1 = object.username[index];
                const char2 = object.password[index];
    
                if (index%2==0) {
                    result.p1.push(char1);
                    result.p2.push(char2);
                }else{
                    result.p1.push(char2);
                    result.p2.push(char1);
                }
            }
    
            return result;
        },
        step3: (object)=>{
            let result = '';
            for (let index = 0; index < object.p1.length; index++) {
                const char1 = object.p1[index];
                const char2 = object.p2[index];
                
                result+=char1+char2;
            }
            return result;
        }
    }
    
    if (username!==null && password!==null) {
        return encriptSteps.step3(encriptSteps.step2(encriptSteps.step1(username, password)));
    }else{
        return false;
    }
}

export default encripting;