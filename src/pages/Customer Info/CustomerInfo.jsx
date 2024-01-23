import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import AlertNotification from "../../components/Alert/Alert";
import AccountHeader from "../../components/Header/AccountHeader";
import { ProgressUpdate } from "../../components/Table/Table";
import Title from "../../components/Title/Title";

function CustomerInfo(props) {
  const [loadingState, setLoadingState] = useState(false);
  const [user, setUser] = useState({});
  const [notificationType, setNotificationType] = useState("");
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState(false);
  const token = localStorage.getItem("token");

  const getUser = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}customerDetails`, {
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });
    return res.json();
  };

  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const handleChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingState(true);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}update/customer/${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          number: user.number,
        }),
      }
    );

    const data = await response.json();
    setNotification(true);
    if (data.status) {
      setNotificationType("success");
    } else {
      setNotificationType("error");
    }
    setMessage(data.message);
    setLoadingState(false);
    setTimeout(() => setNotification(false), 4000);
  };

  if (isLoading) return   <ProgressUpdate />;

  return (
    <div className={`px-6`}>
      <Title text={"Details"} />
      <div className="p-2">
        <header className="text-left mb-4 mt-2">
          <AccountHeader title={"My Personal Information"} />
        </header>
        <div className="row">
          <AlertNotification
            severity={notificationType}
            message={message}
            show={notification}
          />
            <Form onSubmit={handleSubmit}>
              <Row>
                <div className="col-lg-6 mb-2">
                  <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      value={data.user.firstName}
                      onChange={handleChange}
                      name="firstName"
                    />
                  </Form.Group>
                </div>

                <div className="col-lg-6 mb-2">
                  <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Last Name"
                      value={data.user.lastName}
                      onChange={handleChange}
                      name="lastName"
                    />
                  </Form.Group>
                </div>
              </Row>

              <Row>
                <div className="col-lg-6 mb-2">
                  <Form.Group controlId="email">
                    <label className="mb-2">Gender</label>
                    <Box
                      sx={{
                        "& legend": { display: "none" },
                        "& fieldset": { top: 0 },
                      }}
                    >
                      <FormControl size="small" fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={data.user.gender}
                          label="Gender"
                          onChange={handleChange}
                          name="gender"
                          defaultValue={"pnts"}
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                          <MenuItem value={"pnts"}>Prefer not to Say</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Form.Group>
                </div>

                <div className="col-lg-6 mb-2">
                  <Form.Group controlId="formGridAddress1">
                    <Form.Label>Number</Form.Label>
                    <Form.Control
                      placeholder="Enter Phone Number"
                      type="number"
                      value={data.user.number}
                      onChange={handleChange}
                      name="number"
                    />
                  </Form.Group>
                </div>
              </Row>

              <Row className="mb-5">
                <Form.Label className="mt-2">Email</Form.Label>
                <p className="font-semibold text-lg">{data.user.email}</p>
                {/* <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>
                    Birthday{" "}
                    <span className="text-sm text-muted">(optional)</span>
                  </Form.Label>
                  <Form.Control type="date" name="birthDay" />
                </Form.Group> */}
              </Row>

              <div className="d-grid gap-2 mt-8">
                {loadingState ? (
                  <Button
                    sx={{
                      "& .MuiCircularProgress-root": {
                        height: "23px !important",
                        width: "23px !important",
                      },
                    }}
                  >
                    <ProgressUpdate />
                  </Button>
                ) : (
                  <Button variant="contained" type="submit" className="mb-5">
                    Save
                  </Button>
                )}
              </div>
            </Form>
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
