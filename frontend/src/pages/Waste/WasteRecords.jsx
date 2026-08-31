// src/pages/Waste/WasteRecords.jsx
import { useState } from 'react';
import { useHybridData } from '../../hooks/useHybridData';
import hybridService from '../../services/hybridService';

const WasteRecords = () => {
  const [realtime, setRealtime] = useState(true);
  const { data, loading, error, refetch } = useHybridData('waste', { realtime });
  const [newRecord, setNewRecord] = useState({ type: '', weight: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await hybridService.createWasteRecord(newRecord);
      setNewRecord({ type: '', weight: 0 });
      if (!realtime) refetch();
    } catch (err) {
      alert('Failed to create record: ' + err.message);
    }
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">WASTE</div>
          <h1 className="page-title">Waste Records</h1>
          <p className="page-description">Manage waste collections</p>
        </div>
        <div className="command-bar">
          <button 
            className={`command-button ${realtime ? 'bg-emerald-50 text-emerald-700' : ''}`}
            onClick={() => setRealtime(!realtime)}
          >
            {realtime ? '🔴 Real-time On' : '⚡ Real-time Off'}
          </button>
          <button className="command-button" onClick={refetch}>
            Refresh
          </button>
        </div>
      </div>

      {loading && <div className="text-center py-4">Loading...</div>}
      {error && <div className="text-red-500 py-4">Error: {error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <h3 className="font-semibold mb-3">Records ({data.length})</h3>
            <div className="space-y-2">
              {data.map((record) => (
                <div key={record.id} className="flex justify-between p-2 border-b border-slate-100">
                  <span>{record.type || 'Unknown'}</span>
                  <span>{record.weight || 0} kg</span>
                  {realtime && <span className="text-emerald-500 text-xs">● Live</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <h3 className="font-semibold mb-3">Add Record</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Waste Type"
              className="input"
              value={newRecord.type}
              onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              className="input"
              value={newRecord.weight}
              onChange={(e) => setNewRecord({ ...newRecord, weight: parseFloat(e.target.value) })}
            />
            <button type="submit" className="btn btn-primary w-full">
              Add Record
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WasteRecords;