import { useState } from "react";
import employees from "./employe.information.js";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(1);
  console.log(selectedEmployee);
  const selectedEmploye = (id) => {
    setSelectedEmployee(id);
  };

  return (
    <>
      <div className="container">
        <div className="information">
          {employees.map((emp) => (
            <div
              onClick={() => selectedEmploye(emp.id)}
              key={emp.id}
              className="employee-card"
            >
              {emp.firstName} {emp.lastName} - {emp.position}
            </div>
          ))}
        </div>
        <div className="emplpoyee-data">
          {employees
            .filter((emp) => emp.id === selectedEmployee)
            .map((emp) => (
              <div key={emp.id}>
                <h2>
                  {emp.firstName} {emp.lastName}
                </h2>
                <img src={emp.photo} alt={`${emp.firstName} ${emp.lastName}`} />
                <p>Email: {emp.email}</p>
                <p>Position: {emp.position}</p>
                <p>Department: {emp.department}</p>
                <p>Salary: ${emp.salary}</p>
                <p>Hire Date: {emp.hireDate}</p>
                <p>Phone: {emp.phone}</p>
                <p>Address: {emp.address}</p>
                <p>Status: {emp.status}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
