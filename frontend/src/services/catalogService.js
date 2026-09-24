const fallback = {
  bins: [
    { id: 'BIN-CMB-014', zone: 'Colombo 07', address: 'Independence Ave', fill: 92, type: 'Mixed', status: 'critical' },
    { id: 'BIN-CMB-028', zone: 'Colombo 05', address: 'Havelock Road', fill: 71, type: 'Recyclable', status: 'warning' },
    { id: 'BIN-KDY-003', zone: 'Kandy', address: 'Peradeniya Road', fill: 44, type: 'Organic', status: 'ok' },
    { id: 'BIN-GALLE-011', zone: 'Galle', address: 'Lighthouse Street', fill: 18, type: 'Mixed', status: 'ok' },
  ],
  alerts: [
    { id: 'ALT-1', severity: 'high', title: 'Overflow risk on BIN-CMB-014', detail: 'Fill level 92%.', zone: 'Colombo 07', createdAt: new Date().toISOString() },
    { id: 'ALT-2', severity: 'medium', title: 'Truck UG-12 delayed', detail: 'Baseline Road traffic.', zone: 'Colombo 05', createdAt: new Date().toISOString() },
  ],
  requests: [],
  centres: [
    { id: 'DC-01', name: 'Biyagama MRF', hours: '06:00–18:00', accepts: ['Plastic', 'Paper', 'Metal'], wait: '12 min' },
    { id: 'DC-02', name: 'Kolonnawa Transfer Station', hours: '05:00–20:00', accepts: ['Mixed residual'], wait: '8 min' },
  ],
  incidents: [],
  overview: { collectionsToday: 148, activeRoutes: 18, completionRate: 94.2, outstandingLkr: 8400000, binsCritical: 1, openRequests: 1 },
};

async function getJson(path, options) {
  const res = await fetch(path, { headers: { 'Content-Type': 'application/json' }, ...options });
  if (!res.ok) throw new Error(`Request failed ${res.status}`);
  return res.json();
}

export async function fetchCatalog() {
  try {
    return await getJson('/api/catalog');
  } catch {
    return fallback;
  }
}

export async function createServiceRequest(payload) {
  try {
    return await getJson('/api/catalog/requests', { method: 'POST', body: JSON.stringify(payload) });
  } catch {
    return { ...payload, id: `local-${Date.now()}`, status: 'open', createdAt: new Date().toISOString() };
  }
}

export async function patchServiceRequest(id, status) {
  try {
    return await getJson(`/api/catalog/requests/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
  } catch {
    return { id, status };
  }
}

export async function createIncident(payload) {
  try {
    return await getJson('/api/catalog/incidents', { method: 'POST', body: JSON.stringify(payload) });
  } catch {
    return { ...payload, id: `local-${Date.now()}`, status: 'open', createdAt: new Date().toISOString() };
  }
}
