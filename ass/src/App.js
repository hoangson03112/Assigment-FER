import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Table } from "react-bootstrap";
import "./App.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function App() {
  const [jobs, setJobs] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState(0);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = () => {
    axios.get("http://localhost:3000/jobs").then((res) => {
      setJobs(res.data);
    });
  };

  const handleAdd = () => {
    axios
      .post("http://localhost:3000/jobs", {
        id: jobs.length > 0 ? parseInt(jobs.at(-1).id) + 1 + "" : "1",
        name: name,
        description: description,
        isComplete: false,
        priority: priority,
        date: date,
      })
      .then(function (response) {
        getJobs();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/jobs/${id}`);
      getJobs();
    } catch (error) {
      console.error("There was an error deleting the job!", error);
    }
  };

  return (
    <div id="App">
      <Row className="w-50">
        <Col>
          <h3 className="text-start ">Danh Sách Công Việc</h3>
          <Button
            className="float-end m-4"
            variant="primary"
            onClick={handleShow}
          >
            Thêm
          </Button>
          <Table
            hover
            bordered
            className="table  table-hover table-dark  rounded-table "
          >
            <thead className="table-dark align-middle">
              <tr className="text-center">
                <th>#</th>
                <th>Tên Công Việc</th>
                <th>Ngày</th>
                <th>Mức Độ Ưu Tiên</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="table-group-divider table-divider-color">
              {jobs
                .filter((job) => {
                  return !job.isComplete;
                })
                .map((job, index) => {
                  return (
                    <tr className="text-center" key={index}>
                      <td>{job.id}</td>
                      <td>{job.name}</td>
                      <td>{job.date}</td>
                      <td>{job.priority}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(job.id)}
                        >
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal animation show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Công Việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Tên Công Việc </h6>
          <Form.Control
            name="name"
            placeholder="Tên Công Việc"
            aria-label="name"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className="form-group">
            <label htmlFor="description">
              <h6>Mô Tả Công Việc </h6>
            </label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              rows="3"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <h6>Ngày</h6>
          <input
            name="date"
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <h6 className="my-3">Mức Độ Ưu Tiên</h6>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setPriority(parseInt(e.target.value));
            }}
          >
            <option>Chọn mức độ ưu tiên</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              handleAdd();
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
