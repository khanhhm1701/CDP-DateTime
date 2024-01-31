import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import DateTimeComponent from "./components/DateTimeComponent/DateTimeComponent";
import RangePickerComponent from "./components/RangePickerComponent/RangePickerComponent";

function App() {
 
  return <div className="App bg-slate-100 flex justify-center items-start h-screen">
    <div className="w-1/2 h-1/2 bg-white rounded-lg overflow-hidden shadow mt-40 p-8">
      {/* <DateTimeComponent/> */}
      <RangePickerComponent />
    </div>
  </div>;
}

export default App;
