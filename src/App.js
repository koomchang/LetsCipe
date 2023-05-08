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
import { useEffect } from "react";
import Footer from "./components/Footer";

function App() {

  const { isAuthReady, user } = useAuthContext();

  // html title 지정
  useEffect(() => {
    document.title = 'Let\'s Cipe - 레시피 공유 플랫폼';
  }, []);

  // 삼항연산자를 이용해서 Auth를 받아오기 전에는 Loading 컴포넌트를 보여줌
  return (
    <div className="App" style={{ height: "100vh" }}>
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
          <Footer />
        </BrowserRouter>
      ) : <Loading></Loading>}
    </div>
  );
}

export default App
