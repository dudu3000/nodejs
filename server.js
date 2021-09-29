require('dotenv').config();
const port = 3000;
const express = require('express');
const app = express();
const cron = require('node-cron')
const fs = require('fs')
const request = require('request-promise');
const url = process.env.OPENEMR_HOST + ":" + process.env.OPENEMR_PORT
const utils = require("./utils/utils.js");

const patient = require('./controller/PatientController.js');
const allergyIntolernace = require('./controller/AllergyIntoleranceController.js');
const careTeam = require('./controller/CareTeamController.js');
const immunization = require('./controller/ImmunizationController.js');
const healthConcerns = require('./controller/HealthConcernsController.js');
const labResults = require('./controller/LabResultsController.js');
const procedure = require('./controller/ProcedureController.js');
const provenance = require('./controller/ProvenanceController.js');
const smokingStatus = require('./controller/SmokingStatusController.js');
const encounter = require('./controller/EncounterController.js');
const practitioner = require('./controller/PractitionerController.js');
const vitalSigns = require('./controller/VitalSignsController.js');
const clinicalNotes = require('./controller/ClinicalNotesController.js');
const image = require('./controller/ImageController.js');

app.use(express.urlencoded())
app.use(express.json())
loginTokens()
app.use('/fhir/Patient', patient);
app.use('/fhir/AllergyIntolerance', allergyIntolernace);
app.use('/fhir/CareTeam', careTeam);
app.use('/fhir/Immunization', immunization);
app.use('/fhir/HealthConcerns', healthConcerns);
app.use('/fhir/LabResults', labResults);
app.use('/fhir/Procedure', procedure);
app.use('/fhir/Provenance', provenance);
app.use('/fhir/SmokingStatus', smokingStatus);
app.use('/fhir/Encounter', encounter);
app.use('/fhir/Practitioner', practitioner);
app.use('/fhir/VitalSigns', vitalSigns);
app.use('/fhir/ClinicalNotes', clinicalNotes);
app.use('/image', image);
app.listen(port, ()=>{
    console.log("Running: http://localhost:3000")
})

utils.writeTokenInENVFile(request.access_token)


async function loginTokens() {
    cron.schedule('10 * * * * *', async () => {
        try{
            let response;
            response = await request({
                method: 'POST',
                url: url + '/oauth2/default/token',
                form: {
                    grant_type: 'password',
                    client_id: process.env.OPENEMR_CLIENT_ID,
                    scope: 'openid offline_access api:oemr api:fhir api:port user/allergy.read user/allergy.write user/appointment.read user/appointment.write user/dental_issue.read user/dental_issue.write user/document.read user/document.write user/drug.read user/encounter.read user/encounter.write user/facility.read user/facility.write user/immunization.read user/insurance.read user/insurance.write user/insurance_company.read user/insurance_company.write user/insurance_type.read user/list.read user/medical_problem.read user/medical_problem.write user/medication.read user/medication.write user/message.write user/patient.read user/patient.write user/practitioner.read user/practitioner.write user/prescription.read user/procedure.read user/soap_note.read user/soap_note.write user/surgery.read user/surgery.write user/vital.read user/vital.write user/AllergyIntolerance.read user/CareTeam.read user/Condition.read user/Coverage.read user/Encounter.read user/Immunization.read user/Location.read user/Medication.read user/MedicationRequest.read user/Observation.read user/Organization.read user/Organization.write user/Patient.read user/Patient.write user/Practitioner.read user/Practitioner.write user/PractitionerRole.read user/Procedure.read patient/encounter.read patient/patient.read patient/AllergyIntolerance.read patient/CareTeam.read patient/Condition.read patient/Encounter.read patient/Immunization.read patient/MedicationRequest.read patient/Observation.read patient/Patient.read patient/Procedure.read',
                    user_role: 'users',
                    username: process.env.OPENEMR_USERNAME,
                    password: process.env.OPENEMR_PASSWORD
                },
                json: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            utils.writeTokenInENVFile(response.access_token)
        }catch(error){
            console.log("There was an error trying to login")
            console.log(error)
        }
    });
}