import { Box } from "@mui/material";
import PolicyPage from "./component/PolicyPage";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 20,
        width: "100vw", // Ensures it takes full width
        textAlign: "center", // Centers the title
      }}
    >
      <h1>Managemen Polis</h1>
      <PolicyPage />
    </div>
  );
}

export default App;
