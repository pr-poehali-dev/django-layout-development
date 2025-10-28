
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ActingPage from "./pages/ActingPage";
import OratoryPage from "./pages/OratoryPage";
import ActingShowreelPage from "./pages/ActingShowreelPage";
import AdminPage from "./pages/AdminPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ReviewsPage from "./pages/ReviewsPage";
import TeamPage from "./pages/TeamPage";
import TeacherPage from "./pages/TeacherPage";
import ContactsPage from "./pages/ContactsPage";
import MetrikaGoalPage from "./pages/MetrikaGoalPage";
import SitemapPage from "./pages/SitemapPage";
import NotFound from "./pages/NotFound";
import { saveUTMToStorage } from "./lib/utm";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    saveUTMToStorage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ActingPage />} />
            <Route path="/oratory" element={<OratoryPage />} />
            <Route path="/showreel" element={<ActingShowreelPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/teacher" element={<TeacherPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/sitemap.xml" element={<SitemapPage />} />
            <Route path="/metrika-goal" element={<MetrikaGoalPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;