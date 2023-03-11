import React from "react";
import PropTypes from "prop-types";

const UserPanel = ({ id, username, email, role }) => {
  return (
    <article className="flex flex-col lg:flex-row gap-4 lg:gap-8 mb-10">
      <div className="relative h-48 w-10/12 md:w-7/12 lg:w-4/12 rounded">
        <div className="row"> {username} </div>
        <div className="row"> {email} </div>
        <div className="row"> {role} </div>
      </div>
    </article>
  );
};

UserPanel.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default UserPanel;
