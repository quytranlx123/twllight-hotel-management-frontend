import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { MainContentDashBoard } from "../components/MainContentDashBoard";
import { BookingProvider } from "../context/BookingsContext";
import { ListUserProvider } from "../context/ListUserContext";

export function Dashboard() {
  const [open, setOpen] = useState(0);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <ListUserProvider>
      <BookingProvider>
        <div className="flex flex-row h-screen">
          <div className="w-1/6">
            <Sidebar
              open={open}
              handleOpen={handleOpen}
              onSelect={setSelectedStatuses}
            />
          </div>
          <div className="flex-1">
            <MainContentDashBoard open={open} statuses={selectedStatuses}  />
          </div>
        </div>
      </BookingProvider>
    </ListUserProvider>
  );
}
