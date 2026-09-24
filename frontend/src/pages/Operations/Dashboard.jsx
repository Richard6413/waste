import { Link } from 'react-router-dom';
import { MapPinned, Plus, Radio, Truck } from 'lucide-react';

export default function OperationsDashboard() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Operations command</h1>
          <p className="page-description">Dispatch, bins, and live crews.</p>
        </div>
      </div>
      <div className="action-grid">
        {[
          { to: '/ops/bins', title: 'Smart bins', icon: Radio, description: 'Fill levels & overflow' },
          { to: '/ops/routes', title: 'Routes', icon: MapPinned, description: 'Today’s plans' },
          { to: '/ops/routes/create', title: 'Optimise', icon: Plus, description: 'Build a new path' },
          { to: '/ops/vehicles/tracking', title: 'Live map', icon: Truck, description: 'GPS of active trucks' },
        ].map((a) => {
          const Icon = a.icon;
          return (
            <Link key={a.to} to={a.to} className="action-tile">
              <div className="action-tile-icon"><Icon size={16} /></div>
              <div>
                <div className="action-tile-title">{a.title}</div>
                <div className="action-tile-description">{a.description}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
