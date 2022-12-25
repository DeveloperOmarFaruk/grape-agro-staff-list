import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const View = () => {
  // User specific id select for use
  const { id } = useParams();

  // back to path for use
  const navigate = useNavigate();

  // Staff Data load API call State and Function Area
  const [staff, SetStaff] = useState([]);

  useEffect(() => {
    async function getStaff() {
      try {
        const responesStaff = await axios.get(
          `http://localhost:3030/staff/${id}`
        );
        // console.log(responesStaff.data);
        SetStaff(responesStaff.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getStaff();
  }, [id]);

  return (
    <>
      <div className="container-page">
        <h3 className="add-modal-form-title">
          Grape Agro Staff Details Information
        </h3>

        <div style={{ textAlign: "center" }}>
          <p>Staff ID: {staff.staffId}</p>
          <p>Name: {staff.name}</p>
          <p>Email: {staff.email}</p>
          <p>Mobile: {staff.mobile}</p>

          <Button
            variant="secondary"
            style={{ textAlign: "center" }}
            onClick={() => navigate("/")}
          >
            Back Home
          </Button>
        </div>
      </div>
    </>
  );
};

export default View;
