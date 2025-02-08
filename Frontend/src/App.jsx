import { Box } from "@mui/material";
import PolicyPage from "./component/PolicyPage";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 3,
      }}
    >
      <h1>Managemen Polis</h1>
      <PolicyPage />
    </Box>
  );
}

export default App;
