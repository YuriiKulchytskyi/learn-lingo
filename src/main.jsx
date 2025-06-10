import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./componenst/Layout/Layout.jsx";
import { TeacherPage } from "./pages/TeacherPage.jsx";
import { MainPage } from "./pages/MainPage.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "teachers", element: <TeacherPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
);
