import React from "react";

function Error({ message, icon }) {
  return (
    <section className="section error">
      <p>
        {message}
        <span>{icon}</span>
      </p>
    </section>
  );
}

export default Error;
