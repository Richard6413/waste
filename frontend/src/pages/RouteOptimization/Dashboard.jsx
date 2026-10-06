// frontend/src/pages/RouteOptimization/Dashboard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPinned, Zap, TrendingUp, Clock, Truck, Leaf } from 'lucide-react';
import ZoneSelector from './ZoneSelector';
import KpiCard from './KpiCard';
import ProgressSteps from './ProgressSteps';
import SummaryCard from './SummaryCard';
import MiniZoneMap from './MiniZoneMap';

const RouteOptimizationDashboard = () => {
  const [selectedZone, setSelectedZone] = useState('all');
  const [optimizing, setOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(false);

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      setOptimized(true);
    }, 2000);
  };

  return (
    <div className="workspace-content">
      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Route Optimization</h1>
          <p className="page-description">
            Machine learning-powered route planning for maximum efficiency
          </p>
        </div>
        <button
          onClick={handleOptimize}
          disabled={optimizing}
          className="btn btn-primary"
        >
          <Zap size={16} />
          {optimizing ? 'Optimizing...' : 'Run Optimization'}
        </button>
      </div>

      {/* Zone Selector */}
      <ZoneSelector selected={selectedZone} onSelect={setSelectedZone} />

      {/* KPI Cards */}
      <div className="kpi-grid">
        <KpiCard
          icon={Truck}
          label="Active Routes"
          value="18"
          change="+3 this week"
          color="blue"
        />
        <KpiCard
          icon={Clock}
          label="Avg. Collection Time"
          value="4.2h"
          change="-12% vs last month"
          color="green"
        />
        <KpiCard
          icon={TrendingUp}
          label="Fuel Efficiency"
          value="94.2%"
          change="+2.5% improvement"
          color="amber"
        />
        <KpiCard
          icon={Leaf}
          label="CO₂ Saved"
          value="1.2t"
          change="this month"
          color="green"
        />
      </div>

      {/* Progress Steps */}
      {optimizing && <ProgressSteps />}

      {/* Summary Cards */}
      {optimized && (
        <div className="workspace-grid">
          <SummaryCard
            title="Optimization Complete"
            description="Routes have been optimized for maximum efficiency"
            metrics={[
              { label: 'Distance Saved', value: '47 km/day' },
              { label: 'Time Saved', value: '3.2 hrs/day' },
              { label: 'Fuel Saved', value: '18 L/day' },
            ]}
          />
          <SummaryCard
            title="Environmental Impact"
            description="Estimated reduction in carbon emissions"
            metrics={[
              { label: 'CO₂ Reduction', value: '1.2 t/month' },
              { label: 'Fuel Efficiency', value: '+12%' },
              { label: 'Noise Reduction', value: '8%' },
            ]}
          />
        </div>
      )}

      {/* Mini Map */}
      <div className="workspace-panel">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Route Map</h2>
            <p className="panel-description">Visual overview of optimized routes</p>
          </div>
        </div>
        <div className="panel-body">
          <MiniZoneMap />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="workspace-panel">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Quick Actions</h2>
            <p className="panel-description">Common route optimization tasks</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="action-grid">
            <Link to="/ops/routes" className="action-tile">
              <div className="action-tile-icon">
                <MapPinned size={16} />
              </div>
              <div>
                <div className="action-tile-title">View Routes</div>
                <div className="action-tile-description">See all collection routes</div>
              </div>
            </Link>
            <Link to="/ops/routes/create" className="action-tile">
              <div className="action-tile-icon">
                <Truck size={16} />
              </div>
              <div>
                <div className="action-tile-title">Create Route</div>
                <div className="action-tile-description">Plan a new collection route</div>
              </div>
            </Link>
            <Link to="/analytics" className="action-tile">
              <div className="action-tile-icon">
                <TrendingUp size={16} />
              </div>
              <div>
                <div className="action-tile-title">View Analytics</div>
                <div className="action-tile-description">Analyze route performance</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimizationDashboard;
