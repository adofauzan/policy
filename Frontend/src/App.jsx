import { Box } from "@mui/material";
import PolicyForm from "./component/PolicyForm";
import PolicyTable from "./component/PolicyTable";

function App() {
  return (
    <Box>
      <h1>Managemen Polis</h1>
      <PolicyTable />
      <PolicyForm />
    </Box>
  );
}

export default App;
