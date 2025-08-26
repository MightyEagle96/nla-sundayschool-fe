import { useState } from "react";
import logo from "../assets/logo.png";
import {
  adultClassess,
  classes,
  genders,
  titles,
  yayaClasses,
} from "./registrationData";
import { Modal } from "react-bootstrap";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import { toast } from "react-toastify";
import httpService from "../httpService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  category: string;
  className: string;
  title: string;
  confirmPassword: string;
  phoneNumber: string;
}
function RegisterPage() {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    category: "",
    className: "",
    title: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [error, setError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [shortPassword, setShortPassword] = useState<boolean>(false);

  const [errors, setErrors] = useState<Partial<UserData>>({});

  const navigate = useNavigate();

  const handleChange = (
    e: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement //setUserData({ ...userData, [e.name]: e.value });
  ) => {
    const { name, value } = e;

    setUserData((prev) => {
      // if category changes, reset classCategory
      if (name === "category") {
        return { ...prev, [name]: value, classCategory: "" };
      }
      return { ...prev, [name]: value };
    });

    // live validation
    if (name === "email" && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    } else if (name === "phoneNumber" && !validateNigerianPhone(value)) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: "Phone number must be 11 digits starting with 0",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const showPreview = () => {
    if (userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match");
      setError(true);
      return;
    }

    if (errors.email || errors.phoneNumber) {
      toast.error("Email or Phone number is invalid");
      setError(true);
      return;
    }
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.password ||
      !userData.gender ||
      !userData.category ||
      !userData.className
    ) {
      toast.error("All fields are required");
      // setError(true);
      return;
    }
    setShow(true);
  };

  const createAccount = async () => {
    Swal.fire({
      icon: "question",
      title: "Create Account",
      text: "Are you sure you want to create your account?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data, status } = await httpService.post(
          "auth/register",
          userData
        );

        if (status !== 200) {
          toast.error(data);
        } else {
          navigate("/accountnotification");
        }
      }
    });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNigerianPhone = (phone: string): boolean => {
    const phoneRegex = /^0\d{10}$/; // must start with 0 and be 11 digits
    return phoneRegex.test(phone);
  };
  return (
    <div>
      <div className="pt-5 container">
        <div className="text-center">
          <img src={logo} alt="" height={100} />
          <div className="mt-4">
            <Typography variant="h6">Create your account</Typography>
          </div>
        </div>
        <div className="row d-flex justify-content-center  mt-5">
          <div className="col-lg-5 mb-5">
            <div className="mb-4">
              <Typography variant="caption">Personal Information</Typography>
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                name="title"
                label="Title"
                select
                onChange={(e) => handleChange(e.target)}
              >
                {titles.map((c, i) => (
                  <MenuItem value={c} key={i}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                name="gender"
                label="Gender"
                select
                onChange={(e) => handleChange(e.target)}
              >
                {genders.map((c, i) => (
                  <MenuItem value={c} key={i}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="mb-3">
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                onChange={(e) => handleChange(e.target)}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                onChange={(e) => handleChange(e.target)}
              />
            </div>
          </div>
          <div className="col-lg-5 mb-5">
            <div className="mb-4">
              <Typography variant="caption">
                Sunday School Class Information
              </Typography>
            </div>
            <div className="mb-3">
              <TextField
                select
                label="Sunday School class category"
                name="category"
                fullWidth
                onChange={(e) => {
                  setUserData({ ...userData, className: "" });
                  handleChange(e.target);
                }}
              >
                {classes.map((c, i) => (
                  <MenuItem value={c} key={i}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="mb-3">
              {userData.category === "YAYA" && (
                <TextField
                  fullWidth
                  select
                  label="YAYA Class"
                  name="className"
                  onChange={(e) => handleChange(e.target)}
                  value={userData.className}
                >
                  {yayaClasses.map((c, i) => (
                    <MenuItem value={c} key={i}>
                      {c}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              {userData.category === "Adult" && (
                <TextField
                  fullWidth
                  select
                  label="Adult Class"
                  name="className"
                  onChange={(e) => handleChange(e.target)}
                >
                  {adultClassess.map((c, i) => (
                    <MenuItem value={c} key={i}>
                      {c}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </div>
          </div>
          <div className="col-lg-5 mb-5">
            <div className="mb-4">
              <Typography variant="caption">Contact Information</Typography>
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={(e) => handleChange(e.target)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                onChange={(e) => handleChange(e.target)}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </div>
          </div>
          <div className="col-lg-5 mb-5">
            <div className="mb-4">
              <Typography variant="caption">Password</Typography>
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                onChange={(e) => handleChange(e.target)}
                onBlur={(e) => {
                  setShortPassword(e.target.value.length < 8);
                  setError(e.target.value !== userData.password);
                }}
                helperText={shortPassword ? "Password too short" : ""}
                error={error || shortPassword}
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                error={error}
                helperText="Passwords don't not match"
                onBlur={(e) => setError(e.target.value !== userData.password)}
                onChange={(e) => handleChange(e.target)}
              />
            </div>
            <div className="mb-3"></div>
          </div>
          <div className="col-lg-3 mb-5 text-center">
            <Button
              endIcon={<Person />}
              color="success"
              fullWidth
              disabled={error || shortPassword}
              onClick={showPreview}
            >
              Preview Registration
            </Button>
            <a href="/" className="text-danger nav-link">
              Already have an account? Login
            </a>
          </div>
        </div>
      </div>
      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <Typography variant="h6">Preview Registration</Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6 mb-3">
              <Typography variant="body1" className="fw-bold">
                Name
              </Typography>
              <Typography variant="body1">
                {userData.firstName} {userData.lastName}
              </Typography>
            </div>
            <div className="col-lg-6 mb-3">
              <Typography variant="body1" className="fw-bold">
                Email
              </Typography>
              <Typography variant="body1">{userData.email}</Typography>
            </div>
            <div className="col-lg-6 mb-3">
              <Typography variant="body1" className="fw-bold">
                Phone Number
              </Typography>
              <Typography variant="body1">{userData.phoneNumber}</Typography>
            </div>
            <div className="col-lg-6 mb-3">
              <Typography variant="body1" className="fw-bold">
                Class Category
              </Typography>
              <Typography variant="body1">{userData.category}</Typography>
            </div>
            <div className="col-lg-6 mb-3">
              <Typography variant="body1" className="fw-bold">
                Class Name
              </Typography>
              <Typography variant="body1">{userData.className}</Typography>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={createAccount} variant="contained" color="success">
            Create Account
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RegisterPage;
