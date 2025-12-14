import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import Lessons from "./pages/Lessons";
import AddLesson from "./pages/AddLesson";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-course"
              element={
                <ProtectedRoute requireInstructor>
                  <AddCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-course/:id"
              element={
                <ProtectedRoute requireInstructor>
                  <EditCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lessons/:courseId"
              element={
                <ProtectedRoute>
                  <Lessons />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-lesson/:courseId"
              element={
                <ProtectedRoute requireInstructor>
                  <AddLesson />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
