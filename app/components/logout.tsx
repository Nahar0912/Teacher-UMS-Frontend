import React from "react";

const Logout = () => {

  const handleLogout = () => {
    // Clear the stored email and token from local storage
    localStorage.removeItem("email");

    // Redirect to the login page and reload the page
    window.location.href = "/signin";
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
