import React from "react";

function TimeAndLocation() {
  const today = new Date().toLocaleDateString('fi-FI')

  
  return (
    <div className="flex items-center justify-center my-6">
      <p className="text-white text-xl font-extralight">
        Current date: {today}
      </p>
    </div>
  );
}

export default TimeAndLocation;
