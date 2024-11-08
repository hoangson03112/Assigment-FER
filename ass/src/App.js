import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Row, Col } from "react-bootstrap";
import "./App.css";
import { ModalAdd } from "./component/Modal/ModalAdd";
import { ModalUpdate } from "./component/Modal/ModalUpdate";
import { ModalDetail } from "./component/Modal/ModalDetail";
import { ModalJobsSuccess } from "./component/Modal/ModalJobsSuccess";
import { Navbar } from "./component/NavBar/Nav";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showJobsSuccess, setshowJobsSuccess] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");
  const [datetoSearch, setDatetoSearch] = useState("");
  const [account, setAccount] = useState(null); // Sử dụng useState để lưu thông tin tài khoản

  useEffect(() => {
    // Kiểm tra nếu có tài khoản trong localStorage, thì lấy và set vào state
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    } else {
      navigate("/"); // Nếu không có tài khoản, chuyển hướng đến trang đăng nhập
    }
  }, [navigate]);

  useEffect(() => {
    if (account) {
      getJobs(); // Gọi hàm lấy danh sách công việc khi có tài khoản được set
    }
  }, [account]);

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

  const getJobs = () => {
    axios
      .get("http://localhost:3000/jobs")
      .then((res) => {
        setJobs(res.data.filter((job) => job.username === account.username));
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  };

  const handleComplete = (job) => {
    axios
      .put(`http://localhost:3000/jobs/${job.id}`, {
        ...job,
        isComplete: true,
      })
      .then((response) => {
        getJobs();
        console.log(response);
      })
      .catch((error) => {
        console.error("Error completing job:", error);
      });
  };

  const handleAdd = () => {
    const newId =
      jobs.length > 0 ? parseInt(jobs[jobs.length - 1].id) + 1+"" : "1";
    axios
      .post("http://localhost:3000/jobs", {
        id: newId + "",
        name: name,
        description: description,
        isComplete: false,
        priority: priority,
        date: date,
        username: account.username,
      })
      .then((response) => {
        getJobs();
        console.log(response);
      })
      .catch((error) => {
        console.error("Error adding job:", error);
      });
  };

  const handleDelete = (job) => {
    axios
      .delete(`http://localhost:3000/jobs/${job.id}`)
      .then((response) => {
        getJobs();
        console.log(response);
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
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
        username: account.username,
      })
      .then((response) => {
        getJobs();
        console.log(response);
        handleCloseUpdate();
      })
      .catch((error) => {
        console.error("Error updating job:", error);
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

  const handlSearchbyDate = async () => {
    try {
      const jobSearchbyDate = await axios.get(
        `http://localhost:3000/jobs?date=${datetoSearch}`
      );
      if (jobSearchbyDate.data.length !== 0) {
        setJobs(
          jobSearchbyDate.data.filter((job) => job.username === account.username)
        );
      } else {
        getJobs(); // Nếu không tìm thấy công việc, hiển thị lại danh sách đầy đủ
      }
    } catch (error) {
      console.error("Error searching jobs by date:", error);
    }
  };

  return (
    <div
      id="App"
      className="d-flex flex-column justify-content-start align-items-center mt-0 "
    >
      <Navbar account={account} /> {/* Truyền tài khoản vào Navbar */}
      <Row className="w-75">
        <Col xl={12}>
          <h3 className="text-start ">Danh Sách Công Việc</h3>
          <Button
            className="float-start m-4"
            variant="success"
            onClick={() => {
              setshowJobsSuccess(true);
            }}
          >
            Công việc đã hoàn Thành
          </Button>
          <input
            type="date"
            onChange={(e) => setDatetoSearch(e.target.value)}
          ></input>
          <button type="submit" onClick={handlSearchbyDate}>
            {" "}
            Tìm!
          </button>
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
                    <td>{index + 1}</td>
                    <td>{job.name}</td>
                    <td>{job.date}</td>
                    <td>{job.priority}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleComplete(job)}
                      >
                        Hoàn Thành
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
          <ModalJobsSuccess
            showJobsSuccess={showJobsSuccess}
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
