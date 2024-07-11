// RegisterForm.js
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kiểm tra xem username đã tồn tại hay chưa
      const response = await axios.get("http://localhost:3000/accounts");
      const accounts = response.data;
      const userExists = accounts.some(
        (account) => account.username === form.username
      );

      if (userExists) {
        setError("Tên đăng nhập đã tồn tại.");
        return;
      }

      // Gửi dữ liệu đến server nếu username chưa tồn tại
      await axios.post("http://localhost:3000/accounts", form);
      alert("Đăng ký thành công:");
      navigate("/");
    } catch (error) {
      console.error("Có lỗi xảy ra khi đăng ký:", error);
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <Container>
      <h2>Đăng Ký</h2>
      <Link to={"/"}>BAck</Link>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Nhập tên đăng nhập"
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Đăng Ký
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
