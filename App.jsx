import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { Users, UserRoundPlus, Search, Mail, MapPin, BriefcaseBusiness, Wallet, LayoutDashboard, ArrowUpRight } from "lucide-react";

function Navbar() {
  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <span className="brand-mark"><Users size={21} /></span>
        <span>People<span className="brand-accent">Desk</span><small>EMPLOYEE PORTAL</small></span>
      </Link>
      <nav>
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
        <NavLink to="/employee-form" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Employee Form</NavLink>
      </nav>
      <div className="topbar-right"><span className="status-dot" /> HR Workspace</div>
    </header>
  );
}

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load employee data.");
        return response.json();
      })
      .then((data) => setEmployees(data))
      .catch(() => setError("Employee data could not be loaded. Check your internet connection and refresh."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => employees.filter((person) =>
    `${person.name} ${person.email} ${person.id}`.toLowerCase().includes(search.toLowerCase())
  ), [employees, search]);

  return (
    <main className="page">
      <div className="page-heading">
        <div>
          <div className="eyebrow"><LayoutDashboard size={14} /> OVERVIEW</div>
          <h1>Employee dashboard</h1>
          <p className="subheading">A clear view of your people directory.</p>
        </div>
        <Link to="/employee-form" className="primary-button"><UserRoundPlus size={17} /> Add employee</Link>
      </div>

      <section className="welcome-card">
        <div className="welcome-copy">
          <span className="welcome-label">PEOPLE OPERATIONS</span>
          <h2>Good work starts with great people.</h2>
          <p>View the employee directory and keep your team information organised.</p>
        </div>
        <div className="welcome-art"><Users size={78} strokeWidth={1.1} /></div>
      </section>

      <section className="stats-grid">
        <article className="stat-card"><div className="stat-icon purple"><Users size={20} /></div><div><p>Total directory records</p><strong>{loading ? "—" : employees.length}</strong><span>Loaded from external API</span></div></article>
        <article className="stat-card"><div className="stat-icon green"><Mail size={20} /></div><div><p>Visible results</p><strong>{loading ? "—" : filtered.length}</strong><span>Based on your search</span></div></article>
        <article className="stat-card"><div className="stat-icon orange"><ArrowUpRight size={20} /></div><div><p>Data source</p><strong className="source-label">JSONPlaceholder</strong><span>Public demo API</span></div></article>
      </section>

      <section className="directory-card">
        <div className="directory-header">
          <div><h2>People directory</h2><p>Employee ID, name and email address</p></div>
          <label className="search-box"><Search size={17} /><input aria-label="Search employees" placeholder="Search people..." value={search} onChange={(e) => setSearch(e.target.value)} /></label>
        </div>
        {loading ? <div className="message">Loading employee records…</div> : error ? <div className="message error">{error}</div> : (
          <div className="table-wrap"><table><thead><tr><th>EMPLOYEE ID</th><th>NAME</th><th>EMAIL ADDRESS</th><th>PROFILE</th></tr></thead>
            <tbody>{filtered.map((person) => <tr key={person.id}>
              <td><span className="id-pill">EMP-{String(person.id).padStart(3, "0")}</span></td>
              <td><div className="person-cell"><span className={`avatar avatar-${person.id % 5}`}>{person.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><span className="person-name">{person.name}</span></div></td>
              <td className="email-cell"><Mail size={15} />{person.email}</td>
              <td><span className="view-label">Directory record <ArrowUpRight size={14} /></span></td>
            </tr>)}</tbody>
          </table>{filtered.length === 0 && <div className="message">No employees match your search.</div>}</div>
        )}
        <div className="table-footer">Showing {loading ? "…" : filtered.length} of {loading ? "…" : employees.length} records <span>Demo data · JSONPlaceholder API</span></div>
      </section>
      <footer className="footer">PeopleDesk <span>•</span> Employee management interface</footer>
    </main>
  );
}

function EmployeeForm() {
  const [form, setForm] = useState({ name: "", designation: "", location: "", salary: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="page form-page">
      <div className="page-heading">
        <div><div className="eyebrow"><UserRoundPlus size={14} /> PEOPLE OPERATIONS</div><h1>Employee form</h1><p className="subheading">Enter employee details in the form below.</p></div>
        <Link to="/" className="secondary-button">← Back to dashboard</Link>
      </div>
      <section className="form-layout">
        <div className="form-info"><div className="form-info-icon"><BriefcaseBusiness size={27} /></div><h2>Team information</h2><p>Use this form to demonstrate collecting employee details. As requested in the assignment, the form does not send or save data to a backend.</p><div className="info-line"><MapPin size={17} /> Location and role details</div><div className="info-line"><Wallet size={17} /> Salary information</div></div>
        <div className="form-card">
          <h2>Employee details</h2><p className="form-caption">All fields are required.</p>
          {submitted && <div className="success-message">Form validated successfully. No data was sent to a server.</div>}
          <form onSubmit={submit}>
            <label>Full name<input name="name" value={form.name} onChange={update} placeholder="e.g. Alex Morgan" required /></label>
            <label>Designation<input name="designation" value={form.designation} onChange={update} placeholder="e.g. Software Engineer" required /></label>
            <label>Location<input name="location" value={form.location} onChange={update} placeholder="e.g. Kochi, Kerala" required /></label>
            <label>Salary (₹ per month)<input name="salary" type="number" min="0" value={form.salary} onChange={update} placeholder="e.g. 45000" required /></label>
            <div className="form-actions"><button className="primary-button" type="submit">Validate details <ArrowUpRight size={16} /></button><button className="reset-button" type="button" onClick={() => { setForm({ name: "", designation: "", location: "", salary: "" }); setSubmitted(false); }}>Clear form</button></div>
          </form>
        </div>
      </section>
      <footer className="footer">PeopleDesk <span>•</span> Employee management interface</footer>
    </main>
  );
}

export default function App() {
  return <><Navbar /><Routes><Route path="/" element={<Dashboard />} /><Route path="/employee-form" element={<EmployeeForm />} /><Route path="*" element={<main className="page"><h1>Page not found</h1><Link to="/">Return home</Link></main>} /></Routes></>;
}