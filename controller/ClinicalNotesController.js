
const express = require('express');
const app = express();
const request = require('request-promise');
const utils = require("../utils/utils.js");
const url = process.env.OPENEMR_HOST + ":" + process.env.OPENEMR_PORT

app.get("/", async(req, res)=>{
    response = {
        resourceType: "DiagnosticReport",
        identifier: [
            {
                use: "usual",
                value: "IdentifierValueValue"
            }
        ],
        basedOn: [
            {
                reference: "Procedure/9412ac20-869c-446b-992e-228788bfe58b"
            }
        ],
        status: "StatusCodeValue",
        code: "HC.RC203",
        subject: {
            reference: "Patient/94107b7d-2e42-4ec5-91dc-adfb623f7a10"
        },
        context: {
            reference: "Encounter/9410837e-a568-420e-a809-2034f8d56e7a"
        },
        effectiveDateTime: "DateTime",
        effectivePeriod: {
            start: "StartDateTime",
            end: "EndDateTime"
        },
        issued: "DateTime released",
        performer:[
            {
                role: {
                    coding: [
                        {
                            version: "StringVersion",
                            code: "CodeValue",
                            display: "StringValue"
                        }
                    ],
                    text: "StringText"
                },
                actor: {
                    reference: "Practitioner/941e9320-0816-45aa-9933-6446761da9a9"
                }
            }
        ],
        result: [
            {
                reference: "Condition/941e83fd-733c-4184-97c6-d5bc73c4aa10"
            }
        ],
        imagingStudy: [
            {
                resourceType: "ImagingStudy",
                uid: "ImageUID",
                accession: {
                    use: "usual",
                    system: "Namespace of the identifier value",
                    value: "2819497684894126"
                },
                patient: {
                    reference: "Patient/943677de-e480cc5e-ec77a180-9e9ae465-56481517"
                },
                numberOfSeries: "SeriesNumber",
                numberOfInstances: "InstancesNumber"
            }
        ],
        image: [
            {
                comment: "Comment value string",
                link: "Link to image"
            }
        ],
        conclusion: "Conclusion string value",
        codeDiagnosis: [{
            coding: [
                {
                    code: "Code Value for diagnosis",
                    display: "Text to be displayed for diagnosis"
                }
            ],
            text: "Text string value"
        }]



    }
    await res.send(response)
});

module.exports = app;