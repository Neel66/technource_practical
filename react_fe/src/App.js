import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "./layout/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="p-1">
      <ToastContainer closeButton={true} position="top-right" />
      <Layout></Layout>
    </div>
  );
}

export default App;
