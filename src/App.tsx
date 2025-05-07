
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIPreferences from "./pages/AIPreferences";
import Documents from "./pages/Documents";
import ImageGeneration from "./pages/ImageGeneration";
import CodeAssistant from "./pages/CodeAssistant";
import ArchivedChats from "./pages/ArchivedChats";
import MCP from "./pages/MCP";
import { ThemeProvider } from "./hooks/useTheme";
import { ChatProvider } from "./context/ChatContext";
import { SettingsProvider } from "./context/SettingsContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <SettingsProvider>
          <ChatProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/ai-preferences" element={<AIPreferences />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/image-generation" element={<ImageGeneration />} />
                <Route path="/code-assistant" element={<CodeAssistant />} />
                <Route path="/archived-chats" element={<ArchivedChats />} />
                <Route path="/mcp" element={<MCP />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ChatProvider>
        </SettingsProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
