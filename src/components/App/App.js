import React, { useState, useEffect } from "react";
import "./App.css";
import { readDB, writeToDB, updateInDB, deleteFromDB } from "../../components/Utils/db";
import { generatePassword } from "../../components/Utils/passwordUtils"

function App() {
  const [serviceName, setServiceName] = useState("");
  const [passwordList, setPasswordList] = useState([]);
  const [uniquePassword, setUniquePassword] = useState("");

  useEffect(() => {
    setPasswordList(readDB());
  }, []);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(passwordList);
    writeToDB(serviceName, newPassword);
    setPasswordList([...passwordList, { serviceName, password: newPassword }]);
    setUniquePassword(newPassword);
  };

  const handleUpdatePassword = (serviceName) => {
    const newPassword = generatePassword(passwordList);
    updateInDB(serviceName, newPassword);
    setPasswordList(passwordList.map((item) => item.serviceName === serviceName ? { ...item, password: newPassword } : item));
  };

  const handleDeletePassword = (serviceName) => {
    deleteFromDB(serviceName);
    setPasswordList(passwordList.filter((item) => item.serviceName !== serviceName));
  };

  return (
    <div className="App">
      <h1>Offline Password Generator</h1>
      <input
        type="text"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        placeholder="Enter service name"
      />
      <button onClick={handleGeneratePassword}>Generate Password</button>
      {uniquePassword && (
        <p>
          Generated password for {serviceName}: {uniquePassword}
        </p>
      )}
      <button onClick={() => setUniquePassword("")}>
        Hide Generated Password
      </button>
      <h2>Password List</h2>
      <ul className="list-container">
        {passwordList.map((item) => (
          <div className="list-row"> 
          <li key={item.serviceName}>
            {item.serviceName}: {item.password}
            </li>
            
            <li>
            <button onClick={() => handleUpdatePassword(item.serviceName)}>Update</button>
            <button onClick={() => handleDeletePassword(item.serviceName)}>Delete</button>
          </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
