import { Typography, Box, CircularProgress } from "@mui/material";
import logo from "../assets/logo.png";
import { appColors } from "../assets/appTheme";

function LoadingPage() {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="text-center floating-logo">
        <img src={logo} className="" alt="RCCG Logo" width="100" height="100" />

        <div className="mt-2">
          <Typography variant="h6" color={appColors.primary2}>
            RCCG NEW LIFE ASSEMBLY
          </Typography>
          <Typography
            fontWeight={300}
            fontStyle={"italic"}
            color={appColors.light2}
          >
            Sunday School Department
          </Typography>

          {/* Circular Progress with gradient */}
          <Box sx={{ position: "relative", display: "inline-flex", mt: 2 }}>
            <CircularProgress
              size={20}
              thickness={3}
              sx={{
                "svg circle": {
                  stroke: "url(#gradientColors)",
                },
              }}
            />
            {/* Gradient definition */}
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="gradientColors"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#124170" />
                  <stop offset="50%" stopColor="#26667F" />
                  <stop offset="100%" stopColor="#67C090" />
                </linearGradient>
              </defs>
            </svg>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
