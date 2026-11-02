import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { PropsWithChildren, ReactNode } from "react";
import Index from "./pages/Index";
import Episodes from "./pages/Episodes";
import Sponsors from "./pages/Sponsors";
import Advertise from "./pages/Advertise";
import SponsorProposal from "./pages/SponsorProposal";
import SponsorKit from "./pages/SponsorKit";
import FunnelReport from "./pages/FunnelReport";
import Host from "./pages/Host";
import FamilyResources from "./pages/FamilyResources";
import FamilyReflection from "./pages/FamilyReflection";
import FearInventory from "./pages/FearInventory";
import ConversationStarters from "./pages/ConversationStarters";
import Press from "./pages/Press";
import StartHere from "./pages/StartHere";
import HelpNow from "./pages/HelpNow";
import GetHelp from "./pages/GetHelp";
import NextStep from "./pages/NextStep";
import FromPartyWreckers from "./pages/FromPartyWreckers";
import FamilyAddictionHelp from "./pages/FamilyAddictionHelp";
import InterventionReadiness from "./pages/InterventionReadiness";
import EnablingVsSupport from "./pages/EnablingVsSupport";
import RecoveryResources from "./pages/RecoveryResources";
import SponsorInfo from "./pages/SponsorInfo";
import Glossary from "./pages/Glossary";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import NewsletterPopup from "./components/NewsletterPopup";
import StickyContactForm from "./components/StickyContactForm";
import FunnelRouteTracker from "./components/FunnelRouteTracker";

const queryClient = new QueryClient();

interface AppProps {
  Router?: React.ComponentType<PropsWithChildren>;
}

const DefaultRouter = ({ children }: PropsWithChildren): ReactNode => (
  <BrowserRouter>{children}</BrowserRouter>
);

export const App = ({ Router = DefaultRouter }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <NewsletterPopup />
        <StickyContactForm />
        <FunnelRouteTracker />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/help-now" element={<HelpNow />} />
          <Route path="/get-help" element={<GetHelp />} />
          <Route path="/from-party-wreckers" element={<FromPartyWreckers />} />
          <Route path="/start-here" element={<StartHere />} />
          <Route path="/next-step" element={<NextStep />} />
          <Route path="/family-addiction-help" element={<FamilyAddictionHelp />} />
          <Route path="/intervention-readiness" element={<InterventionReadiness />} />
          <Route path="/enabling-vs-support" element={<EnablingVsSupport />} />
          <Route path="/recovery-resources" element={<RecoveryResources />} />
          <Route path="/sponsor-info" element={<SponsorInfo />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/advertise/packages" element={<SponsorProposal />} />
          <Route path="/sponsor-kit" element={<SponsorKit />} />
          <Route path="/funnel-report" element={<FunnelReport />} />
          <Route path="/host" element={<Host />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/family-resources" element={<FamilyResources />} />
          <Route path="/family-reflection" element={<FamilyReflection />} />
          <Route path="/fear-inventory" element={<FearInventory />} />
          <Route path="/conversation-starters" element={<ConversationStarters />} />
          <Route path="/press" element={<Press />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
