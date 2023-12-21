import axios from "axios";

async function imageToCloud(image) {
    return await axios.post('https://api.cloudinary.com/v1_1/cloudfabrich/image/upload', image);
}

export default imageToCloud;