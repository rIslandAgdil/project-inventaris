import axios from "axios";
import { axiosConfig } from "../config/axiosConfig";

const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;
