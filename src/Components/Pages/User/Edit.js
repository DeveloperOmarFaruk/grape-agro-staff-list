import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import TextField from "@mui/material/TextField";

const Edit = () => {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // User specific id select for use
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const { id } = useParams();

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // back to path for use
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const navigate = useNavigate();

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Edit Form State and Funcion Area
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [staffEdit, setStaffEdit] = useState({
    staffId: "",
    name: "",
    email: "",
    mobile: "",
  });

  function inputEditFormChange(e) {
    setStaffEdit({
      ...staffEdit,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    async function getStaff() {
      try {
        const responesStaff = await axios.get(
          `http://localhost:3030/staff/${id}`
        );
        // console.log(responesStaff.data);
        setStaffEdit(responesStaff.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getStaff();
  }, [id]);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Edit Form submit function
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  async function onEditSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3030/staff/${id}`, staffEdit);
    } catch (error) {
      console.log("Something is Wrong");
    }

    navigate("/");
  }

  return (
    <>
      <div className="container-page">
        <h3 className="add-modal-form-title">Grape Agro Staff Edit Form</h3>

        <div className="edit-form-container">
          <form action="" className="contact-form">
            <div className="add-form-group">
              <TextField
                fullWidth
                label="ID"
                placeholder="Enter Staff ID"
                color="warning"
                id="fullWidth"
                required
                type="number"
                name="staffId"
                value={staffEdit.staffId}
                onChange={(e) => inputEditFormChange(e)}
              />
            </div>

            <div className="add-form-group">
              <TextField
                fullWidth
                label="Name"
                placeholder="Enter Staff Name"
                color="warning"
                id="fullWidth"
                required
                type="text"
                name="name"
                value={staffEdit.name}
                onChange={(e) => inputEditFormChange(e)}
              />
            </div>
            <div className="add-form-group">
              <TextField
                fullWidth
                label="Email"
                placeholder="Enter Staff Email"
                color="warning"
                id="fullWidth"
                required
                type="email"
                name="email"
                value={staffEdit.email}
                onChange={(e) => inputEditFormChange(e)}
              />
            </div>

            <div className="add-form-group">
              <TextField
                fullWidth
                label="Phone Number"
                placeholder="Enter Staff Phone Number"
                color="warning"
                id="fullWidth"
                required
                type="text"
                name="mobile"
                value={staffEdit.mobile}
                onChange={(e) => inputEditFormChange(e)}
              />
            </div>
          </form>
        </div>
        <div className="edit-form-btns">
          <Button
            variant="secondary"
            style={{ margin: "20px" }}
            onClick={() => navigate("/")}
          >
            Back Home
          </Button>
          <Button
            className="add-submit-btn"
            style={{ margin: "20px" }}
            onClick={(e) => onEditSubmit(e)}
          >
            Save Change
          </Button>
        </div>
      </div>
    </>
  );
};

export default Edit;
