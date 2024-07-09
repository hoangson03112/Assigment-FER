// @flow
import * as React from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function ModalAdd(props) {
  return (
    <div>
      <Modal
        animation
        show={props.showAdd}
        onHide={() => props.setShowAdd(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm Công Việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Tên Công Việc </h6>
          <Form.Control
            name="name"
            placeholder="Tên Công Việc"
            aria-label="name"
            onChange={(e) => props.setName(e.target.value)}
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
              onChange={(e) => props.setDescription(e.target.value)}
            ></textarea>
          </div>
          <h6>Ngày</h6>
          <input
            name="date"
            type="date"
            onChange={(e) => props.setDate(e.target.value)}
          />
          <h6 className="my-3">Mức Độ Ưu Tiên</h6>
          
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => props.setPriority(e.target.value)}
          >
            <option>Chọn mức độ ưu tiên</option>
            <option value="Bình Thường">Bình Thường</option>
            <option value="Quan Trọng">Quan Trọng</option>
            <option value="Rất Quan Trọng">Rất Quan Trọng</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => props.setShowAdd(false)}>
            Đóng
          </Button>
          <Button
            variant="success"
            onClick={() => {
              props.handleAdd();
              props.handleCloseAdd();
            }}
          >
            Thêm Công Việc
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
