import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CityPage from "@/pages/CityPage";
import ServicePage from "@/pages/ServicePage";
import CoveragePage from "@/pages/CoveragePage";
import FreightRoutePage from "@/pages/FreightRoutePage";
import { AboutPage, ContactsPage } from "@/pages/CompanyPages";
import RouteSeo from "@/components/RouteSeo";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/gorod/:citySlug" component={CityPage} />
      <Route path="/uslugi/:serviceSlug" component={ServicePage} />
      <Route path="/marshrut/:routeSlug" component={FreightRoutePage} />
      <Route path="/perevozki-po-rossii" component={CoveragePage} />
      <Route path="/o-kompanii" component={AboutPage} />
      <Route path="/kontakty" component={ContactsPage} />
      <Route path="/blog" component={NotFound} />
      <Route path="/blog/:articleSlug" component={NotFound} />
      <Route path="/vakansii" component={NotFound} />
      <Route path="/karta-sayta" component={NotFound} />
      <Route path="/politika-konfidencialnosti" component={NotFound} />
      <Route path="/polzovatelskoe-soglashenie" component={NotFound} />
      <Route path="/rekvizity" component={NotFound} />
      <Route path="/dogovor-oferta" component={NotFound} />
      <Route path="/sotrudnichestvo" component={NotFound} />
      <Route path="/dlya-voditeley" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <RouteSeo />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
