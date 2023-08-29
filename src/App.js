import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import Container from "@mui/material/Container";
import { Routes, Route } from 'react-router-dom';
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";


function App() {
  return (
      <>
        <Header />
        <Container maxWidth="lg">
          <Routes>
            <Route element={<Home />} path="/" />
            {/*<Route element={<AddPost />} path="/posts/create" />*/}
            {/*<Route element={<AddPost />} path="/posts/:id/edit" />*/}
            {/*<Route element={<FullPost />} path="/posts/:id" />*/}
            <Route element={<Login />} path="/login" />
            <Route element={<Registration />} path="/register" />
          </Routes>
        </Container>
      </>
  );
}

export default App;
