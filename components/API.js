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
    tfs: 'tfs',
};

function getUrl(which) {
    return `${APIURI}/${ENDPOINT[which]}`;
}

export async function requestDBData(which) {
    var res = await axios.get(getUrl(which));
    return res.data;
}

export async function requestNewDBData(which, id) {
    const res = await axios.post(getUrl(which) + "_new", {"id": id});
    return res.data;
}

export async function postDataToDB(which, data) {
    const res = await axios.post(getUrl(which), data);
    return res.status;
}