import React from "react";

function TimeAndLocation() {
  const today = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
  
  return (
    <div className="flex items-center justify-center my-6">
      <p className="text-white text-xl font-extralight">
        Date: {today}
      </p>
    </div>
  );
}

export default TimeAndLocation;
