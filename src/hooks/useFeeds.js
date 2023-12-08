import axios from "axios";
import { useEffect, useState } from "preact/hooks";
import constants from "../Contants/constants";
import StorageFunction from "../methods/StorageFunction";

async function getFeeds(Id) {
    let feeds =  await axios.get(constants.pathToServer(`/api/feed/${Id}`))
    .then((response)=>{
        console.log(response.data);
        return response.data;
    })
    .catch((err)=>{
        console.error(err);
    })
    return feeds;
}

function useFeeds(id = StorageFunction.getIdSession()) {
    const [feeds, setFeeds] = useState([]);
    useEffect(async ()=>{
        await getFeeds(id).then(response=>{setFeeds(response)});
        console.log(feeds);
    }, []);
    return {feeds, setFeeds};
}

export default useFeeds;