function decripting (string) {
    const decriptSteps = {
        step1: (string)=>{
            let result = {p1:[],p2:[]};
            for (let index = 0; index < string.length; index++) {
                const char = string[index];
                index%2==0?result.p1.push(char):result.p2.push(char)
            }
            return result;
        },
        step2: (object)=>{
            let p1Filter = {d1: [], d2: []};
            for (let index = 0; index < object.p1.length; index++) {
                const charP1 = object.p1[index];
                const charP2 = object.p2[index];
                if (index%2==0) {
                    p1Filter.d1.push(charP1);
                    p1Filter.d2.push(charP2);
                }else{
                    p1Filter.d1.push(charP2);
                    p1Filter.d2.push(charP1);
                }
            }
            return p1Filter;    
        },
        step3: (object)=>{
            let user = {username:'', passBy:''};
            for (let index = 0; index < object.d1.length; index++) {
                const charP1 = object.d1[index];
                const charP2 = object.d2[index];
                
                if (charP1!=='`') {
                    user.username+=charP1
                }
                if (charP2!=='`') {
                    user.passBy+=charP2;
                }
            }
            return user;
        }
    }

    if (string!==null) {
        return decriptSteps.step3(decriptSteps.step2(decriptSteps.step1(string)));
    }else{
        return false;
    }
    
}

export default decripting;