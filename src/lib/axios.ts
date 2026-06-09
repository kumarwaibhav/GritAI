import axios from "axios";

// Global defaults — applied to every axios request
axios.defaults.timeout = 15000; // 15 s max — fail fast instead of hanging forever

export default axios;
