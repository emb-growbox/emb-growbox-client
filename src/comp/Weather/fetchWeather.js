import axios from "axios";
//first step like all those apis i save the key and URl
const url = "https://api.openweathermap.org/data/2.5/weather";
const key = "574231e06d5d8c397a6926a8338ce1c9"; //For Security Purpose not entering my Key you can create your own key and add it here
//now we creating an asyncronous function and then pass the query as a param
/* Now we get the data for it We use Axios here not http ok alva adu movies app ge matra 
await function get method alli url matthe params(API documentation du) i am going to pass
then return The Data */

const fetchWeather = async () => {
  const { data } = await axios.get(url, {
    params: {
      id: '3165243',
      units: "metric", //these are the supported in the APi
      APPID: key,
    },
  });
  return data;
};

export default fetchWeather;
