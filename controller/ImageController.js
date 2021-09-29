
const express = require('express');
const app = express();
const request = require('request-promise');
const utils = require("../utils/utils.js");
const url = process.env.ORTHANC_HOST + ":" + process.env.ORTHANC_PORT
const fs = require("fs")
const curl = require("child_process")

app.get("/patients", async(req, res)=>{
    let option = {
        method: 'GET',
        url: url + '/patients',
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


app.get("/patients/{id}", async(req, res)=>{
    let option = {
        method: 'GET',
        url: url + '/patients/' + req.params.id,
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


app.get("/patients/:id", async(req, res)=>{
    let option = {
        method: 'GET',
        url: url + '/patients/' + req.params.id,
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


app.get("/studies/:accessionNumber", async(req, res)=>{
    let studyRealtedToAccessionNumber = "";
    let option = {
        method: 'GET',
        url: url + '/studies',
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
    for(let study of response){
        option = {
            method: 'GET',
            url: url + '/studies/' + study,
            json: true,
            headers: {
                Authorization: "Bearer " + process.env.TOKEN
            }
        };
        response;
        try{
            response = await request(option);
        }catch(error){
            // console.log(error);
        }
        if (response.MainDicomTags.AccessionNumber == req.params.accessionNumber){
            studyRealtedToAccessionNumber = study
            break;
        }
    }
    option = {
        method: 'GET',
        url: url + '/studies/' + studyRealtedToAccessionNumber,
        json: true,
        headers: {
            Authorization: "Bearer " + process.env.TOKEN
        }
    };
    response;
    try{
        response = await request(option);
    }catch(error){
        // console.log(error);
    }
    // let patientData = await utils.parsePatientData(response);
    await res.send(response)
});


app.get("/series/:id", async(req, res)=>{
    let option = {
        method: 'GET',
        url: url + '/series/' + req.params.id,
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


app.get("/instances/:id", async(req, res)=>{
    let option = {
        method: 'GET',
        url: url + '/instances/' + req.params.id,
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


app.get("/instances/:id/file", async(req, res)=>{
    await writeDicomFile(req);
    let location = __dirname.substring(0, __dirname.indexOf("controller"));
    await res.sendFile(location + "utils/storage/" + req.params.id + ".dcm")
});

module.exports = app;

async function writeDicomFile(req){
    curl.exec("curl http://localhost:8042/instances/" + req.params.id + "/file > ./utils/storage/" + req.params.id + ".dcm")
}