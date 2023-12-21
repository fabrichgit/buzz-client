const DateMethods ={
    AsString: ()=>{
        const date = new Date();
        return date.toDateString()+' '+date.getHours()+':'+date.getMinutes();
    },
    AsId: ()=>{
        const date = new Date();
        return date.toJSON();
    },
    Parse: (dateToParse)=>{
        if (dateToParse) {
            const arrDateLite = dateToParse.split('-');
            const [year, month, date] = [
                arrDateLite[0],
                arrDateLite[1],
                arrDateLite[2].split('T')[0]
            ]
    
            // return {year, month, date};
            return `${year}-${month}-${date}`;
        }
        return null;
    }
};

export default DateMethods;