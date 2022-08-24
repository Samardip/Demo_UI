import axios from "axios";

// const baseurl=process.env."http://develop.hipoz.com/api";
export default axios.create({
    baseURL:"https://develop.hipoz.com/api/"
})