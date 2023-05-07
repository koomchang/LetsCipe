import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Nav from './components/Nav'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import { useAuthContext } from "./hooks/useAuthContext";
import Recipes from "./pages/recipes/Recipes";
import NewRecipe from "./pages/new_recipe/NewRecipe";
import MyRecipe from "./pages/myRecipe/MyRecipe";
import Loading from "./components/Loading";
import Detail from "./pages/detail/Detail";

function App() {

  const { isAuthReady, user } = useAuthContext();

  return (
    <div className="App">
      {isAuthReady ? (
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace={true} />}></Route>
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace={true} />}></Route>
            <Route path="/new-recipe" element={user ? <NewRecipe /> : <Navigate to="/" replace={true} />}></Route>
            <Route path="/my-recipe" element={user ? <MyRecipe /> : <Navigate to="/" replace={true} />}></Route>
            <Route path="/recipes" element={<Recipes />}></Route>
            <Route path="/recipes/:id" element={user ? <Detail /> : <Navigate to="/" replace={true} />}></Route>
          </Routes>
        </BrowserRouter>
      ) : <Loading></Loading>}

    </div>
  );
}

export default App
