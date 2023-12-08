import React from "react";
import moment from "moment";

function TimeAndLocation() {
  const today = moment(new Date()).format('MMMM Do YYYY')

  
  return (
    <div className="flex items-center justify-center my-6">
      <p className="text-white text-xl font-extralight">
        Current date: {today}
      </p>
    </div>
  );
}

export default TimeAndLocation;
