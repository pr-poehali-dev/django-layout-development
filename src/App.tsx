
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ActingPage from "./pages/ActingPage";
import OratoryPage from "./pages/OratoryPage";
import AdminPage from "./pages/AdminPage";
import BlogPage from "./pages/BlogPage";
import ReviewsPage from "./pages/ReviewsPage";
import TeamPage from "./pages/TeamPage";
import ContactsPage from "./pages/ContactsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ActingPage />} />
          <Route path="/oratory" element={<OratoryPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;