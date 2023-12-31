import {Home, Login, AddEvent, Registration, FullEvent, AdminRoom} from "./pages";
import { Header } from "./components/Header";
import Container from "@mui/material/Container";
import { Routes, Route } from 'react-router-dom';
import { ErrorPage } from "./pages/ErrorPage";

function App() {

  return (
      <>
        <Header />
        <Container maxWidth="lg">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<AddEvent />} path="/event/" />
            <Route element={<FullEvent />} path="/event/:eventId" />
            <Route element={<Login />} path="/login" />
            <Route element={<Registration />} path="/register" />
            <Route element={<AdminRoom />} path="/statistics" />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Container>
      </>
  );
}

export default App;