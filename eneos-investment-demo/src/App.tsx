import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity, ArrowDownLeft, ArrowLeftRight, ArrowRight, ArrowUpRight, Bell, BookOpen,
  Check, CheckCircle2, ChevronRight, CircleHelp, ClipboardCheck, Copy, CreditCard,
  Download, Fuel, Gift, Globe2, Handshake, Home, Leaf, LogOut, Menu, MoreHorizontal,
  Package, Settings, ShieldCheck, Sparkles, Sprout, Target, TrendingUp, Users,
  Wallet, Waves, Zap, UserRound, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Page = "Home" | "VIP" | "Tasks" | "Team" | "Me";
type ModalKind = "deposit" | "withdraw" | "tier" | "task" | null;

const navItems: { label: Page; icon: typeof Home }[] = [
  { label: "Home", icon: Home }, { label: "VIP", icon: Package },
  { label: "Tasks", icon: ClipboardCheck }, { label: "Team", icon: Users },
  { label: "Me", icon: UserRound },
];

const tiers = [
  { id: "01", name: "Energy Explorer", amount: "100", desc: "An introductory demo tier for exploring the platform.", features: ["Portfolio overview", "Learning resources", "Activity dashboard"], tag: "Starter" },
  { id: "02", name: "Energy Plus", amount: "500", desc: "Expanded access to the demo portfolio experience.", features: ["Everything in Explorer", "Expanded portfolio view", "Priority demo support"], tag: "Popular" },
  { id: "03", name: "Energy Advance", amount: "1,000", desc: "A broader set of illustrative portfolio tools.", features: ["Advanced dashboard", "Portfolio watchlist", "Detailed activity view"], tag: "Advanced" },
  { id: "04", name: "Energy Premier", amount: "5,000", desc: "A premium tier concept for this product prototype.", features: ["Premium interface", "Extended reporting", "Dedicated demo assistance"], tag: "Premium" },
  { id: "05", name: "Energy Signature", amount: "10,000", desc: "The highest illustrative tier in this demo build.", features: ["Full demo experience", "Enhanced reporting", "Priority assistance"], tag: "Signature" },
];

const activities = [
  { title: "Explore the energy portfolio", desc: "Review the featured energy themes", reward: "Completed", icon: BookOpen, status: "Complete" },
  { title: "Read the platform overview", desc: "Learn how this demo experience is structured", reward: "In progress", icon: Target, status: "In progress" },
  { title: "Review account security", desc: "Explore account and security settings", reward: "Available", icon: ShieldCheck, status: "Available" },
];

const transactions = [
  { id: "TX-20481", title: "Demo account funding", date: "17 Nov 2026", amount: "+$500.00", type: "Credit", status: "Demo" },
  { id: "TX-20466", title: "Portfolio tier preview", date: "15 Nov 2026", amount: "—", type: "Activity", status: "Viewed" },
  { id: "TX-20421", title: "Demo withdrawal request", date: "12 Nov 2026", amount: "—", type: "Debit", status: "Simulated" },
];

function Logo() {
  return <div className="brand"><div className="brand-mark">E</div><div><div className="brand-name">ENEOS</div><span className="brand-sub">PORTFOLIO DEMO</span></div></div>;
}

function PageHeading({ eyebrow, title, desc, action }: { eyebrow: string; title: string; desc: string; action?: ReactNode }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></div>{action}</div>;
}

function Metric({ label, value, foot, icon: Icon }: { label: string; value: string; foot: string; icon: typeof Wallet }) {
  return <Card className="metric"><div className="metric-top"><span>{label}</span><span className="metric-icon"><Icon size={16}/></span></div><div className="metric-value">{value}</div><div className="metric-foot">{foot}</div></Card>;
}

function App() {
  const [page, setPage] = useState<Page>("Home");
  const [modal, setModal] = useState<ModalKind>(null);
  const [selectedTier, setSelectedTier] = useState(tiers[1]);
  const [selectedTask, setSelectedTask] = useState(activities[1]);
  const [taskTab, setTaskTab] = useState("In progress");
  const [toast, setToast] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("demo.user@example.com");
  const [copied, setCopied] = useState(false);
  const [doneTasks, setDoneTasks] = useState<string[]>(["Explore the energy portfolio"]);
  const [noticeOpen, setNoticeOpen] = useState(true);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const copyReferral = async () => {
    try { await navigator.clipboard.writeText("ENEOS-DEMO-8K4P2"); } catch { /* clipboard may be unavailable in preview */ }
    setCopied(true); notify("Demo referral code copied");
    window.setTimeout(() => setCopied(false), 1800);
  };

  const openTier = (tier: typeof tiers[number]) => { setSelectedTier(tier); setModal("tier"); };
  const openTask = (task: typeof activities[number]) => { setSelectedTask(task); setModal("task"); };

  const finishTask = (title: string) => {
    setDoneTasks((old) => old.includes(title) ? old : [...old, title]);
    setModal(null); notify("Demo activity marked as complete");
  };

  const pageTitle = useMemo(() => ({
    Home: "Home", VIP: "Portfolio tiers", Tasks: "Activities", Team: "Community",
    Me: "My account"
  } as Record<Page, string>)[page], [page]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Logo />
        <div className="nav-label">WORKSPACE</div>
        <nav className="nav-list">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${page === label ? "active" : ""}`} onClick={() => setPage(label)}>
              <Icon size={18}/><span>{label === "VIP" ? "Portfolio tiers" : label === "Me" ? "My account" : label}</span>
              {page === label && <span style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: 9, background: "currentColor" }}/>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="demo-side-card">
            <Badge variant="warning">DEMO ENVIRONMENT</Badge>
            <strong>Explore the experience</strong>
            <p>This prototype uses sample data. No real funds or investments are processed.</p>
          </div>
          <div className="sidebar-user"><div className="avatar">DU</div><div className="user-meta"><strong>Demo User</strong><span>Preview account</span></div><MoreHorizontal size={17} color="#9aa0aa"/></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="mobile-brand"><div className="brand-mark">E</div>ENEOS</div>
          <div className="breadcrumb">Workspace <span style={{ margin: "0 8px" }}>/</span> <strong>{pageTitle}</strong></div>
          <div className="top-actions">
            <Badge variant="outline" className="hidden sm:inline-flex">DEMO PREVIEW</Badge>
            <button className="icon-button" aria-label="Notifications" onClick={() => notify("You're all caught up")}><Bell size={17}/><span className="notification-dot"/></button>
            <button className="icon-button" aria-label="Help" onClick={() => notify("Help centre is part of the demo concept")}><CircleHelp size={17}/></button>
            <div className="avatar" style={{ width: 35, height: 35 }}>DU</div>
          </div>
        </header>

        <div className="content">
          {page === "Home" && <HomePage setPage={setPage} setModal={setModal} noticeOpen={noticeOpen} setNoticeOpen={setNoticeOpen}/>}
          {page === "VIP" && <VipPage openTier={openTier}/>}
          {page === "Tasks" && <TasksPage taskTab={taskTab} setTaskTab={setTaskTab} doneTasks={doneTasks} openTask={openTask}/>}
          {page === "Team" && <TeamPage copyReferral={copyReferral} copied={copied} notify={notify}/>}
          {page === "Me" && <MePage setModal={setModal} notify={notify} email={email} setEmail={setEmail}/>}
          <div className="disclaimer" style={{ marginTop: 24 }}>
            <strong>Demo concept notice:</strong> This is an independently developed, non-operational prototype for demonstration purposes only. It is not an official ENEOS service, does not represent an ENEOS investment product, and is not an offer, solicitation or recommendation to invest. All balances, tiers, activity and transaction data are illustrative.
          </div>
        </div>
      </main>

      <nav className="mobile-nav">
        {navItems.map(({ label, icon: Icon }) => <button key={label} className={page === label ? "active" : ""} onClick={() => setPage(label)}><Icon/><span>{label === "VIP" ? "VIP" : label}</span></button>)}
      </nav>

      <Dialog open={modal !== null} onOpenChange={(open) => !open && setModal(null)}>
        <DialogContent>
          {modal === "deposit" && <><DialogHeader><DialogTitle>Add demo funds</DialogTitle><DialogDescription>Preview the funding flow using sample values. No payment will be taken.</DialogDescription></DialogHeader>
            <label className="form-label">Amount (USD)</label><input className="form-input" type="number" min="1" placeholder="Enter an amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
            <div className="form-hint">This action is simulated. Do not enter card or bank details.</div>
            <Button className="w-full mt-5" onClick={() => { if (!amount || Number(amount) <= 0) { notify("Enter a valid demo amount"); return; } setModal(null); setAmount(""); notify("Demo funding flow completed — no funds moved"); }}>Continue demo</Button>
          </>}
          {modal === "withdraw" && <><DialogHeader><DialogTitle>Withdrawal preview</DialogTitle><DialogDescription>Explore the withdrawal request interface. This demo does not transfer money.</DialogDescription></DialogHeader>
            <label className="form-label">Amount (USD)</label><input className="form-input" type="number" min="1" placeholder="Enter an amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
            <label className="form-label">Destination (demo only)</label><input className="form-input" placeholder="No bank details required" disabled/>
            <div className="form-hint">No personal banking information is collected in this prototype.</div>
            <Button className="w-full mt-5" onClick={() => { if (!amount || Number(amount) <= 0) { notify("Enter a valid demo amount"); return; } setModal(null); setAmount(""); notify("Withdrawal request simulated — no funds moved"); }}>Preview request</Button>
          </>}
          {modal === "tier" && <><DialogHeader><Badge variant="secondary" className="w-fit">DEMO TIER {selectedTier.id}</Badge><DialogTitle className="mt-3">{selectedTier.name}</DialogTitle><DialogDescription>{selectedTier.desc}</DialogDescription></DialogHeader>
            <div className="rounded-xl bg-muted p-4"><div className="text-xs text-muted-foreground">Illustrative access amount</div><div className="text-2xl font-bold mt-1">${selectedTier.amount} <span className="text-xs font-normal text-muted-foreground">USD · sample only</span></div></div>
            <div className="font-semibold text-sm mt-5 mb-3">Included demo features</div>
            {selectedTier.features.map(f => <div key={f} className="flex items-center gap-2 text-xs py-2"><CheckCircle2 size={15} className="text-emerald-600"/>{f}</div>)}
            <div className="form-hint mt-3">This tier is a UI placeholder. It does not represent an actual ENEOS product, investment minimum or entitlement.</div>
            <Button className="w-full mt-5" onClick={() => { setModal(null); notify("Tier preview selected — no purchase made"); }}>Preview this tier</Button>
          </>}
          {modal === "task" && <><DialogHeader><Badge variant="secondary" className="w-fit">PLATFORM ACTIVITY</Badge><DialogTitle className="mt-3">{selectedTask.title}</DialogTitle><DialogDescription>{selectedTask.desc}</DialogDescription></DialogHeader>
            <div className="notice"><Sparkles size={16}/><div><strong>Demo activity</strong>Complete this sample activity to explore the task interaction. No financial reward is issued.</div></div>
            <Button className="w-full mt-5" onClick={() => finishTask(selectedTask.title)}><Check size={16}/> Mark as complete</Button>
          </>}
        </DialogContent>
      </Dialog>

      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

function HomePage({ setPage, setModal, noticeOpen, setNoticeOpen }: any) {
  return <>
    <PageHeading eyebrow="ENERGY IN MOTION" title="Welcome to your portfolio overview" desc="Explore the platform experience and discover the energy themes behind this demo." action={<Badge variant="warning">Sample account</Badge>}/>
    <section className="hero">
      <div className="hero-content">
        <div className="hero-kicker"><Zap size={13}/> A new energy perspective</div>
        <h2>Powering progress.<br/>Exploring what's next.</h2>
        <p>Discover an interactive portfolio experience inspired by Japan's evolving energy landscape — from established energy systems to emerging technologies.</p>
        <button className="button-light" onClick={() => setPage("VIP")}>Explore portfolio tiers <ArrowRight size={15}/></button>
        <span className="hero-note">Independent demo concept</span>
      </div>
    </section>

    <div className="grid grid-4 metrics-grid" style={{ marginTop: 18 }}>
      <Metric label="Demo account balance" value="$12,480.50" foot="Illustrative balance only" icon={Wallet}/>
      <Metric label="Sample activity" value="08" foot="Across this demo account" icon={Activity}/>
      <Metric label="Portfolio tier" value="Plus" foot="Preview selection" icon={Package}/>
      <Metric label="Community" value="12" foot="Sample member count" icon={Users}/>
    </div>

    <div className="section-row"><div><h2>Explore energy themes</h2><p>Learn about the sectors represented in this concept.</p></div><button className="text-button" onClick={() => setPage("VIP")}>View portfolio <ArrowRight size={14}/></button></div>
    <div className="grid grid-3">
      <Card className="theme-card"><span className="theme-number">01</span><div className="theme-icon"><Fuel size={19}/></div><h3>Integrated energy</h3><p>Explore the role of established energy infrastructure and supply chains.</p></Card>
      <Card className="theme-card"><span className="theme-number">02</span><div className="theme-icon"><Waves size={19}/></div><h3>Advanced materials</h3><p>Discover materials and technologies that support modern industry.</p></Card>
      <Card className="theme-card"><span className="theme-number">03</span><div className="theme-icon"><Leaf size={19}/></div><h3>Energy transition</h3><p>Learn about renewable energy and lower-carbon technology pathways.</p></Card>
    </div>

    <div className="grid grid-2" style={{ marginTop: 20 }}>
      <Card className="panel-pad">
        <div className="flex items-center justify-between gap-3"><div className="panel-title">Platform announcement</div><Badge variant="secondary">Latest update</Badge></div>
        <div style={{ fontWeight: 700, fontSize: 13, marginTop: 16 }}>Welcome to the ENEOS portfolio demo</div>
        <p className="text-sm text-muted-foreground" style={{ lineHeight: 1.65, marginTop: 7 }}>Explore a sample digital experience for learning about energy-sector themes, reviewing illustrative access tiers and navigating a demo account.</p>
        <div className="text-xs text-muted-foreground mt-3">17 November 2026 · Product preview</div>
      </Card>
      <Card className="panel-pad">
        <div className="panel-title">About this experience</div>
        <div className="panel-subtitle">An energy-sector concept, presented as a digital platform.</div>
        <div className="flex gap-3 mt-4">
          <div className="theme-icon" style={{ flex: "0 0 auto" }}><Globe2 size={19}/></div>
          <p className="text-xs text-muted-foreground" style={{ lineHeight: 1.7, margin: 0 }}>This interface explores themes associated with the energy industry, including established energy systems, materials innovation and the energy transition. It is an independent design prototype and does not represent ENEOS corporate statements or an official service.</p>
        </div>
      </Card>
    </div>

    <div className="section-row"><div><h2>Task hall</h2><p>Quick access to the guided activities in this demo.</p></div><button className="text-button" onClick={() => setPage("Tasks")}>View all activities <ArrowRight size={14}/></button></div>
    <div className="grid grid-3">
      <Card className="theme-card"><div className="theme-icon"><BookOpen size={18}/></div><h3>Platform introduction</h3><p>Understand the layout and key areas of the demo.</p><button className="text-button" style={{ marginTop: 12 }} onClick={() => setPage("Tasks")}>Explore activity <ArrowRight size={13}/></button></Card>
      <Card className="theme-card"><div className="theme-icon"><ShieldCheck size={18}/></div><h3>Account security</h3><p>Review the sample account and security experience.</p><button className="text-button" style={{ marginTop: 12 }} onClick={() => setPage("Tasks")}>Explore activity <ArrowRight size={13}/></button></Card>
      <Card className="theme-card"><div className="theme-icon"><Handshake size={18}/></div><h3>Community overview</h3><p>See how referral and community information is presented.</p><button className="text-button" style={{ marginTop: 12 }} onClick={() => setPage("Team")}>Explore community <ArrowRight size={13}/></button></Card>
    </div>

    {noticeOpen && <div className="notice" style={{ marginTop: 20, justifyContent: "space-between" }}><div style={{ display: "flex", gap: 10 }}><ShieldCheck size={17} style={{ flex: "0 0 auto", marginTop: 1 }}/><div><strong>About this demo</strong>This is a design prototype, not an ENEOS-operated investment service. Account figures and tier details are sample UI content.</div></div><button onClick={() => setNoticeOpen(false)} aria-label="Dismiss notice" style={{ border: 0, background: "transparent", color: "inherit" }}><X size={15}/></button></div>}

    <div className="section-row"><div><h2>Recent account activity</h2><p>A snapshot of sample activity in this prototype.</p></div><button className="text-button" onClick={() => setPage("Me")}>View records <ArrowRight size={14}/></button></div>
    <Card className="panel"><div className="table-wrap"><table><thead><tr><th>ACTIVITY</th><th>REFERENCE</th><th>DATE</th><th>TYPE</th><th>STATUS</th></tr></thead><tbody>{transactions.map(t => <tr key={t.id}><td style={{ fontWeight: 700 }}>{t.title}</td><td>{t.id}</td><td>{t.date}</td><td>{t.type}</td><td><Badge variant="secondary">{t.status}</Badge></td></tr>)}</tbody></table></div></Card>
  </>;
}

function VipPage({ openTier }: { openTier: (tier: typeof tiers[number]) => void }) {
  return <>
    <PageHeading eyebrow="PORTFOLIO ACCESS" title="Explore portfolio tiers" desc="Compare the illustrative access levels available in this product demo."/>
    <div className="notice"><ShieldCheck size={16}/><div><strong>Illustrative demo tiers</strong>Amounts and features below are placeholders for interface testing. They are not real ENEOS investment plans, minimum deposits or financial offers.</div></div>
    <div className="grid grid-3" style={{ marginTop: 18 }}>
      {tiers.map((tier, i) => <Card className="tier-card" key={tier.id}>
        <div className="tier-top"><div className="tier-symbol"><Fuel size={19}/></div><Badge variant={i === 1 ? "default" : "secondary"}>{tier.tag}</Badge></div>
        <h3>{tier.name}</h3><p>{tier.desc}</p>
        <div className="tier-price">${Number(tier.amount).toLocaleString("en-US")} <small>USD · sample</small></div>
        {tier.features.map(f => <div className="tier-feature" key={f}><Check size={13}/>{f}</div>)}
        <Button className="btn-full" variant={i === 1 ? "default" : "outline"} onClick={() => openTier(tier)}>View tier details <ArrowRight size={14}/></Button>
      </Card>)}
    </div>
    <div className="section-row"><div><h2>How to explore</h2><p>Three simple steps through the demo flow.</p></div></div>
    <div className="grid grid-3">
      {["Choose a tier to preview","Review the sample features","Return to your account overview"].map((t,i) => <Card className="panel-pad" key={t}><div className="eyebrow">STEP 0{i+1}</div><div style={{ fontWeight: 700, marginTop: 9 }}>{t}</div><div className="panel-subtitle">No registration, payment or investment is required.</div></Card>)}
    </div>
  </>;
}

function TasksPage({ taskTab, setTaskTab, doneTasks, openTask }: any) {
  const filtered = activities.filter(a => taskTab === "All" || (taskTab === "Completed" ? doneTasks.includes(a.title) : !doneTasks.includes(a.title)));
  return <>
    <PageHeading eyebrow="YOUR ACTIVITY" title="Tasks & activities" desc="Follow guided activities to explore the platform's features."/>
    <div className="grid grid-3 metrics-grid">
      <Metric label="Completed" value={String(doneTasks.length)} foot="Sample activities" icon={CheckCircle2}/>
      <Metric label="All activities" value={String(activities.length)} foot="Available in this demo" icon={ClipboardCheck}/>
      <Metric label="In progress" value={String(activities.length - doneTasks.length)} foot="Awaiting completion" icon={Activity}/>
    </div>
    <Card className="panel-pad" style={{ marginTop: 18 }}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4"><div><div className="panel-title">Your activity list</div><div className="panel-subtitle">Select an activity to see its details.</div></div><div className="tab-row">{["In progress","Completed","All"].map(t => <button key={t} className={`tab-btn ${taskTab === t ? "active" : ""}`} onClick={() => setTaskTab(t)}>{t}</button>)}</div></div>
      {filtered.length === 0 && <div className="text-center text-sm text-muted-foreground py-10">No activities in this view yet.</div>}
      {filtered.map(task => {
        const Icon = task.icon; const complete = doneTasks.includes(task.title);
        return <div className="task-row" key={task.title}><div className="task-icon"><Icon size={19}/></div><div className="task-copy"><strong>{task.title}</strong><span>{task.desc}</span></div><div className="task-reward">{complete ? <Badge variant="success">Completed</Badge> : <Badge variant="secondary">{task.status}</Badge>}<small>No monetary reward</small></div><Button size="sm" variant="outline" onClick={() => openTask(task)}>{complete ? "Review" : "Open"}</Button></div>;
      })}
    </Card>
  </>;
}

function TeamPage({ copyReferral, copied, notify }: any) {
  return <>
    <PageHeading eyebrow="COMMUNITY" title="Grow your network" desc="Explore the referral and community dashboard using sample member data."/>
    <div className="grid grid-2">
      <Card className="panel-pad">
        <div className="panel-title">Your demo invitation code</div><div className="panel-subtitle">Share this sample code to preview the referral experience.</div>
        <div className="referral-box" style={{ marginTop: 17 }}><div className="referral-code">ENEOS-DEMO-8K4P2</div><Button size="sm" onClick={copyReferral}>{copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? "Copied" : "Copy code"}</Button></div>
        <div className="form-hint">Referral links and registrations are not connected to a live programme.</div>
        <div className="flex gap-2 mt-4 flex-wrap"><Button variant="outline" size="sm" onClick={() => notify("Demo share link copied")}><Copy size={14}/> Copy demo link</Button><Button variant="outline" size="sm" onClick={() => notify("Social sharing is disabled in this demo")}><ArrowUpRight size={14}/> Share</Button></div>
      </Card>
      <Card className="panel-pad">
        <div className="panel-title">Community overview</div><div className="panel-subtitle">Sample figures for layout demonstration.</div>
        <div className="grid grid-2" style={{ marginTop: 20, gap: 12 }}>
          <div><div className="text-xs text-muted-foreground">Community members</div><div className="text-2xl font-bold mt-1">12</div></div>
          <div><div className="text-xs text-muted-foreground">New registrations</div><div className="text-2xl font-bold mt-1">04</div></div>
          <div><div className="text-xs text-muted-foreground">First transactions</div><div className="text-2xl font-bold mt-1">03</div></div>
          <div><div className="text-xs text-muted-foreground">Community activity</div><div className="text-2xl font-bold mt-1">08</div></div>
        </div>
      </Card>
    </div>
    <div className="section-row"><div><h2>Community levels</h2><p>Illustrative referral hierarchy — no commissions or payouts are configured.</p></div></div>
    <div className="grid grid-3">
      {[{n:"Level 1",members:"04",active:"03",desc:"Direct invitations"},{n:"Level 2",members:"05",active:"03",desc:"Second-level network"},{n:"Level 3",members:"03",active:"02",desc:"Extended network"}].map(l => <Card className="level-card" key={l.n}><div className="level-head"><span>{l.n}</span><span>{l.desc}</span></div><div className="level-body"><div><strong>{l.members}</strong><span>Members</span></div><div><strong>{l.active}</strong><span>Active sample profiles</span></div></div></Card>)}
    </div>
    <div className="notice" style={{ marginTop: 18 }}><ShieldCheck size={16}/><div><strong>Referral programme note</strong>This is a visual representation only. It does not create a real referral agreement, commission entitlement or reward.</div></div>
  </>;
}

function MePage({ setModal, notify, email, setEmail }: any) {
  return <>
    <PageHeading eyebrow="ACCOUNT CENTRE" title="My account" desc="Manage your demo profile, review sample balances and explore account actions."/>
    <div className="profile-banner"><div className="profile-avatar">DU</div><div style={{ flex: 1 }}><h2>Demo User</h2><p>{email} · Preview account</p></div><Badge variant="secondary" className="border-0">DEMO PLUS</Badge></div>
    <div className="grid grid-4 metrics-grid" style={{ marginTop: 17 }}>
      <Metric label="Total demo balance" value="$12,480.50" foot="Illustrative only" icon={Wallet}/>
      <Metric label="Demo funding" value="$2,500.00" foot="Sample account data" icon={ArrowDownLeft}/>
      <Metric label="Demo withdrawals" value="$750.00" foot="Sample account data" icon={ArrowUpRight}/>
      <Metric label="Available preview" value="$11,730.50" foot="Not withdrawable" icon={CreditCard}/>
    </div>
    <div className="grid grid-2" style={{ marginTop: 18 }}>
      <Card className="panel-pad">
        <div className="panel-title">Account actions</div><div className="panel-subtitle">These actions open simulated demo flows.</div>
        <div className="grid grid-2" style={{ marginTop: 16 }}>
          <Button onClick={() => setModal("deposit")}><ArrowDownLeft size={15}/> Add demo funds</Button>
          <Button variant="outline" onClick={() => setModal("withdraw")}><ArrowUpRight size={15}/> Withdrawal preview</Button>
        </div>
        <div className="account-row" style={{ marginTop: 14 }}><div className="account-icon"><Activity size={17}/></div><strong>Upgrade history</strong><ChevronRight size={16} onClick={() => notify("Upgrade history is sample content")}/></div>
        <div className="account-row"><div className="account-icon"><Users size={17}/></div><strong>My community</strong><ChevronRight size={16} onClick={() => notify("Open the Team tab to explore your community")}/></div>
        <div className="account-row"><div className="account-icon"><ArrowLeftRight size={17}/></div><strong>Transaction records</strong><ChevronRight size={16} onClick={() => notify("Sample transaction records are shown below")}/></div>
      </Card>
      <Card className="panel-pad">
        <div className="panel-title">Profile settings</div><div className="panel-subtitle">Update the sample profile details.</div>
        <label className="form-label">Email address</label><input className="form-input" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <div className="form-hint">This is local demo state only. No email is sent or stored on a server.</div>
        <Button variant="outline" className="w-full mt-4" onClick={() => notify("Demo profile updated locally")}><Check size={15}/> Save profile preview</Button>
        <div className="account-row" style={{ marginTop: 15 }}><div className="account-icon"><Settings size={17}/></div><strong>Application preferences</strong><ChevronRight size={16} onClick={() => notify("Preferences are not connected in this demo")}/></div>
        <div className="account-row"><div className="account-icon"><ShieldCheck size={17}/></div><strong>Security & privacy</strong><ChevronRight size={16} onClick={() => notify("Security settings are a demo placeholder")}/></div>
      </Card>
    </div>
    <div className="section-row"><div><h2>Recent transaction records</h2><p>Illustrative records only — no real payments have taken place.</p></div><button className="text-button" onClick={() => notify("All available demo records are shown")}>View all <ArrowRight size={14}/></button></div>
    <Card className="panel"><div className="table-wrap"><table><thead><tr><th>DESCRIPTION</th><th>REFERENCE</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th></tr></thead><tbody>{transactions.map(t => <tr key={t.id}><td style={{ fontWeight: 700 }}>{t.title}</td><td>{t.id}</td><td>{t.date}</td><td style={{ fontWeight: 750 }}>{t.amount}</td><td><Badge variant="secondary">{t.status}</Badge></td></tr>)}</tbody></table></div></Card>
  </>;
}

export default App;
