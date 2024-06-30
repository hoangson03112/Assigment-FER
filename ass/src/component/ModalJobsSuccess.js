// @flow
import * as React from "react";
import { Table } from "react-bootstrap";
import { Button, Form, Modal } from "react-bootstrap";

export function ModalJobsSuccess(props) {
  const closeJobsSuccess = () => {
    props.setshowJobsSuccess(false);
  };
  return (
    <div >
      <Modal  size="xl" animation show={props.showJobsSuccess} onHide={closeJobsSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>Công Việc Đã Hoàn Thành</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              {props.jobs
                .filter((job) => job.isComplete)
                .map((job, index) => (
                  <tr className="text-center" key={index}>
                    <td>{job.id}</td>
                    <td>{job.name}</td>
                    <td>{job.date}</td>
                    <td>{job.priority}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => props.handleShowDetail(job)}
                      >
                        Chi tiết
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => props.handleShowUpdate(job)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => props.handleDelete(job)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeJobsSuccess}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
