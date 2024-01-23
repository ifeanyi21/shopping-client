import { Button, Divider } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { ProgressUpdate } from "../../components/Table/Table";
import Title from "../../components/Title/Title";

function Contact() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(!loading);
  };
  return (
    <div className="row">
      <Title
        text={"Contact Us"}
        content={`Get In contact with Gadget Spot. You've got some q's and we've got tons and tons of a's. ask us about
          an order, a product, anything we can help with! don't be shy`}
      />
      <div className="col-lg-12 mb-8 text-center">
        <h1 className="text-6xl mt-8">
          How Can We Help<span className="text-blue-600">?</span>{" "}
        </h1>
        <p className="font-extrabold mt-8">
          you've got some q's and we've got tons and tons of a's. ask us about
          an order, <br /> a product, anything we can help with! don't be shy -
          we promise we are really nice.
        </p>
      </div>
      <div className="col-lg-6 mb-8">
        <h4>Contact Info</h4>
        <Divider />
        <div className="mt-8">
          <p>
            Email:{" "}
            <a href="mailto:info@yemzyapparel.ng">info@info@yemzyapparel.ng</a>
          </p>
          <p>
            Phone Number: <a href="tel:+2348067749483">+234 806 774 9483</a>
          </p>
        </div>
      </div>
      <div className="col-lg-6 mb-8">
        <h4>Email Form</h4>
        <Divider />
        <div className="mt-8">
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 mb-3">
                <label className="mb-2">Name</label>
                <Form.Control
                  onChange={handleName}
                  type="text"
                  required
                  disabled={loading}
                  value={name}
                />
              </div>
              <div className="col-lg-6 mb-3">
                <label className="mb-2">Email</label>
                <Form.Control
                  onChange={handleEmail}
                  type="email"
                  placeholder="name@example.com"
                  required
                  disabled={loading}
                  value={email}
                />
              </div>
              <div className="col-lg-12 mb-3">
                <label className="mb-2">Subject</label>
                <Form.Control
                  onChange={handleSubject}
                  type="text"
                  required
                  disabled={loading}
                  value={subject}
                />
              </div>
              <div className="col-lg-12 mb-3">
                <label className="mb-2">Message</label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={handleMessage}
                  disabled={loading}
                  value={message}
                />
              </div>
              <div className="d-grid gap-2 my-6">
                {loading ? (
                  <Button size="large">
                    <ProgressUpdate />
                  </Button>
                ) : (
                  <Button variant="contained" size="large" type="submit">
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>

      <div className="col-lg-12 text-center">
        <h6 className="font-light text-3xl">
          QUESTIONS ABOUT BRAND, CONCERNS, OR INTERESTED IN PARTNERING WITH US?
        </h6>
        <p>
          Email us or use the Email form{" "}
          <strong>
            <em>(Please allow at least 2 business days to respond)</em>
          </strong>
        </p>
      </div>
    </div>
  );
}

export default Contact;
