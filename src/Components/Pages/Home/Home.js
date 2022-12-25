import React, { useState, useEffect } from "react";
import "./Home.css";
import {
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Home = () => {
  // Add Form State and Function Area
  const [addShow, setAddShow] = useState(false);
  const handleAddClose = () => setAddShow(false);
  const handleAddShow = () => setAddShow(true);

  const [staffAdd, setStaffAdd] = useState({
    staffId: "",
    name: "",
    email: "",
    mobile: "",
  });

  const [status, SetStatus] = useState();

  function inputAddFormChange(e) {
    setStaffAdd({
      ...staffAdd,
      [e.target.name]: e.target.value,
    });
  }

  async function onAddSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3030/staff`, staffAdd);
    } catch (error) {
      console.log("Something is Wrong");
    }
    setAddShow(false);
    SetStatus(true);
  }

  // Edit Form State and Funcion Area
  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  // Staf Details Info Modal Page State and Funcion Area
  const [infoShow, setInfoShow] = useState(false);
  const handleInfoClose = () => setInfoShow(false);

  const handleInfoShow = () => {
    setInfoShow(true);
  };

  // Staff Data load API call State and Function Area
  const [staff, SetStaff] = useState([]);

  useEffect(() => {
    async function getAllStaff() {
      try {
        const responesAllStaff = await axios.get("http://localhost:3030/staff");
        // console.log(responesStaff.data);
        SetStaff(responesAllStaff.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getAllStaff();
  }, []);

  // Delete State and Function

  const onDeleteStaff = async (id) => {
    await axios.delete(`http://localhost:3030/staff/${id}`);
    var newDeleteStaff = staff.filter((item) => {
      // console.log(item);
      return item.id !== id;
    });
    SetStaff(newDeleteStaff);
  };

  // Auto relod after add form submit
  if (status) {
    return <Home />;
  }

  return (
    <>
      <div className="section">
        <div className="home-add-btn">
          <button onClick={handleAddShow}>Add Staff</button>
        </div>

        {/* Staff List Start */}
        <Grid container justify="center" spacing={4}>
          <Grid item md={12} xs={12}>
            <TableContainer className="home-table">
              <Table>
                <TableHead>
                  <TableRow className="home-table-row-title">
                    <TableCell
                      align="center"
                      className="home-table-row-title-item"
                    >
                      No
                    </TableCell>

                    <TableCell
                      align="center"
                      className="home-table-row-title-item"
                    >
                      Staff ID
                    </TableCell>

                    <TableCell
                      align="center"
                      className="home-table-row-title-item"
                    >
                      Name
                    </TableCell>

                    <TableCell
                      align="center"
                      className="home-table-row-title-item"
                    >
                      Email
                    </TableCell>

                    <TableCell
                      align="center"
                      className="home-table-row-title-item"
                    >
                      Phone Number
                    </TableCell>

                    <TableCell
                      align="center"
                      className="home-table-row-title-item"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {staff.map((staffData) => (
                    <TableRow
                      className="home-table-row-user-title"
                      key={staffData.id}
                    >
                      <TableCell
                        align="center"
                        className="home-table-row-user-title-item"
                      >
                        {staffData.id}
                      </TableCell>

                      <TableCell
                        align="center"
                        className="home-table-row-user-title-item"
                      >
                        {staffData.staffId}
                      </TableCell>

                      <TableCell
                        align="center"
                        className="home-table-row-user-title-item"
                      >
                        {staffData.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="home-table-row-user-title-item"
                      >
                        {staffData.email}
                      </TableCell>

                      <TableCell
                        align="center"
                        className="home-table-row-user-title-item"
                      >
                        {staffData.mobile}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="home-table-row-user-title-item"
                      >
                        <Tooltip title="View">
                          <IconButton>
                            <Link to={`/view/${staffData.id}`}>
                              <VisibilityIcon
                                color="primary"
                                className="home-table-row-user-title-item-icon"
                              />
                            </Link>
                          </IconButton>

                          {/* <IconButton
                            
                          >
                            <Link to="">
                              <VisibilityIcon
                                color="primary"
                                className="home-table-row-user-title-item-icon"
                              />
                            </Link>
                          </IconButton> */}
                        </Tooltip>

                        <Tooltip title="Edit">
                          <IconButton>
                            <Link to={`/edit/${staffData.id}`}>
                              <EditIcon className="home-table-row-user-title-item-icon" />
                            </Link>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton>
                            <DeleteIcon
                              color="secondary"
                              className="home-table-row-user-title-item-icon"
                              onClick={() => onDeleteStaff(staffData.id)}
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        {/* Staff List End */}

        {/* Staff Add Form Modal Start */}
        <div>
          <Modal show={addShow} onHide={handleAddClose}>
            <Modal.Header closeButton>
              <Modal.Title className="add-modal-form-title">
                Grape Agro Staff Add Form
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                    onChange={(e) => inputAddFormChange(e)}
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
                    onChange={(e) => inputAddFormChange(e)}
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
                    onChange={(e) => inputAddFormChange(e)}
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
                    type="number"
                    name="mobile"
                    onChange={(e) => inputAddFormChange(e)}
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleAddClose}>
                Close
              </Button>
              <Button
                onClick={(e) => onAddSubmit(e)}
                className="add-submit-btn"
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        {/* Staff Add Form Modal End */}

        {/* Staff Edit Form Modal Start */}
        <div>
          <Modal show={editShow} onHide={handleEditClose}>
            <Modal.Header closeButton>
              <Modal.Title className="add-modal-form-title">
                Grape Agro Staff Edit Form
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                    type="number"
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditClose}>
                Close
              </Button>
              <Button onClick={handleEditClose} className="add-submit-btn">
                Save Change
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {/* Staff Edit Form Modal End */}

        {/* Staff Details info Modal Start */}
        <div>
          <Modal show={infoShow} onHide={handleInfoClose}>
            <Modal.Header closeButton>
              <Modal.Title className="add-modal-form-title">
                Grape Agro Staff Details Information
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Staff ID: {staff.staffId}</p>
              <p>Name: {staff.name}</p>
              <p>Email: {staff.email}</p>
              <p>Mobile: {staff.mobile}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleInfoClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {/* Staff Details info Modal End */}
      </div>
    </>
  );
};

export default Home;
