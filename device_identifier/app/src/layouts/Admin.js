import React from "react";

// reactstrap components
import Dashboard from "views/Dashboard.js";
import DemoNavbar from "components/Navbars/DemoNavbar.js";

function Admin() {
  return (
    <div className="main-panel" style={{width: '100%'}}>
      <DemoNavbar />
      <Dashboard />
    </div>
  );
}

export default Admin;
