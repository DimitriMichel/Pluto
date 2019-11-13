import axios from "axios";

const KEY = "c3d4b8ee5cc15b9c8ff010388ed74369";

export default axios.create({
  baseURL: "http://www.opensecrets.org/api/",
  params: {
    apikey: KEY,
    output: "json"
  }
});
//https://www.opensecrets.org/api/?method=candContrib&output=doc
