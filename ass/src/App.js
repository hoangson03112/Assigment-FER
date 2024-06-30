import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import { ModalAdd } from "./component/ModalAdd";
import { ModalUpdate } from "./component/ModalUpdate";
import { ModalDetail } from "./component/ModalDetail";
import { ModalJobsSuccess } from "./component/ModalJobsSuccess";
function App() {
  const [jobs, setJobs] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showJobsSuccess, setshowJobsSuccess] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [priority, setPriority] = useState(0);

  const handleCloseAdd = () => setShowAdd(false);
  const handleCloseUpdate = () => {
    setSelectedJob({});
    setShowUpdate(false);
  };
  const handleCloseDetail = () => {
    setSelectedJob({});
    setShowDetail(false);
  };
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = () => {
    axios.get("http://localhost:3000/jobs").then((res) => {
      setJobs(res.data);
    });
  };

  const handleComplete = (job) => {
    axios
      .put(`http://localhost:3000/jobs/${job.id}`, {
        name: job.name,
        description: job.description,
        priority: job.priority,
        date: job.date,
        isComplete: true,
      })
      .then(function (response) {
        getJobs();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleAdd = () => {
    const newId =
      jobs.length > 0 ? parseInt(jobs[jobs.length - 1].id) + 1 : "1";

    axios
      .post("http://localhost:3000/jobs", {
        id: newId + "",
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

  const handleDelete = (job) => {
    axios
      .delete(`http://localhost:3000/jobs/${job.id}`)
      .then(function (response) {
        getJobs();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3000/jobs/${selectedJob.id}`, {
        name: name,
        description: description,
        priority: priority,
        date: date,
        isComplete: selectedJob.isComplete,
      })
      .then(function (response) {
        getJobs();
        console.log(response);
        handleCloseUpdate();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleShowDetail = (job) => {
    setShowDetail(true);
    setSelectedJob(job);
  };

  const handleShowUpdate = (job) => {
    setSelectedJob(job);
    setName(job.name);
    setDescription(job.description);
    setDate(job.date);
    setPriority(job.priority);
    setShowUpdate(true);
  };

  return (
    <div id="App">
      <Row className="w-50">
        <Col>
          <h3 className="text-start ">Danh Sách Công Việc</h3>
          <Button
            className="float-start m-4"
            variant="success"
            onClick={()=>{setshowJobsSuccess(true)}}
            
          >
            Công việc đã hoàn Thành
          </Button>
          <Button
            className="float-end m-4"
            variant="primary"
            onClick={handleShowAdd}
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
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody className="table-group-divider table-divider-color">
              {jobs
                .filter((job) => !job.isComplete)
                .map((job, index) => (
                  <tr className="text-center" key={index}>
                    <td>{job.id}</td>
                    <td>{job.name}</td>
                    <td>{job.date}</td>
                    <td>{job.priority}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleComplete(job)}
                      >
                        Đã Hoàn Thành
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleShowDetail(job)}
                      >
                        Chi tiết
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => handleShowUpdate(job)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(job)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <ModalJobsSuccess showJobsSuccess={showJobsSuccess}
            setshowJobsSuccess={setshowJobsSuccess}
            jobs={jobs}
            handleComplete={handleComplete}
            handleShowDetail={handleShowDetail}
            handleShowUpdate={handleShowUpdate}
            handleDelete={handleDelete}
          ></ModalJobsSuccess>
    
          <ModalDetail
            showDetail={showDetail}
            handleCloseDetail={handleCloseDetail}
            selectedJob={selectedJob}
          ></ModalDetail>
          <ModalUpdate
            showUpdate={showUpdate}
            handleCloseUpdate={handleCloseUpdate}
            setName={setName}
            name={name}
            description={description}
            date={date}
            priority={priority}
            setDescription={setDescription}
            setDate={setDate}
            setPriority={setPriority}
            handleUpdate={handleUpdate}
          ></ModalUpdate>

          <ModalAdd
            showAdd={showAdd}
            setShowAdd={setShowAdd}
            setName={setName}
            setDescription={setDescription}
            setDate={setDate}
            setPriority={setPriority}
            handleAdd={handleAdd}
            handleCloseAdd={handleCloseAdd}
          ></ModalAdd>
        </Col>
      </Row>
    </div>
  );
}

export default App;
