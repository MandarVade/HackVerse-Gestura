import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import * as Sentry from "@sentry/react";
import CallPage from "./pages/CallPage";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <SentryRoutes>
      <Route
        path="/"
        element={isSignedIn ? <HomePage /> : <Navigate to={"/auth"} />}
      />
      <Route
        path="/auth"
        element={isSignedIn ? <Navigate to={"/"} /> : <AuthPage />}
      />

      <Route
        path="/call/:id"
        element={isSignedIn ? <CallPage /> : <Navigate to={"/auth"} />}
      />

      <Route
        path="*"
        element={
          isSignedIn ? <Navigate to={"/"} replace /> : <Navigate to={"/auth"} />
        }
      />
    </SentryRoutes>
  );
};

export default App;
