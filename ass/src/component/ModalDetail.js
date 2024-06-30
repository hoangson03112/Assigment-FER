// @flow
import * as React from "react";
import { Button, Modal } from "react-bootstrap";

export function ModalDetail(props) {
  return (
    <div>
      <Modal animation show={props.showDetail} onHide={props.handleCloseDetail}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa Công Việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.selectedJob.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleCloseDetail}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
