import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { FunctionsHttpError, type Session } from "@supabase/supabase-js";
import { safeGetItem, safeRemoveItem, safeSetItem } from "@/lib/safeStorage";
import { ArrowDownRight, ArrowUpRight, BarChart3, CalendarDays, CheckSquare, ClipboardList, Download, DollarSign, FileText, HeartHandshake, KeyRound, Lock, LogOut, Mail, MailCheck, Minus, Plus, Printer, RefreshCw, Save, Trash2, Upload } from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import ListenerQuestionsAdmin from "@/components/ListenerQuestionsAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

interface NorthStarData {
  this_week: number;
  last_week: number;
  /** Monday-start weeks (YYYY-MM-DD), oldest to newest, normally 12 of them. */
  weekly: Array<{ week_start: string; count: number }>;
  /** Top articles/pages that help requests came from, last 30 days. */
  by_source: Array<{ name: string; count: number }>;
}

interface FunnelReportData {
  /** Includes help_requests and page_views from newer versions of the report function. */
  totals: Record<string, number>;
  north_star?: NorthStarData;
  top_viewed_pages?: Array<{ name: string; count: number }>;
  by_event: Array<{ name: string; count: number }>;
  top_pages: Array<{ name: string; count: number }>;
  top_destinations: Array<{ name: string; count: number }>;
  listener_lead_pages?: Array<{ name: string; count: number }>;
  listener_lead_destinations?: Array<{ name: string; count: number }>;
  advertiser_pages?: Array<{ name: string; count: number }>;
  sponsor_package_interest?: Array<{ name: string; count: number }>;
  sponsor_impressions_by_sponsor?: Array<{ name: string; count: number }>;
  sponsor_clicks_by_sponsor?: Array<{ name: string; count: number }>;
  sponsor_placements?: Array<{ name: string; count: number }>;
  sponsor_pages?: Array<{ name: string; count: number }>;
  latest_events: Array<Record<string, string | null>>;
}

interface SponsorProspect {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  source_path: string | null;
  status: string;
  metadata: Record<string, unknown> | null;
}

const reportTokenKey = "party_wreckers_report_secret";
const prospectStatuses = ["new", "contacted", "proposal_sent", "negotiating", "sold", "lost"];
const sponsorSlotStatuses = ["available", "reserved", "sold"];
const sponsorSlotTypes = [
  {
    id: "episode",
    label: "Episode sponsor",
    capacity: 4,
    guidance: "Offer a specific episode theme or hold one slot while sponsor fit is confirmed.",
    soldOutGuidance: "Episode inventory is full. Offer next month or move them into a bundle waitlist.",
  },
  {
    id: "monthly_site",
    label: "Monthly site sponsor",
    capacity: 3,
    guidance: "Offer a tracked page placement tied to a relevant recovery or family topic.",
    soldOutGuidance: "Site inventory is full. Offer next month or a podcast-only sponsor slot.",
  },
  {
    id: "bundle",
    label: "Bundle sponsor",
    capacity: 1,
    guidance: "Reserve this for the best-fit sponsor with podcast plus website value.",
    soldOutGuidance: "Bundle inventory is full. Offer next month or split the package into episode plus site waitlist.",
  },
];
const sponsorChecklistItems = [
  ["logo_received", "Logo received"],
  ["link_received", "Link received"],
  ["copy_approved", "Copy approved"],
  ["placement_live", "Placement live"],
  ["first_report_sent", "First report sent"],
] as const;
const sponsorCategories = [
  "Treatment center",
  "Sober living",
  "Detox provider",
  "Therapist",
  "Recovery coach",
  "Author / course",
  "Recovery tech",
  "Intervention / family service",
  "Other",
];
const emptyTargetForm = {
  company: "",
  name: "",
  email: "",
  sponsorCategory: sponsorCategories[0],
  contactRole: "",
  website: "",
  message: "",
};
const outreachTemplates = [
  {
    id: "first_contact",
    label: "First contact",
    subject: "Sponsoring Party Wreckers",
    body: "I wanted to reach out because Party Wreckers reaches families and recovery-adjacent listeners while they are thinking about addiction, support, treatment, and next steps. If your organization is open to sponsor placements, I can send the package page and current inventory.",
  },
  {
    id: "follow_up",
    label: "Follow-up",
    subject: "Following up on Party Wreckers sponsorship",
    body: "Just wanted to follow up on the Party Wreckers sponsor options. The available packages include episode sponsorship, monthly site placement, and a podcast plus website bundle. Happy to point you toward the best fit if this is still worth exploring.",
  },
  {
    id: "proposal",
    label: "Proposal link",
    subject: "Party Wreckers sponsor package",
    body: "Here is the sponsor package page with the Episode Sponsor, Monthly Site Sponsor, and Bundle Sponsor options: https://partywreckers.com/advertise/packages. If one looks close, reply with the package that fits and I can send available inventory.",
  },
  {
    id: "not_fit",
    label: "Not a fit",
    subject: "Party Wreckers sponsor fit",
    body: "Thanks for taking a look. I do not think this is the right sponsor fit for Party Wreckers right now, but I appreciate the conversation and will keep you in mind if the audience or inventory changes.",
  },
  {
    id: "asset_request",
    label: "Asset request",
    subject: "Sponsor assets for Party Wreckers",
    body: "To get your sponsor placement ready, please send the final sponsor URL, logo, approved short copy, and any required language. Once the placement is live, I will track activity for the first sponsor report.",
  },
];

const weeklyFunnelRhythm = [
  {
    title: "Monday: publish and index",
    body: "Confirm the latest Lovable publish is live, open Search Console, resubmit https://partywreckers.com/sitemap.xml, and inspect the newest source page URL.",
  },
  {
    title: "Tuesday: strengthen links",
    body: "Add or update internal links from the homepage, episodes page, blog index, and two relevant articles into the strongest source page.",
  },
  {
    title: "Wednesday: listener path check",
    body: "Review Family Squares, Get Answers Now, and Intervention Readiness clicks. Rewrite one CTA if the path is getting views but not clicks.",
  },
  {
    title: "Thursday: sponsor proof",
    body: "Export the sponsor report, note the best pages and placements, and prepare one proof point for outreach.",
  },
  {
    title: "Friday: money list",
    body: "Contact 10 sponsor prospects, follow up with 5, move 2 into proposal or close status, and mark the rest yes, no, or maybe.",
  },
];

const FunnelReport = () => {
  // Nothing here reads storage or window during render: the page is prerendered, so the
  // saved access key and the auth session are picked up in an effect after hydration.
  const [session, setSession] = useState<Session | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [signInState, setSignInState] = useState<"idle" | "sending" | "sent">("idle");
  const [signInMessage, setSignInMessage] = useState<string | null>(null);
  const [useAccessKey, setUseAccessKey] = useState(false);
  const [secret, setSecret] = useState("");
  const [hasSavedKey, setHasSavedKey] = useState(false);
  const [data, setData] = useState<FunnelReportData | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [reportError, setReportError] = useState<string | null>(null);
  const [prospects, setProspects] = useState<SponsorProspect[]>([]);
  const [prospectStatus, setProspectStatus] = useState<"idle" | "loading" | "saving" | "error">("idle");
  const [prospectError, setProspectError] = useState<string | null>(null);
  const [inventoryMonth, setInventoryMonth] = useState(getCurrentSponsorMonth);
  const [targetForm, setTargetForm] = useState(emptyTargetForm);
  const [csvInput, setCsvInput] = useState("");
  const autoLoadedUserRef = useRef<string | null>(null);

  const accessKey = useAccessKey ? secret.trim() : "";
  const canAuthorize = Boolean(session) || Boolean(accessKey);
  // Signed-in requests carry the user's JWT automatically; the legacy key is only sent
  // when the owner has chosen "Use access key instead".
  const accessHeaders = (): Record<string, string> => (accessKey ? { "x-report-secret": accessKey } : {});

  const runReportLoad = useCallback(
    async (headers: Record<string, string>, context: { signedIn: boolean; usingKey: boolean }) => {
      setStatus("loading");
      setReportError(null);

      const { data: report, error } = await supabase.functions.invoke("party-wreckers-funnel-report", { headers });

      if (error) {
        setStatus("error");
        setReportError(
          describeAccessError(error, context) ||
            "Could not load the report. Try again, and confirm the backend function is deployed.",
        );
        return;
      }

      setData(report as FunnelReportData);
      setStatus("idle");
    },
    [],
  );

  useEffect(() => {
    const savedKey = safeGetItem(reportTokenKey);
    if (savedKey) {
      setSecret(savedKey);
      setHasSavedKey(true);
    }

    const linkError = readAuthLinkError();
    if (linkError) setSignInMessage(linkError);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);
      setAuthChecked(true);

      if (event === "SIGNED_OUT") {
        autoLoadedUserRef.current = null;
        setData(null);
        setProspects([]);
        return;
      }

      // Load the report once per signed-in user. Deferred because supabase-js holds its
      // auth lock while this callback runs, and invoke() needs that lock to read the token.
      const userId = nextSession?.user.id;
      if (userId && autoLoadedUserRef.current !== userId) {
        autoLoadedUserRef.current = userId;
        setSignInState("idle");
        setSignInMessage(null);
        setTimeout(() => void runReportLoad({}, { signedIn: true, usingKey: false }), 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [runReportLoad]);

  const loadReport = async () => {
    if (accessKey) {
      safeSetItem(reportTokenKey, accessKey);
      setHasSavedKey(true);
    }
    await runReportLoad(accessHeaders(), { signedIn: Boolean(session), usingKey: Boolean(accessKey) });
  };

  const sendSignInLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const address = email.trim();
    if (!address || typeof window === "undefined") return;

    setSignInState("sending");
    setSignInMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email: address,
      options: {
        emailRedirectTo: `${window.location.origin}/funnel-report`,
        shouldCreateUser: false,
      },
    });

    if (error) {
      setSignInState("idle");
      setSignInMessage(describeSignInError(error));
      return;
    }

    setSignInState("sent");
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    // If the server can't be reached, still end the session on this device.
    if (error) await supabase.auth.signOut({ scope: "local" });
    autoLoadedUserRef.current = null;
    setSession(null);
    setData(null);
    setProspects([]);
    setStatus("idle");
    setReportError(null);
    setProspectStatus("idle");
    setProspectError(null);
  };

  const forgetAccessKey = () => {
    safeRemoveItem(reportTokenKey);
    setHasSavedKey(false);
    setSecret("");
  };

  const failProspects = (error: unknown) => {
    setProspectStatus("error");
    setProspectError(
      describeAccessError(error, { signedIn: Boolean(session), usingKey: Boolean(accessKey) }) ||
        "Could not load or save sponsor prospects. Try again, and confirm the backend function is deployed.",
    );
  };

  const loadProspects = async () => {
    setProspectStatus("loading");
    setProspectError(null);
    const { data: result, error } = await supabase.functions.invoke("party-wreckers-advertiser-admin", {
      headers: accessHeaders(),
      body: {
        action: "list",
      },
    });

    if (error) {
      failProspects(error);
      return;
    }

    setProspects((result?.prospects || []) as SponsorProspect[]);
    setProspectStatus("idle");
  };

  const updateProspect = (id: string, updates: Partial<SponsorProspect>) => {
    setProspects((current) =>
      current.map((prospect) => (prospect.id === id ? { ...prospect, ...updates } : prospect)),
    );
  };

  const updateProspectMetadata = (id: string, metadataUpdates: Record<string, string>) => {
    setProspects((current) =>
      current.map((prospect) =>
        prospect.id === id
          ? { ...prospect, metadata: { ...(prospect.metadata || {}), ...metadataUpdates } }
          : prospect,
      ),
    );
  };

  const saveProspect = async (prospect: SponsorProspect) => {
    setProspectStatus("saving");
    setProspectError(null);
    const { data: result, error } = await supabase.functions.invoke("party-wreckers-advertiser-admin", {
      headers: accessHeaders(),
      body: {
        action: "update",
        id: prospect.id,
        status: prospect.status,
        metadata_patch: buildProspectMetadataPatch(prospect),
      },
    });

    if (error) {
      failProspects(error);
      return;
    }

    if (result?.prospect) {
      updateProspect(prospect.id, result.prospect as SponsorProspect);
    }
    setProspectStatus("idle");
  };

  const createTarget = async () => {
    if (!targetForm.company && !targetForm.email) return;
    setProspectStatus("saving");
    setProspectError(null);

    const { data: result, error } = await supabase.functions.invoke("party-wreckers-advertiser-admin", {
      headers: accessHeaders(),
      body: {
        action: "create",
        prospect: {
          name: targetForm.name,
          email: targetForm.email,
          company: targetForm.company,
          message: targetForm.message || `Owner-added sponsor target: ${targetForm.sponsorCategory}`,
          status: "new",
          sponsor_category: targetForm.sponsorCategory,
          contact_role: targetForm.contactRole,
          website: targetForm.website,
          target_source: "manual",
        },
      },
    });

    if (error) {
      failProspects(error);
      return;
    }

    setProspects((current) => [...((result?.prospects || []) as SponsorProspect[]), ...current]);
    setTargetForm(emptyTargetForm);
    setProspectStatus("idle");
  };

  const importTargets = async () => {
    const importedProspects = parseSponsorCsv(csvInput);
    if (!importedProspects.length) return;
    setProspectStatus("saving");
    setProspectError(null);

    const { data: result, error } = await supabase.functions.invoke("party-wreckers-advertiser-admin", {
      headers: accessHeaders(),
      body: {
        action: "bulk_create",
        prospects: importedProspects,
      },
    });

    if (error) {
      failProspects(error);
      return;
    }

    setProspects((current) => [...((result?.prospects || []) as SponsorProspect[]), ...current]);
    setCsvInput("");
    setProspectStatus("idle");
  };

  const deleteProspect = async (prospect: SponsorProspect) => {
    setProspectStatus("saving");
    setProspectError(null);
    const { error } = await supabase.functions.invoke("party-wreckers-advertiser-admin", {
      headers: accessHeaders(),
      body: {
        action: "delete",
        id: prospect.id,
      },
    });

    if (error) {
      failProspects(error);
      return;
    }

    setProspects((current) => current.filter((currentProspect) => currentProspect.id !== prospect.id));
    setProspectStatus("idle");
  };

  const exportProspects = () => {
    downloadCsv("party-wreckers-sponsor-prospects.csv", buildProspectCsv(prospects));
  };

  const downloadSponsorCsv = () => {
    if (!data) return;
    downloadCsv("party-wreckers-sponsor-report.csv", buildSponsorCsv(data));
  };

  const printSponsorReport = () => {
    if (!data || typeof window === "undefined") return;
    // Passing "noopener" makes window.open return null, so open normally and drop the opener after.
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.opener = null;

    printWindow.document.write(buildSponsorPrintHtml(data));
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const sponsorActionItems = getSponsorActionItems(prospects);
  const sponsorRevenue = getSponsorRevenueSummary(prospects);
  const sponsorInventory = getSponsorInventory(prospects, inventoryMonth);
  const weeklyActions = getWeeklySponsorActions(prospects);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Party Wreckers Funnel Report"
        description="Owner-only Party Wreckers funnel report."
        canonical="/funnel-report"
        noIndex
      />

      <Navbar />

      <main className="pt-24 pb-16">
        <section className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-sm uppercase tracking-widest text-muted-foreground">Owner report</span>
                </div>
                <h1 className="font-script text-4xl sm:text-5xl text-burgundy">Party Wreckers Funnel Report</h1>
                <p className="text-muted-foreground mt-2">Last 30 days of listener paths, sponsor intent, and revenue-intent clicks.</p>
              </div>

              {(session || (data && accessKey)) && (
                <div className="flex flex-col gap-2 sm:items-end">
                  {session && (
                    <p className="text-sm text-muted-foreground">
                      Signed in as <span className="font-medium text-foreground">{session.user.email}</span>
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button onClick={loadReport} disabled={status === "loading"}>
                      <RefreshCw className={`h-4 w-4 ${status === "loading" ? "animate-spin" : ""}`} />
                      Refresh report
                    </Button>
                    {session && (
                      <Button variant="outline" onClick={signOut}>
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {status === "error" && reportError && (
              <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive mb-6">
                {reportError}
              </div>
            )}

            {!session && !data && (
              <AdminSignInPanel
                authChecked={authChecked}
                email={email}
                onEmailChange={setEmail}
                signInState={signInState}
                signInMessage={signInMessage}
                onSubmit={sendSignInLink}
                onUseDifferentEmail={() => {
                  setSignInState("idle");
                  setSignInMessage(null);
                }}
                useAccessKey={useAccessKey}
                onToggleAccessKey={() => setUseAccessKey((current) => !current)}
                secret={secret}
                onSecretChange={setSecret}
                hasSavedKey={hasSavedKey}
                onForgetKey={forgetAccessKey}
                onLoadWithKey={loadReport}
                isLoading={status === "loading"}
              />
            )}

            <Card className="mb-6 border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  Weekly AEO and Revenue Rhythm
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Use this as the operating cadence: one indexing check, one internal-link pass, one listener-path check, one sponsor proof update, and one money-list session every week.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 lg:grid-cols-5">
                  {weeklyFunnelRhythm.map((item) => (
                    <div key={item.title} className="rounded-lg border border-border bg-background p-4">
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {data ? (
              <div className="space-y-6">
                {data.north_star && <NorthStarSection northStar={data.north_star} />}

                <ListenerQuestionsAdmin
                  accessHeaders={accessHeaders}
                  describeError={(error) =>
                    describeAccessError(error, { signedIn: Boolean(session), usingKey: Boolean(accessKey) })
                  }
                />

                <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-foreground">Sponsor report export</p>
                    <p className="text-sm text-muted-foreground">Create a monthly sponsor summary from the current 30-day report.</p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" asChild>
                      <a href="/sponsor-kit" target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4" />
                        Sponsor Kit
                      </a>
                    </Button>
                    <Button variant="outline" onClick={downloadSponsorCsv}>
                      <Download className="h-4 w-4" />
                      Export CSV
                    </Button>
                    <Button variant="outline" onClick={printSponsorReport}>
                      <Printer className="h-4 w-4" />
                      Print Summary
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-5">
                  {orderTotals(data.totals).map(([label, value]) => (
                    <Card key={label} className="border-border bg-card">
                      <CardContent className="p-5">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label.replace(/_/g, " ")}</p>
                        <p className="text-3xl font-semibold tabular-nums text-foreground mt-2">
                          {formatTotal(label, value)}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className={`grid gap-6 ${data.top_viewed_pages ? "md:grid-cols-2 xl:grid-cols-4" : "lg:grid-cols-3"}`}>
                  {data.top_viewed_pages && <ReportList title="Most Viewed Pages" items={data.top_viewed_pages} />}
                  <ReportList title="Events" items={data.by_event} />
                  <ReportList title="Top Pages" items={data.top_pages} />
                  <ReportList title="Top Destinations" items={data.top_destinations} />
                </div>

                <div className="grid gap-6 lg:grid-cols-4">
                  <ReportList title="Listener Lead Pages" items={data.listener_lead_pages || []} />
                  <ReportList title="Listener Destinations" items={data.listener_lead_destinations || []} />
                  <ReportList title="Advertiser Pages" items={data.advertiser_pages || []} />
                  <ReportList title="Package Interest" items={data.sponsor_package_interest || []} />
                </div>

                <div className="grid gap-6 lg:grid-cols-4">
                  <ReportList title="Sponsor Impressions" items={data.sponsor_impressions_by_sponsor || []} />
                  <ReportList title="Sponsor Clicks" items={data.sponsor_clicks_by_sponsor || []} />
                  <ReportList title="Sponsor Placements" items={data.sponsor_placements || []} />
                  <ReportList title="Sponsor Pages" items={data.sponsor_pages || []} />
                </div>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle>Sponsor Prospects</CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">Track advertiser inquiries, notes, status, and next actions.</p>
                      </div>
                      <Button variant="outline" onClick={loadProspects} disabled={prospectStatus === "loading" || !canAuthorize}>
                        <RefreshCw className={`h-4 w-4 ${prospectStatus === "loading" ? "animate-spin" : ""}`} />
                        Load Prospects
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {prospectStatus === "error" && prospectError && (
                      <div role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                        {prospectError}
                      </div>
                    )}

                    {prospects.length > 0 && (
                      <div className="mb-5 rounded-lg border border-primary/20 bg-primary/10 p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="font-semibold text-foreground">Next Sponsor Actions</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              The hottest sponsor work based on inquiry status and saved next actions.
                            </p>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="rounded-lg border border-border bg-background px-3 py-2">
                              <p className="text-xs uppercase tracking-widest text-muted-foreground">New</p>
                              <p className="text-xl font-semibold text-foreground">{countProspectsByStatus(prospects, "new")}</p>
                            </div>
                            <div className="rounded-lg border border-border bg-background px-3 py-2">
                              <p className="text-xs uppercase tracking-widest text-muted-foreground">Proposal</p>
                              <p className="text-xl font-semibold text-foreground">{countProspectsByStatus(prospects, "proposal_sent")}</p>
                            </div>
                            <div className="rounded-lg border border-border bg-background px-3 py-2">
                              <p className="text-xs uppercase tracking-widest text-muted-foreground">Close</p>
                              <p className="text-xl font-semibold text-foreground">{countProspectsByStatus(prospects, "negotiating")}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 md:grid-cols-3">
                          <RevenueMetricCard label="Open pipeline" value={sponsorRevenue.openPipeline} />
                          <RevenueMetricCard label="Proposal / close" value={sponsorRevenue.closingPipeline} />
                          <RevenueMetricCard label="Sold monthly" value={sponsorRevenue.soldMonthly} />
                        </div>

                        <div className="mt-4 rounded-lg border border-border bg-background p-4">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="flex items-center gap-2 font-semibold text-foreground">
                                <CalendarDays className="h-4 w-4 text-primary" />
                                Monthly Sponsor Inventory
                              </p>
                              <p className="mt-1 text-sm text-muted-foreground">Default monthly capacity: 4 episode slots, 3 site slots, 1 bundle slot.</p>
                            </div>
                            <Input
                              type="month"
                              value={inventoryMonth}
                              onChange={(event) => setInventoryMonth(event.target.value)}
                              className="w-full sm:w-44"
                            />
                          </div>

                          <div className="mt-4 grid gap-3 lg:grid-cols-3">
                            {sponsorInventory.map((slot) => (
                              <div key={slot.id} className="rounded-lg border border-border bg-card p-4">
                                <p className="font-semibold text-foreground">{slot.label}</p>
                                <div className="mt-3 grid grid-cols-4 gap-2 text-center text-sm">
                                  <InventoryCount label="Cap" value={slot.capacity} />
                                  <InventoryCount label="Reserved" value={slot.reserved} />
                                  <InventoryCount label="Sold" value={slot.sold} />
                                  <InventoryCount label="Available" value={slot.available} />
                                </div>
                                <p className={`mt-3 text-sm ${slot.available <= 0 ? "text-destructive" : "text-muted-foreground"}`}>
                                  {slot.available <= 0 ? slot.soldOutGuidance : slot.guidance}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 lg:grid-cols-3">
                          {sponsorActionItems.map((item) => (
                            <div key={item.id} className="rounded-lg border border-border bg-background p-3">
                              <p className="text-sm font-semibold text-foreground">{item.company}</p>
                              <p className="mt-1 text-xs uppercase tracking-widest text-primary">{item.statusLabel}</p>
                              <p className="mt-2 text-sm text-muted-foreground">{item.action}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {prospects.length > 0 && (
                      <div className="mb-5 rounded-lg border border-border bg-background p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="flex items-center gap-2 font-semibold text-foreground">
                              <ClipboardList className="h-4 w-4 text-primary" />
                              Weekly Sponsor Sales Action List
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">A simple weekly queue: contact 10, follow up with 5, close 2.</p>
                          </div>
                          <Button variant="outline" onClick={exportProspects}>
                            <Download className="h-4 w-4" />
                            Export Prospects
                          </Button>
                        </div>
                        <div className="mt-4 grid gap-4 lg:grid-cols-3">
                          <ActionList title="Contact These" items={weeklyActions.contact} />
                          <ActionList title="Follow Up" items={weeklyActions.followUp} />
                          <ActionList title="Close These" items={weeklyActions.close} />
                        </div>
                      </div>
                    )}

                    <div className="mb-5 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                      <Card className="border-border bg-background">
                        <CardHeader>
                          <CardTitle className="text-xl">Add Sponsor Target</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid gap-3 sm:grid-cols-2">
                            <Input
                              placeholder="Company"
                              value={targetForm.company}
                              onChange={(event) => setTargetForm({ ...targetForm, company: event.target.value })}
                            />
                            <Input
                              placeholder="Contact name"
                              value={targetForm.name}
                              onChange={(event) => setTargetForm({ ...targetForm, name: event.target.value })}
                            />
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <Input
                              type="email"
                              placeholder="Email"
                              value={targetForm.email}
                              onChange={(event) => setTargetForm({ ...targetForm, email: event.target.value })}
                            />
                            <Input
                              placeholder="Contact role"
                              value={targetForm.contactRole}
                              onChange={(event) => setTargetForm({ ...targetForm, contactRole: event.target.value })}
                            />
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <select
                              value={targetForm.sponsorCategory}
                              onChange={(event) => setTargetForm({ ...targetForm, sponsorCategory: event.target.value })}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                            >
                              {sponsorCategories.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                            <Input
                              placeholder="Website"
                              value={targetForm.website}
                              onChange={(event) => setTargetForm({ ...targetForm, website: event.target.value })}
                            />
                          </div>
                          <Textarea
                            placeholder="Why this sponsor is a fit"
                            value={targetForm.message}
                            onChange={(event) => setTargetForm({ ...targetForm, message: event.target.value })}
                            className="min-h-[90px]"
                          />
                          <Button onClick={createTarget} disabled={prospectStatus === "saving" || !canAuthorize || (!targetForm.company && !targetForm.email)}>
                            <Plus className="h-4 w-4" />
                            Add Target
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-border bg-background">
                        <CardHeader>
                          <CardTitle className="text-xl">CSV Import</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Paste rows with headers: company, name, email, category, role, website, notes.
                          </p>
                          <Textarea
                            placeholder="company,name,email,category,role,website,notes"
                            value={csvInput}
                            onChange={(event) => setCsvInput(event.target.value)}
                            className="min-h-[150px] font-mono text-xs"
                          />
                          <Button variant="outline" onClick={importTargets} disabled={prospectStatus === "saving" || !canAuthorize || !csvInput.trim()}>
                            <Upload className="h-4 w-4" />
                            Import Targets
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mb-5 rounded-lg border border-border bg-background p-4">
                      <p className="font-semibold text-foreground">Outreach Templates</p>
                      <p className="mt-1 text-sm text-muted-foreground">Use these from individual prospect cards to open a prewritten email.</p>
                      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                        {outreachTemplates.map((template) => (
                          <div key={template.id} className="rounded-lg border border-border bg-card p-3">
                            <p className="font-semibold text-foreground">{template.label}</p>
                            <p className="mt-2 text-xs text-muted-foreground">{template.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {prospects.length ? (
                        prospects.map((prospect) => (
                          <SponsorProspectCard
                            key={prospect.id}
                            prospect={prospect}
                            onChange={updateProspect}
                            onMetadataChange={updateProspectMetadata}
                            onSave={saveProspect}
                            onDelete={deleteProspect}
                            isSaving={prospectStatus === "saving"}
                          />
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Load prospects to edit sponsor status and notes.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-border bg-card">
                <CardContent className="p-8 text-center text-muted-foreground" aria-live="polite">
                  {status === "loading"
                    ? "Loading the report…"
                    : session
                      ? "The report isn't loaded yet. Use Refresh report to try again."
                      : "Sign in above to load Party Wreckers funnel data."}
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const AdminSignInPanel = ({
  authChecked,
  email,
  onEmailChange,
  signInState,
  signInMessage,
  onSubmit,
  onUseDifferentEmail,
  useAccessKey,
  onToggleAccessKey,
  secret,
  onSecretChange,
  hasSavedKey,
  onForgetKey,
  onLoadWithKey,
  isLoading,
}: {
  authChecked: boolean;
  email: string;
  onEmailChange: (value: string) => void;
  signInState: "idle" | "sending" | "sent";
  signInMessage: string | null;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUseDifferentEmail: () => void;
  useAccessKey: boolean;
  onToggleAccessKey: () => void;
  secret: string;
  onSecretChange: (value: string) => void;
  hasSavedKey: boolean;
  onForgetKey: () => void;
  onLoadWithKey: () => void;
  isLoading: boolean;
}) => (
  <Card className="mb-6 border-primary/30 bg-card">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Lock className="h-5 w-5 text-primary" />
        Admin sign-in
      </CardTitle>
      <p className="text-sm text-muted-foreground">
        We&apos;ll email you a one-time sign-in link. Only addresses on the admin list can open this report.
      </p>
    </CardHeader>
    <CardContent className="space-y-4">
      {!authChecked ? (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Checking whether you&apos;re already signed in…
        </p>
      ) : signInState === "sent" ? (
        <div className="rounded-lg border border-primary/20 bg-primary/10 p-4" role="status">
          <p className="flex items-center gap-2 font-semibold text-foreground">
            <MailCheck className="h-5 w-5 text-primary" />
            Check your email
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            We sent a sign-in link to <span className="font-medium text-foreground">{email.trim()}</span>. Open it on
            this device and you&apos;ll come straight back here, signed in.
          </p>
          <Button variant="link" className="mt-1 h-auto px-0" onClick={onUseDifferentEmail}>
            Use a different email
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex max-w-xl flex-col gap-2 sm:flex-row">
          <label htmlFor="admin-email" className="sr-only">
            Admin email
          </label>
          <Input
            id="admin-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            className="sm:flex-1"
          />
          <Button type="submit" disabled={signInState === "sending" || !email.trim()}>
            {signInState === "sending" ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
            Email me a sign-in link
          </Button>
        </form>
      )}

      {signInMessage && (
        <p role="alert" className="text-sm text-destructive">
          {signInMessage}
        </p>
      )}

      <div className="border-t border-border pt-3">
        <button
          type="button"
          onClick={onToggleAccessKey}
          aria-expanded={useAccessKey}
          aria-controls="access-key-form"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          <KeyRound className="h-3.5 w-3.5" />
          {useAccessKey ? "Hide access key" : "Use access key instead"}
        </button>

        {useAccessKey && (
          <form
            id="access-key-form"
            className="mt-3 flex max-w-xl flex-col gap-2 sm:flex-row sm:items-center"
            onSubmit={(event) => {
              event.preventDefault();
              onLoadWithKey();
            }}
          >
            <label htmlFor="report-access-key" className="sr-only">
              Access key
            </label>
            <Input
              id="report-access-key"
              type="password"
              autoComplete="off"
              placeholder="Access key"
              value={secret}
              onChange={(event) => onSecretChange(event.target.value)}
              className="sm:w-60"
            />
            <Button type="submit" variant="outline" disabled={isLoading || !secret.trim()}>
              {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              Load with key
            </Button>
            {hasSavedKey && (
              <Button type="button" variant="ghost" size="sm" onClick={onForgetKey}>
                Forget saved key
              </Button>
            )}
          </form>
        )}
      </div>
    </CardContent>
  </Card>
);

const NorthStarSection = ({ northStar }: { northStar: NorthStarData }) => {
  const weekly = Array.isArray(northStar.weekly) ? northStar.weekly : [];
  const sources = Array.isArray(northStar.by_source) ? northStar.by_source : [];
  const thisWeek = toCount(northStar.this_week);
  const lastWeek = toCount(northStar.last_week);
  const change = describeWeekChange(thisWeek, lastWeek);
  const maxWeekly = Math.max(1, ...weekly.map((week) => toCount(week.count)));
  const maxSource = Math.max(1, ...sources.map((source) => toCount(source.count)));
  const ChangeIcon = change.direction === "up" ? ArrowUpRight : change.direction === "down" ? ArrowDownRight : Minus;

  return (
    <section aria-labelledby="north-star-title">
      <Card className="border-primary/30 bg-card">
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">North star</p>
          <CardTitle id="north-star-title" className="flex items-center gap-2 text-2xl">
            <HeartHandshake className="h-6 w-6 text-primary" />
            Families asking for help
          </CardTitle>
          <p className="text-sm text-muted-foreground">Help requests sent through the site each week</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)_17rem]">
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">This week</p>
              <p className="mt-1 text-5xl font-semibold tabular-nums text-foreground">{formatCount(thisWeek)}</p>
              <p className={`mt-2 flex items-start gap-1 text-sm font-medium ${change.className}`}>
                <ChangeIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{change.text}</span>
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Last week: <span className="font-semibold tabular-nums text-foreground">{formatCount(lastWeek)}</span>
              </p>
              <p className="mt-3 text-xs text-muted-foreground">Weeks start Monday (Pacific time). This week is still in progress.</p>
            </div>

            <figure className="min-w-0">
              <figcaption className="text-sm font-semibold text-foreground">Last {weekly.length || 12} weeks</figcaption>
              {weekly.length ? (
                <ol className="mt-3 flex h-52 items-stretch gap-1 sm:gap-2" aria-label="Help requests per week, oldest to newest">
                  {weekly.map((week, index) => {
                    const count = toCount(week.count);
                    const isCurrent = index === weekly.length - 1;
                    const height = count > 0 ? Math.max((count / maxWeekly) * 100, 3) : 0;
                    // Below xl there isn't room for 12 dates, so label every other week, always including this week.
                    const isAlternateLabel = (weekly.length - 1 - index) % 2 === 1;
                    return (
                      <li key={week.week_start || index} className="flex min-w-0 flex-1 flex-col">
                        <span className="sr-only">
                          Week of {formatWeekStart(week.week_start, true)}: {count} help {count === 1 ? "request" : "requests"}
                          {isCurrent ? " (this week, in progress)" : ""}
                        </span>
                        <div className="flex flex-1 flex-col justify-end pt-5" aria-hidden="true">
                          <div
                            className={`relative w-full rounded-t ${isCurrent ? "bg-primary" : "bg-primary/45"}`}
                            style={{ height: `${height}%` }}
                          >
                            <span className="absolute inset-x-0 -top-5 text-center text-xs font-semibold tabular-nums text-foreground">
                              {formatCount(count)}
                            </span>
                          </div>
                        </div>
                        <span
                          aria-hidden="true"
                          className={`mt-1.5 flex justify-center whitespace-nowrap border-t border-border pt-1 text-[10px] sm:text-[11px] ${
                            isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          <span className={isAlternateLabel ? "invisible xl:visible" : ""}>{formatWeekStart(week.week_start)}</span>
                        </span>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">No weekly data yet.</p>
              )}
            </figure>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">Top sources</p>
              <p className="text-xs text-muted-foreground">Articles and pages, last 30 days</p>
              {sources.length ? (
                <ol className="mt-3 space-y-3">
                  {sources.map((source) => {
                    const count = toCount(source.count);
                    return (
                      <li key={source.name}>
                        <div className="flex items-baseline justify-between gap-3 text-sm">
                          <span className="truncate text-muted-foreground" title={source.name}>
                            {source.name}
                          </span>
                          <span className="font-semibold tabular-nums text-foreground">{formatCount(count)}</span>
                        </div>
                        <div className="mt-1 h-1.5 rounded-full bg-secondary" aria-hidden="true">
                          <div className="h-full rounded-full bg-primary/60" style={{ width: `${(count / maxSource) * 100}%` }} />
                        </div>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">No help requests in the last 30 days yet.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

const ReportList = ({ title, items }: { title: string; items: Array<{ name: string; count: number }> }) => (
  <Card className="border-border bg-card">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {items.length ? (
          items.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-4 border-b border-border pb-2 last:border-0">
              <span className="text-sm text-muted-foreground truncate">{item.name}</span>
              <span className="font-semibold text-foreground">{item.count}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No data yet.</p>
        )}
      </div>
    </CardContent>
  </Card>
);

const RevenueMetricCard = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-lg border border-border bg-background p-3">
    <div className="flex items-center gap-2">
      <DollarSign className="h-4 w-4 text-primary" />
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
    <p className="mt-2 text-2xl font-semibold text-foreground">{formatCurrency(value)}</p>
  </div>
);

const InventoryCount = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-md border border-border bg-background px-2 py-2">
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
    <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
  </div>
);

const ActionList = ({ title, items }: { title: string; items: Array<{ id: string; company: string; detail: string }> }) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <p className="font-semibold text-foreground">{title}</p>
    <div className="mt-3 space-y-3">
      {items.length ? (
        items.map((item) => (
          <div key={item.id} className="rounded-md border border-border bg-background p-3">
            <p className="text-sm font-semibold text-foreground">{item.company}</p>
            <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">No prospects in this bucket yet.</p>
      )}
    </div>
  </div>
);

const SponsorProspectCard = ({
  prospect,
  onChange,
  onMetadataChange,
  onSave,
  onDelete,
  isSaving,
}: {
  prospect: SponsorProspect;
  onChange: (id: string, updates: Partial<SponsorProspect>) => void;
  onMetadataChange: (id: string, metadataUpdates: Record<string, string>) => void;
  onSave: (prospect: SponsorProspect) => void;
  onDelete: (prospect: SponsorProspect) => void;
  isSaving: boolean;
}) => {
  const packageInterest = getMetadataString(prospect.metadata, "package_interest") || "Not provided";
  const inventoryInterest = getMetadataString(prospect.metadata, "inventory_interest") || "Not provided";
  const recommendation = getProspectRecommendation(prospect);
  const expectedValue = getMetadataString(prospect.metadata, "expected_monthly_value");
  const soldAmount = getMetadataString(prospect.metadata, "sold_amount");
  const slotType = getMetadataString(prospect.metadata, "sponsor_slot_type");
  const slotMonth = getMetadataString(prospect.metadata, "sponsor_slot_month") || getCurrentSponsorMonth();
  const slotStatus = getMetadataString(prospect.metadata, "sponsor_slot_status") || getEffectiveSlotStatus(prospect);
  const proposalHref = buildProposalEmailHref(prospect);

  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_0.7fr]">
        <div>
          <p className="font-semibold text-foreground">{prospect.company || prospect.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {prospect.name} · {prospect.email}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{prospect.message || "No message provided."}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border px-3 py-1">Package: {packageInterest}</span>
            <span className="rounded-full border border-border px-3 py-1">Inventory: {inventoryInterest}</span>
            <span className="rounded-full border border-border px-3 py-1">{new Date(prospect.created_at).toLocaleDateString()}</span>
          </div>
          <div className="mt-4 rounded-lg border border-primary/20 bg-primary/10 p-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Suggested next move</p>
            <p className="mt-1 text-sm text-foreground">{recommendation}</p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Expected monthly</p>
              <p className="mt-1 text-lg font-semibold text-foreground">{formatCurrency(parseMoney(expectedValue))}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Sold monthly</p>
              <p className="mt-1 text-lg font-semibold text-foreground">{formatCurrency(parseMoney(soldAmount))}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">Status</span>
            <select
              value={prospect.status}
              onChange={(event) => onChange(prospect.id, { status: event.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            >
              {prospectStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </label>
          <Input
            placeholder="Next action"
            value={getMetadataString(prospect.metadata, "next_action")}
            onChange={(event) => onMetadataChange(prospect.id, { next_action: event.target.value })}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              inputMode="decimal"
              placeholder="Expected monthly $"
              value={expectedValue}
              onChange={(event) => onMetadataChange(prospect.id, { expected_monthly_value: event.target.value })}
            />
            <Input
              inputMode="decimal"
              placeholder="Sold monthly $"
              value={soldAmount}
              onChange={(event) => onMetadataChange(prospect.id, { sold_amount: event.target.value })}
            />
          </div>
          <Textarea
            placeholder="Internal notes"
            value={getMetadataString(prospect.metadata, "sponsor_notes")}
            onChange={(event) => onMetadataChange(prospect.id, { sponsor_notes: event.target.value })}
            className="min-h-[96px]"
          />
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-primary" />
              Inventory Match
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <select
                value={slotType}
                onChange={(event) => onMetadataChange(prospect.id, { sponsor_slot_type: event.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
              >
                <option value="">No slot selected</option>
                {sponsorSlotTypes.map((slot) => (
                  <option key={slot.id} value={slot.id}>
                    {slot.label}
                  </option>
                ))}
              </select>
              <Input
                type="month"
                value={slotMonth}
                onChange={(event) => onMetadataChange(prospect.id, { sponsor_slot_month: event.target.value })}
              />
              <select
                value={slotStatus}
                onChange={(event) => onMetadataChange(prospect.id, { sponsor_slot_status: event.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground sm:col-span-2"
              >
                {sponsorSlotStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <CheckSquare className="h-4 w-4 text-primary" />
              Placement Checklist
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {sponsorChecklistItems.map(([key, label]) => {
                const isChecked = getMetadataString(prospect.metadata, key) === "true";
                return (
                  <label key={key} className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(event) => onMetadataChange(prospect.id, { [key]: event.target.checked ? "true" : "false" })}
                      className="h-4 w-4"
                    />
                    <span>{label}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <Button variant="outline" className="w-full" asChild>
            <a href={proposalHref}>
              <Mail className="h-4 w-4" />
              Email Proposal
            </a>
          </Button>
          <div className="grid gap-2">
            {outreachTemplates.map((template) => (
              <Button key={template.id} variant="outline" size="sm" asChild>
                <a href={buildTemplateEmailHref(prospect, template)}>
                  <Mail className="h-4 w-4" />
                  {template.label}
                </a>
              </Button>
            ))}
          </div>
          <Button className="w-full" onClick={() => onSave(prospect)} disabled={isSaving}>
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Prospect"}
          </Button>
          <Button variant="outline" className="w-full text-destructive hover:text-destructive" onClick={() => onDelete(prospect)} disabled={isSaving}>
            <Trash2 className="h-4 w-4" />
            Delete Prospect
          </Button>
        </div>
      </div>
    </div>
  );
};

const getMetadataString = (metadata: Record<string, unknown> | null, key: string) => {
  const value = metadata?.[key];
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  return typeof value === "string" ? value : "";
};

const buildProspectMetadataPatch = (prospect: SponsorProspect) => {
  const slotType = getMetadataString(prospect.metadata, "sponsor_slot_type");
  const slotMonth = getMetadataString(prospect.metadata, "sponsor_slot_month");
  const slotStatus = getMetadataString(prospect.metadata, "sponsor_slot_status");

  return {
    sponsor_notes: getMetadataString(prospect.metadata, "sponsor_notes"),
    next_action: getMetadataString(prospect.metadata, "next_action"),
    expected_monthly_value: getMetadataString(prospect.metadata, "expected_monthly_value"),
    sold_amount: getMetadataString(prospect.metadata, "sold_amount"),
    sponsor_slot_type: slotType,
    sponsor_slot_month: slotType ? slotMonth || getCurrentSponsorMonth() : slotMonth,
    sponsor_slot_status: slotType ? slotStatus || getEffectiveSlotStatus(prospect) : slotStatus,
    logo_received: getMetadataString(prospect.metadata, "logo_received"),
    link_received: getMetadataString(prospect.metadata, "link_received"),
    copy_approved: getMetadataString(prospect.metadata, "copy_approved"),
    placement_live: getMetadataString(prospect.metadata, "placement_live"),
    first_report_sent: getMetadataString(prospect.metadata, "first_report_sent"),
  };
};

const downloadCsv = (filename: string, csv: string) => {
  if (typeof window === "undefined") return;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

const buildSponsorCsv = (data: FunnelReportData) => {
  const rows: string[][] = [
    ["Section", "Name", "Count"],
    ["Total", "Sponsor impressions", String(data.totals.sponsor_impressions || 0)],
    ["Total", "Sponsor clicks", String(data.totals.sponsor_clicks || 0)],
    ["Total", "Sponsor click through rate", formatPercent(data.totals.sponsor_click_through_rate)],
  ];

  appendCsvSection(rows, "Sponsor impressions", data.sponsor_impressions_by_sponsor || []);
  appendCsvSection(rows, "Sponsor clicks", data.sponsor_clicks_by_sponsor || []);
  appendCsvSection(rows, "Sponsor placements", data.sponsor_placements || []);
  appendCsvSection(rows, "Sponsor pages", data.sponsor_pages || []);
  appendCsvSection(rows, "Package interest", data.sponsor_package_interest || []);

  return rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
};

const buildProspectCsv = (prospects: SponsorProspect[]) => {
  const rows = [
    ["Company", "Name", "Email", "Status", "Category", "Role", "Website", "Expected Monthly", "Sold Monthly", "Next Action", "Notes"],
    ...prospects.map((prospect) => [
      prospect.company || "",
      prospect.name,
      prospect.email,
      prospect.status,
      getMetadataString(prospect.metadata, "sponsor_category"),
      getMetadataString(prospect.metadata, "contact_role"),
      getMetadataString(prospect.metadata, "website"),
      getMetadataString(prospect.metadata, "expected_monthly_value"),
      getMetadataString(prospect.metadata, "sold_amount"),
      getMetadataString(prospect.metadata, "next_action"),
      getMetadataString(prospect.metadata, "sponsor_notes"),
    ]),
  ];

  return rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
};

const appendCsvSection = (rows: string[][], section: string, items: Array<{ name: string; count: number }>) => {
  items.forEach((item) => rows.push([section, item.name, String(item.count)]));
};

// Cells starting with = + - @ are run as formulas by spreadsheet apps; prospect names and
// notes can come from the public inquiry form, so neutralise them with a leading quote.
const escapeCsv = (value: string) => {
  const safeValue = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safeValue.replace(/"/g, '""')}"`;
};

const formatPercent = (rate: number | undefined) => `${((rate || 0) * 100).toFixed(1)}%`;

/** Plain-language message for a 401/403 from an admin function, or null for other errors. */
const describeAccessError = (error: unknown, context: { signedIn: boolean; usingKey: boolean }) => {
  const response = error instanceof FunctionsHttpError ? (error.context as Response | undefined) : undefined;
  const status = response?.status;
  if (status === 403) {
    return "This email isn't on the admin list. Sign out and use an admin email, or ask the site owner to add you.";
  }
  if (status === 401) {
    if (context.usingKey && !context.signedIn) return "That access key wasn't accepted. Check it, or sign in with your email instead.";
    if (context.signedIn) return "Your sign-in wasn't accepted. Sign out, then sign in again.";
    return "Sign in to view this report.";
  }
  return null;
};

const describeSignInError = (error: { status?: number; code?: string; message?: string }) => {
  if (error.status === 429 || error.code === "over_email_send_rate_limit") {
    return "Too many sign-in emails were requested. Wait a minute, then try again.";
  }
  // With shouldCreateUser off, an address with no account is refused ("Signups not allowed for otp").
  if (error.status === 400 || error.status === 422 || error.code === "otp_disabled") {
    return "We couldn't send a sign-in link to that address. Use the email on the admin list.";
  }
  return "We couldn't send the sign-in email. Check your connection and try again.";
};

/** If a magic link was expired or already used, Supabase redirects back with error params. */
const readAuthLinkError = () => {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const searchParams = new URLSearchParams(window.location.search);
  const hasError = ["error", "error_code", "error_description"].some((key) => params.has(key) || searchParams.has(key));
  if (!hasError) return null;
  window.history.replaceState(window.history.state, "", window.location.pathname);
  return "That sign-in link is invalid or has expired. Request a new one below.";
};

const leadingTotals = ["help_requests", "page_views", "events"];

/** Help requests, page views and total events first, then the rest in the order the report sends them. */
const orderTotals = (totals: Record<string, number>) => {
  const entries = Object.entries(totals || {});
  return [
    ...leadingTotals.flatMap((key) => entries.filter(([label]) => label === key)),
    ...entries.filter(([label]) => !leadingTotals.includes(label)),
  ];
};

const formatTotal = (label: string, value: unknown) => {
  if (label === "sponsor_click_through_rate") return formatPercent(Number(value));
  if (typeof value !== "number" || !Number.isFinite(value)) return "–";
  return value.toLocaleString("en-US");
};

const toCount = (value: unknown) => (typeof value === "number" && Number.isFinite(value) ? value : 0);

const formatCount = (value: number) => value.toLocaleString("en-US");

const describeWeekChange = (thisWeek: number, lastWeek: number) => {
  const diff = thisWeek - lastWeek;
  if (diff === 0) {
    return { direction: "flat" as const, text: "Same as last week", className: "text-muted-foreground" };
  }
  const amount = `${formatCount(Math.abs(diff))} ${Math.abs(diff) === 1 ? "request" : "requests"}`;
  const percent = lastWeek > 0 ? ` (${diff > 0 ? "+" : "−"}${Math.round((Math.abs(diff) / lastWeek) * 100)}%)` : "";
  return diff > 0
    ? { direction: "up" as const, text: `Up ${amount}${percent} vs last week`, className: "text-emerald-700" }
    : { direction: "down" as const, text: `Down ${amount}${percent} vs last week`, className: "text-destructive" };
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-10-05" -> "Oct 5" (or "Oct 5, 2026"). Parsed by hand so no time zone can shift the day. */
const formatWeekStart = (weekStart: string, withYear = false) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(weekStart || "");
  if (!match) return weekStart || "";
  const month = monthNames[Number(match[2]) - 1];
  if (!month) return weekStart;
  const label = `${month} ${Number(match[3])}`;
  return withYear ? `${label}, ${match[1]}` : label;
};

const buildSponsorPrintHtml = (data: FunnelReportData) => {
  const sponsorRows = [
    ["Sponsor Impressions", data.sponsor_impressions_by_sponsor || []],
    ["Sponsor Clicks", data.sponsor_clicks_by_sponsor || []],
    ["Sponsor Placements", data.sponsor_placements || []],
    ["Sponsor Pages", data.sponsor_pages || []],
  ];

  return `
    <!doctype html>
    <html>
      <head>
        <title>Party Wreckers Sponsor Report</title>
        <style>
          body { font-family: Arial, sans-serif; color: #211718; margin: 40px; }
          h1 { color: #7c2633; margin-bottom: 4px; }
          h2 { color: #7c2633; margin-top: 28px; }
          .metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 24px 0; }
          .metric, .section { border: 1px solid #ddd6d0; border-radius: 8px; padding: 14px; }
          .label { color: #746766; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
          .value { font-size: 28px; font-weight: 700; margin-top: 4px; }
          table { border-collapse: collapse; width: 100%; margin-top: 10px; }
          td { border-bottom: 1px solid #eee5df; padding: 8px 0; }
          td:last-child { text-align: right; font-weight: 700; }
        </style>
      </head>
      <body>
        <h1>Party Wreckers Sponsor Report</h1>
        <p>Last 30 days of sponsor activity.</p>
        <div class="metrics">
          <div class="metric"><div class="label">Impressions</div><div class="value">${data.totals.sponsor_impressions || 0}</div></div>
          <div class="metric"><div class="label">Clicks</div><div class="value">${data.totals.sponsor_clicks || 0}</div></div>
          <div class="metric"><div class="label">Click Rate</div><div class="value">${formatPercent(data.totals.sponsor_click_through_rate)}</div></div>
        </div>
        ${sponsorRows
          .map(
            ([title, items]) => `
              <div class="section">
                <h2>${title}</h2>
                <table>
                  ${(items as Array<{ name: string; count: number }>).length
                    ? (items as Array<{ name: string; count: number }>)
                        .map((item) => `<tr><td>${escapeHtml(item.name)}</td><td>${item.count}</td></tr>`)
                        .join("")
                    : "<tr><td>No data yet.</td><td></td></tr>"}
                </table>
              </div>
            `,
          )
          .join("")}
      </body>
    </html>
  `;
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const countProspectsByStatus = (prospects: SponsorProspect[], status: string) =>
  prospects.filter((prospect) => prospect.status === status).length;

const getProspectRecommendation = (prospect: SponsorProspect) => {
  const nextAction = getMetadataString(prospect.metadata, "next_action");
  if (nextAction) return nextAction;

  switch (prospect.status) {
    case "new":
      return "Reply today, confirm sponsor fit, and send the package page if the offer belongs on the show.";
    case "contacted":
      return "Ask which package they want to reserve, then move them toward a proposal.";
    case "proposal_sent":
      return "Follow up with a short close: placement, timing, link destination, and first report date.";
    case "negotiating":
      return "Resolve the open term and turn this into a paid placement.";
    case "sold":
      return "Confirm assets, sponsor link, placement date, and monthly reporting expectations.";
    case "lost":
      return "Leave a note on why it did not fit and whether it is worth revisiting later.";
    default:
      return "Set a specific next action so this prospect does not drift.";
  }
};

const getSponsorActionItems = (prospects: SponsorProspect[]) => {
  const priority = new Map([
    ["negotiating", 0],
    ["proposal_sent", 1],
    ["new", 2],
    ["contacted", 3],
    ["sold", 4],
    ["lost", 5],
  ]);

  return [...prospects]
    .sort((a, b) => {
      const statusScore = (priority.get(a.status) ?? 9) - (priority.get(b.status) ?? 9);
      if (statusScore !== 0) return statusScore;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    .slice(0, 3)
    .map((prospect) => ({
      id: prospect.id,
      company: prospect.company || prospect.name,
      statusLabel: prospect.status.replace(/_/g, " "),
      action: getProspectRecommendation(prospect),
    }));
};

const getWeeklySponsorActions = (prospects: SponsorProspect[]) => ({
  contact: prospects
    .filter((prospect) => prospect.status === "new")
    .slice(0, 10)
    .map((prospect) => ({
      id: prospect.id,
      company: prospect.company || prospect.name,
      detail: getMetadataString(prospect.metadata, "sponsor_category") || "Send first contact email.",
    })),
  followUp: prospects
    .filter((prospect) => ["contacted", "proposal_sent"].includes(prospect.status))
    .slice(0, 5)
    .map((prospect) => ({
      id: prospect.id,
      company: prospect.company || prospect.name,
      detail: getMetadataString(prospect.metadata, "next_action") || "Follow up and move toward package selection.",
    })),
  close: prospects
    .filter((prospect) => prospect.status === "negotiating")
    .slice(0, 2)
    .map((prospect) => ({
      id: prospect.id,
      company: prospect.company || prospect.name,
      detail: getMetadataString(prospect.metadata, "next_action") || "Confirm slot, price, sponsor assets, and close date.",
    })),
});

const parseSponsorCsv = (csv: string) => {
  const rows = parseCsvRows(csv);

  if (rows.length < 2) return [];

  const headers = rows[0].map((header) => header.toLowerCase().trim());
  return rows.slice(1).map((row) => {
    const get = (name: string) => row[headers.indexOf(name)] || "";
    const sponsorCategory = get("category") || get("sponsor_category") || sponsorCategories[0];
    const message = get("notes") || get("message") || `CSV sponsor target: ${sponsorCategory}`;

    return {
      company: get("company"),
      name: get("name") || get("contact"),
      email: get("email"),
      sponsor_category: sponsorCategory,
      contact_role: get("role") || get("contact_role"),
      website: get("website"),
      message,
      target_source: "csv_import",
      metadata: {
        sponsor_category: sponsorCategory,
        contact_role: get("role") || get("contact_role"),
        website: get("website"),
      },
    };
  });
};

// Quote-aware CSV parser over the whole text, so a quoted cell can contain commas and line breaks.
const parseCsvRows = (csv: string) => {
  const rows: string[][] = [];
  let row: string[] = [];
  let currentValue = "";
  let isQuoted = false;

  const endRow = () => {
    row.push(currentValue.trim());
    if (row.some((value) => value !== "")) rows.push(row);
    row = [];
    currentValue = "";
  };

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];
    const nextCharacter = csv[index + 1];

    if (isQuoted) {
      if (character === "\"" && nextCharacter === "\"") {
        currentValue += "\"";
        index += 1;
      } else if (character === "\"") {
        isQuoted = false;
      } else {
        currentValue += character;
      }
    } else if (character === "\"") {
      isQuoted = true;
    } else if (character === ",") {
      row.push(currentValue.trim());
      currentValue = "";
    } else if (character === "\n" || character === "\r") {
      if (character === "\r" && nextCharacter === "\n") index += 1;
      endRow();
    } else {
      currentValue += character;
    }
  }

  endRow();
  return rows;
};

const parseMoney = (value: string) => {
  const cleanedValue = value.replace(/[^0-9.]/g, "");
  const parsedValue = Number.parseFloat(cleanedValue);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const getSponsorRevenueSummary = (prospects: SponsorProspect[]) =>
  prospects.reduce(
    (summary, prospect) => {
      const expectedMonthly = parseMoney(getMetadataString(prospect.metadata, "expected_monthly_value"));
      const soldMonthly = parseMoney(getMetadataString(prospect.metadata, "sold_amount")) || expectedMonthly;

      if (!["sold", "lost"].includes(prospect.status)) {
        summary.openPipeline += expectedMonthly;
      }

      if (["proposal_sent", "negotiating"].includes(prospect.status)) {
        summary.closingPipeline += expectedMonthly;
      }

      if (prospect.status === "sold") {
        summary.soldMonthly += soldMonthly;
      }

      return summary;
    },
    { openPipeline: 0, closingPipeline: 0, soldMonthly: 0 },
  );

const getCurrentSponsorMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

// The slot status used everywhere (inventory counts, the prospect card, and saves).
// Lost prospects never hold a slot; "sold" on either field wins; with no explicit slot
// status, an active proposal or negotiation holds the slot as reserved.
const getEffectiveSlotStatus = (prospect: SponsorProspect): "available" | "reserved" | "sold" => {
  if (prospect.status === "lost") return "available";
  const slotStatus = getMetadataString(prospect.metadata, "sponsor_slot_status");
  if (slotStatus === "sold" || prospect.status === "sold") return "sold";
  if (slotStatus === "reserved") return "reserved";
  if (!slotStatus && ["proposal_sent", "negotiating"].includes(prospect.status)) return "reserved";
  return "available";
};

const getSponsorInventory = (prospects: SponsorProspect[], month: string) =>
  sponsorSlotTypes.map((slot) => {
    const matchedProspects = prospects.filter((prospect) => {
      const prospectSlot = getMetadataString(prospect.metadata, "sponsor_slot_type");
      const prospectMonth = getMetadataString(prospect.metadata, "sponsor_slot_month");
      return prospectSlot === slot.id && prospectMonth === month;
    });

    // One effective status per prospect, so nobody is counted as both sold and reserved.
    const statuses = matchedProspects.map(getEffectiveSlotStatus);
    const sold = statuses.filter((status) => status === "sold").length;
    const reserved = statuses.filter((status) => status === "reserved").length;

    const available = Math.max(slot.capacity - sold - reserved, 0);

    return {
      ...slot,
      sold,
      reserved,
      available,
    };
  });

const buildProposalEmailHref = (prospect: SponsorProspect) => {
  const companyName = prospect.company || "your organization";
  const packageInterest = getMetadataString(prospect.metadata, "package_interest");
  const expectedValue = getMetadataString(prospect.metadata, "expected_monthly_value");
  const subject = "Party Wreckers sponsor package";
  const body = [
    `Hi ${prospect.name},`,
    "",
    `Thanks for reaching out about sponsoring Party Wreckers. Based on ${companyName}${packageInterest ? ` and your interest in ${packageInterest}` : ""}, I think the sponsor package page is the best next place to start:`,
    "",
    "https://partywreckers.com/advertise/packages",
    "",
    "The page lays out the Episode Sponsor, Monthly Site Sponsor, and Bundle Sponsor options, along with how monthly reporting works.",
    ...(expectedValue
      ? ["", `I also marked your expected monthly range around ${expectedValue}, so we can shape the placement around the right level of visibility.`]
      : []),
    "",
    "If it looks like a fit, reply with the package that feels closest and I can send over available inventory and next steps.",
    "",
    "Matt",
  ].join("\n");

  return `mailto:${encodeURIComponent(prospect.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const buildTemplateEmailHref = (prospect: SponsorProspect, template: (typeof outreachTemplates)[number]) => {
  const body = [
    `Hi ${prospect.name},`,
    "",
    template.body,
    "",
    "Matt",
  ].join("\n");

  return `mailto:${encodeURIComponent(prospect.email)}?subject=${encodeURIComponent(template.subject)}&body=${encodeURIComponent(body)}`;
};

export default FunnelReport;
