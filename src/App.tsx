import { Navigate, Route, Routes } from "react-router-dom";
import * as router from "@router/router";
import BaseLayout from "@layouts/BaseLayout.tsx";
import { Suspense } from "react";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        {router.PUBLIC_PAGE.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={<Suspense fallback={<div>Loading....</div>} children={<page.element />} />}
          />
        ))}
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
};

export default App;
