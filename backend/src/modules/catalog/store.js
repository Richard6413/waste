const { randomUUID } = require('crypto');

const bins = [
  { id: 'BIN-CMB-014', zone: 'Colombo 07', address: 'Independence Ave, Cinnamon Gardens', fill: 92, type: 'Mixed', status: 'critical', lastCollected: '2026-09-23T06:40:00Z' },
  { id: 'BIN-CMB-028', zone: 'Colombo 05', address: 'Havelock Road, Kirulapone', fill: 71, type: 'Recyclable', status: 'warning', lastCollected: '2026-09-23T08:10:00Z' },
  { id: 'BIN-KDY-003', zone: 'Kandy', address: 'Peradeniya Road, Getambe', fill: 44, type: 'Organic', status: 'ok', lastCollected: '2026-09-24T05:20:00Z' },
  { id: 'BIN-GALLE-011', zone: 'Galle', address: 'Lighthouse Street, Fort', fill: 18, type: 'Mixed', status: 'ok', lastCollected: '2026-09-24T07:05:00Z' },
  { id: 'BIN-NBO-006', zone: 'Nuwara Eliya', address: 'Upper Lake Road', fill: 83, type: 'Mixed', status: 'warning', lastCollected: '2026-09-22T16:00:00Z' },
  { id: 'BIN-CMB-041', zone: 'Colombo 03', address: 'Galle Face Court', fill: 55, type: 'Recyclable', status: 'ok', lastCollected: '2026-09-24T04:50:00Z' },
];

const alerts = [
  { id: 'ALT-1', severity: 'high', title: 'Overflow risk on BIN-CMB-014', detail: 'Fill level 92%. Dispatch a crew before 13:00.', zone: 'Colombo 07', createdAt: '2026-09-24T07:12:00Z' },
  { id: 'ALT-2', severity: 'medium', title: 'Truck UG-12 delayed 22 min', detail: 'Traffic on Baseline Road. Two households skipped.', zone: 'Colombo 05', createdAt: '2026-09-24T08:01:00Z' },
  { id: 'ALT-3', severity: 'low', title: 'Recycling centre near capacity', detail: 'Biyagama MRF at 81% of daily throughput.', zone: 'Gampaha', createdAt: '2026-09-24T06:30:00Z' },
];

let requests = [
  { id: 'SR-2041', type: 'missed-pickup', household: 'N. Perera', address: '12 Flower Rd, Colombo 07', status: 'open', notes: 'Bin not emptied yesterday', createdAt: '2026-09-24T05:40:00Z' },
  { id: 'SR-2042', type: 'bulky-item', household: 'A. Fernando', address: '88 Kandy Rd, Kadawatha', status: 'scheduled', notes: 'Sofa + mattress', createdAt: '2026-09-23T11:15:00Z' },
  { id: 'SR-2043', type: 'bin-repair', household: 'S. Jayawardena', address: '4 Lake Dr, Battaramulla', status: 'in-progress', notes: 'Lid broken, leaking', createdAt: '2026-09-22T09:00:00Z' },
];

const centres = [
  { id: 'DC-01', name: 'Biyagama Material Recovery Facility', hours: '06:00–18:00', accepts: ['Plastic', 'Paper', 'Metal', 'Glass'], lat: 6.961, lng: 79.989, wait: '12 min' },
  { id: 'DC-02', name: 'Kolonnawa Transfer Station', hours: '05:00–20:00', accepts: ['Mixed residual', 'Organic'], lat: 6.932, lng: 79.892, wait: '8 min' },
  { id: 'DC-03', name: 'Kandy Compost Hub', hours: '07:00–16:00', accepts: ['Organic', 'Garden waste'], lat: 7.291, lng: 80.635, wait: '5 min' },
  { id: 'DC-04', name: 'Galle Fort Recycling Point', hours: '08:00–17:00', accepts: ['Plastic', 'Glass'], lat: 6.026, lng: 80.217, wait: 'Quiet' },
];

let incidents = [
  { id: 'INC-11', type: 'hazard', title: 'Chemical drums at roadside', zone: 'Kelaniya', status: 'open', crew: 'Team Bravo', createdAt: '2026-09-24T06:05:00Z' },
  { id: 'INC-12', type: 'access', title: 'Parked tuk-tuk blocking bin bay', zone: 'Colombo 04', status: 'resolved', crew: 'Team Alpha', createdAt: '2026-09-23T14:20:00Z' },
];

function snapshot() {
  return {
    bins,
    alerts,
    requests,
    centres,
    incidents,
    overview: {
      collectionsToday: 148,
      activeRoutes: 18,
      completionRate: 94.2,
      outstandingLkr: 8400000,
      binsCritical: bins.filter((b) => b.fill >= 85).length,
      openRequests: requests.filter((r) => r.status === 'open').length,
    },
  };
}

function addRequest(payload) {
  const item = {
    id: `SR-${2040 + requests.length + 1}`,
    type: payload.type || 'missed-pickup',
    household: payload.household || 'Resident',
    address: payload.address || '',
    status: 'open',
    notes: payload.notes || '',
    createdAt: new Date().toISOString(),
  };
  requests = [item, ...requests];
  return item;
}

function addIncident(payload) {
  const item = {
    id: `INC-${10 + incidents.length + 1}`,
    type: payload.type || 'hazard',
    title: payload.title || 'Field incident',
    zone: payload.zone || 'Unknown',
    status: 'open',
    crew: payload.crew || 'Unassigned',
    createdAt: new Date().toISOString(),
  };
  incidents = [item, ...incidents];
  return item;
}

function updateRequest(id, status) {
  requests = requests.map((r) => (r.id === id ? { ...r, status } : r));
  return requests.find((r) => r.id === id) || null;
}

module.exports = { snapshot, addRequest, addIncident, updateRequest, randomUUID };
