import { Link } from 'react-router-dom';

export default function FleetDashboard() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">FLEET</div>
          <h1 className="page-title">Fleet dashboard</h1>
          <p className="page-description">Vehicles, utilisation, and workshop status.</p>
        </div>
        <Link to="/fleet/vehicles" className="btn btn-primary">Vehicle list</Link>
      </div>
      <div className="kpi-grid">
        <div className="kpi-card"><p className="kpi-label">Active trucks</p><p className="kpi-value">16</p></div>
        <div className="kpi-card"><p className="kpi-label">In workshop</p><p className="kpi-value">2</p></div>
        <div className="kpi-card"><p className="kpi-label">Avg utilisation</p><p className="kpi-value">87%</p></div>
        <div className="kpi-card"><p className="kpi-label">Fuel today</p><p className="kpi-value">412 L</p></div>
      </div>
    </div>
  );
}
