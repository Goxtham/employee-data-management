import { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Employee Manager</h1>

      {/* Add Employee Form */}
      <AddEmployee onEmployeeAdded={() => setRefresh(!refresh)} />

      {/* Employee List */}
      <EmployeeList key={refresh.toString()} />
    </div>
  );
}

export default App;
