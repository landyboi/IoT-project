import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const Selector = ({ devices }) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  
  return (
    <div className="w-72 font-medium relative">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          !selected && "text-gray-700"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Select Sensor"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      {open && ( // Render the dropdown only when 'open' is true
        <div className="absolute z-10 top-full left-0 right-0 bg-white shadow-md">
          <div className="flex items-center px-2 sticky top-0 bg-white">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
              placeholder="Enter sensor name"
              className="placeholder:text-gray-700 p-2 outline-none"
            />
          </div>
          <ul className="overflow-y-auto max-h-60">
            {devices?.data.map((device) => (
              <li
                key={device?.name}
                className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                  ${
                    device?.name?.toLowerCase() === selected?.toLowerCase() &&
                    "bg-sky-600 text-white"
                  }
                  ${
                    device?.name?.toLowerCase().startsWith(inputValue)
                      ? "block"
                      : "hidden"
                  }`}
                onClick={() => {
                    setSelected(device?.name);
                    setOpen(false);
                    setInputValue("");
                }}
              >
                {device?.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Selector;
