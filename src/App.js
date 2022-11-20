import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConsentInfo from './components/consentInfo';

function App() {
  console.log("Coming to App");
  return (
    <div id="root">
      <BrowserRouter>
      <Routes>
        <Route path="/v1/consent" element={<ConsentInfo />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
