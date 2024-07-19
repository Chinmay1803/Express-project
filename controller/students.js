const { Router } = require("express");
const { insertStudent, updateStudent, deleteStudent } = require("../model/studentModel");

const router = Router();

router.post("/insertStudents", async (req, res) => {
  try {
    console.log("In students controller ", req.body);

    const data = req.body;

    if (!data.name || !data.rollNo || !data.city || !data.phoneNo) {
      throw "Data is missing";
    }

    const response = await insertStudent(req.body);
    if (response && response.data) {
      res.status(200).json(response);
    } else {
      throw "Insert unsuccessful";
    }
  } catch (err) {
    console.log("Error in insert - ", err);
    res.status(400).json(err);
  }
});

router.put("/updateStudents", async (req, res) => {
    try {
      console.log("In students update controller ", req.body);
  
      const data = req.body;
  
      if (!data.rollNo || !data.phoneNo) {
        throw "Data is missing";
      }
  
      const response = await updateStudent(req.body);
      if (response && response.data) {
        res.status(200).json(response);
      } else {
        throw "Update unsuccessful";
      }
    } catch (err) {
      console.log("Error in Update - ", err);
      res.status(400).json(err);
    }
  });

router.delete("/deleteStudents", async (req, res) => {
    try {
      console.log("In students delete controller ", req.body);
  
      const data = req.body;
  
      if (!data.rollNo) {
        throw "Data is missing";
      }
  
      const response = await deleteStudent(req.body);
      if (response && response.data) {
        res.status(200).json(response);
      } else {
        throw "Delete unsuccessful";
      }
    } catch (err) {
      console.log("Error in Deleste - ", err);
      res.status(400).json(err);
    }
  });

module.exports = router;
