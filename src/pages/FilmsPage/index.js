import { Routes, Route } from "react-router-dom";
import List from "./List";
import DetailedInfo from "./DetailedInfo";

function FilmsPage() {
  return (
    <div>
      <Routes>
        <Route path=":id" element={<DetailedInfo />} />
        <Route index element={<List />} />
      </Routes>
    </div>
  );
}

export default FilmsPage;
