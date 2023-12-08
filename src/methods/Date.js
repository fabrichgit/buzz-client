const DateMethods ={
    AsString: ()=>{
        const date = new Date();
        return date.toDateString()+' '+date.getHours()+':'+date.getMinutes();
    },
    AsId: ()=>{
        const date = new Date();
        return date.toJSON();
    }
};

export default DateMethods;