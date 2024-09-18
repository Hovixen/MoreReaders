import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SideBar from "./components/sidebar/SideBar";
import BookDetails from "./components/BookItemDetails/details";
import BookShelves from "./components/BookShelves/shelflist";
import Library from "./components/library/Library";
import Profile from "./pages/profile/Profile";
import Home from "./pages/Homepage/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./style.scss";
import { AuthContext } from "./context/authContext";
import { DarkModeContext } from "./context/darkModeContext";
import Friends from "./components/friends/Friends";
import Messenger from "./pages/Messanger/Messenger";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <SideBar />
          <div style={{ flex: 7 }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const MessengerLayout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <Outlet />
      </div>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/profile/:identifier",
          element: <Profile />,
        },

        {
          path: "/book",
          element: <BookShelves />,
        },

        {
          path: "/book/:id",
          element: <BookDetails />,
        },

        {
          path: "/Library",
          element: <Library />,
        },

        {
          path: "/friends",
          element: <Friends />,
        }
      ],
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/messenger",
      element: (
        <ProtectedRoute>
          <MessengerLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/messenger",
          element: <Messenger />,
        }
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;