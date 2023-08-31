import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const SmallLoader:React.FC = () => {
  return (
    <div className="h-4">
      <Box sx={{ display: "flex" }}>
        <CircularProgress size={20} sx={{ color: "teal", size: "10" }} />
      </Box>
    </div>
  );
};

export default SmallLoader;
