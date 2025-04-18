
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { UserRole } from "@/lib/types";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import AdminPanel from "./pages/AdminPanel";
import SCEObjectsPage from "./pages/SCEObjectsPage";
import SCEObjectDetail from "./pages/SCEObjectDetail";
import SCEObjectCreate from "./pages/SCEObjectCreate";
import PostsPage from "./pages/PostsPage";
import PostDetail from "./pages/PostDetail";
import PostCreate from "./pages/PostCreate";
import ProfilePage from "./pages/ProfilePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            
            {/* SCE Objects routes */}
            <Route path="/objects" element={<SCEObjectsPage />} />
            <Route path="/objects/:id" element={<SCEObjectDetail />} />
            
            {/* Posts routes */}
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            
            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            
            {/* Admin routes */}
            <Route element={<ProtectedRoute requiredRole={UserRole.ADMIN} />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
            
            {/* Routes for content creation */}
            <Route element={<ProtectedRoute />}>
              <Route path="/objects/create" element={<SCEObjectCreate />} />
              <Route path="/posts/create" element={<PostCreate />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
