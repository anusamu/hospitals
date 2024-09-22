const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Define the path to your hospitals.json file
const filePath = path.join(__dirname, 'hospitals.json');

// Function to read hospital data from the JSON file
const readHospitalsData = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Function to write hospital data back to the JSON file
const writeHospitalsData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// get operation
router.get("/",(req,res)=>{
           res.sendFile(path.join(__dirname,"","hospitals.json"))
         });
// post operation
router.post('/add',(req,res) => {
  const newHospital=req.body;
  // console.log(data);
  let hospitalsData=readHospitalsData();
  hospitalsData.push(newHospital);
  writeHospitalsData(hospitalsData)
  res.send('post sucessful')
})

// put operation
router.put('/edit/:id', (req, res) => {
    const hospitalId = parseInt(req.params.id); // Get the ID from the URL
    const updatedHospitalData = req.body; // Get the updated data from the request body
    let hospitalsData = readHospitalsData(); // Read the current hospitals data
    const hospitalIndex = hospitalsData.findIndex(hospital => hospital.id === hospitalId);// Find the hospital by ID
    hospitalsData[hospitalIndex] = { ...hospitalsData[hospitalIndex], ...updatedHospitalData }; // Update the hospital record 
    // hospitalsData.splice(1,1,updatedHospitalData)
    writeHospitalsData(hospitalsData);// Write the updated data back to the file
    res.send('Hospital data updated successfully'); // Respond with success message
  });


//   deteltion operation

router.delete('/delete/:id', (req, res) => {
    const hospitalId = parseInt(req.params.id); // Get the ID from the URL
    let hospitalsData = readHospitalsData();// Read the current hospitals data
    const hospitalIndex = hospitalsData.findIndex(hospital => hospital.id === hospitalId); // Find the hospital by ID
    hospitalsData.pop(hospitalsData); // Remove the hospital from the array
    writeHospitalsData(hospitalsData); // Write the updated data back to the file
    res.status(200).send('Hospital deleted successfully');// Respond with success message
  });


module.exports = router;
