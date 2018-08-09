import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true

export const getrank = () => new axios.post("/getData.php");
export const getTopData = () => new axios.post("/getTopData.php");
