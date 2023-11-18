import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./globle.css";
import App from "./App";
import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "./lib/react-query/queryProvider";

// import SigninForm from "./_auth/forms/SigninForm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
