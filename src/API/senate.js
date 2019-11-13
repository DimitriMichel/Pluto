import axios from "axios";

const KEY = "lEATDEQv1geRUmoqhhvuOYbmxDNnYOCWanJn91K6";

export default axios.create({
  baseURL: "https://api.propublica.org/congress/v1/116/senate/members.json",
  headers: {
    "X-API-Key": KEY
  }
});
//https://api.propublica.org/congress/v1/{congress}/{chamber}/members.json
