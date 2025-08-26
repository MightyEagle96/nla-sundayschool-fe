import { Button, TextField, Typography } from "@mui/material";
import logo from "../assets/logo.png";
import { Login } from "@mui/icons-material";
import { useState, type FormEvent } from "react";
import httpService from "../httpService";
import { toast } from "react-toastify";
import { appColors } from "../assets/appTheme";

function LoginPage() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

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
  };

  const loginData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data, status } = await httpService.post("auth/login", userData);

    if (status === 200) {
      window.location.href = "/";
    } else toast.error(data);

    setLoading(false);
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-center row pt-3">
        <div className="col-lg-4 ">
          <div className="">
            <div className="text-center">
              <img src={logo} alt="" height={100} />
              <div className="mt-3">
                <Typography
                  variant="h5"
                  color={appColors.primary2}
                  fontWeight={700}
                >
                  RCCG NEW LIFE ASSEMBLY
                </Typography>
                <Typography
                  color={appColors.text}
                  variant="body1"
                  fontWeight={400}
                >
                  Sunday School Department
                  <br /> E-Examination Portal
                </Typography>
              </div>
            </div>
            <form onSubmit={loginData}>
              <div className="mt-5 mb-3">
                <TextField
                  fullWidth
                  label="Email or Phone Number"
                  name="email"
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="mb-3">
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  onChange={(e) => handleChange(e.target)}
                />
              </div>

              <div className="mb-4 text-center ">
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  endIcon={<Login />}
                  loading={loading}
                  loadingPosition="end"
                >
                  Login
                </Button>
              </div>
            </form>
            <div className="mb-4 text-center">
              <a href="/register" className="nav-link text-danger">
                Don't have an account? Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
