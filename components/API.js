import axios from 'axios'

const APIURI = 'http://localhost:8025'
export const ENDPOINT = {
    rawSignal: 'rawdata',
    updateDateTime: 'updatedatetime',
    ars: 'ars',
    ars2: 'ars2',
    // S.YAMASHITA Train Wheel Obstacle Demo (ytw)
    ytwStatus: 'ytw_status',
    ytwObrangeReg: 'ytw_obrange_reg',
    ytwObrange: 'ytw_obrange',
};

function getUrl(which) {
    return `${APIURI}/${ENDPOINT[which]}`;
}

export async function requestDBData(which) {
    var res = await axios.get(getUrl(which));
    return res.data;
}