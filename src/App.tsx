import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import PatientPortal from "./pages/PatientPortal";
import HospitalPortal from "./pages/HospitalPortal";
import VerifyPage from "./pages/VerifyPage";
import BlockchainExplorer from "./pages/BlockchainExplorer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/patient" element={<PatientPortal />} />
            <Route path="/hospital" element={<HospitalPortal />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/explorer" element={<BlockchainExplorer />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
