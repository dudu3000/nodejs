
const express = require('express');
const app = express();
const request = require('request-promise');
const utils = require("../utils/utils.js");
const url = process.env.OPENEMR_HOST + ":" + process.env.OPENEMR_PORT

app.get("/", async(req, res)=>{
    let option = {
        method: 'GET',
        url: url + '/apis/default/fhir/Patient',
        json: true,
        headers: {
            Authorization: "Bearer " + process.env.TOKEN
        }
    };
    let response;
    try{
        response = await request(option);
    }catch(error){
        // console.log(error);
    }
    // let patientData = await utils.parsePatientData(response);
    await res.send(response)
});

module.exports = app;