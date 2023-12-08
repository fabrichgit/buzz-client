const getAll = ()=>{
    localStorage.getItem('buzzApp')?JSON.parse(localStorage.getItem('buzzApp')):{};
}

const getIdSession = (id)=>{
    return JSON.parse(localStorage.getItem('BuzzApp')).idSession;
}

const setIdSession = (id)=>{
    localStorage.setItem('BuzzApp', JSON.stringify({...JSON.stringify(getAll()), idSession: id}));
}

export default {
    getIdSession, setIdSession
}