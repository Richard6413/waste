const DEMO_KEY = 'jemak_demo_session';
const AUTH_TOKEN_KEY = 'authToken';

export const DEMO_ACCOUNTS = [
  { email: 'admin@jemakwaste.com', password: 'Admin@123', name: 'Nimali Admin', role: 'admin' },
  { email: 'collector@jemakwaste.com', password: 'Collector@123', name: 'Kasun Collector', role: 'collector' },
  { email: 'resident@jemakwaste.com', password: 'Resident@123', name: 'Ishara Resident', role: 'user' },
];

export function loadDemoSession() {
  try {
    const raw = localStorage.getItem(DEMO_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDemoSession(session) {
  localStorage.setItem(DEMO_KEY, JSON.stringify(session));
  if (session.token) {
    localStorage.setItem(AUTH_TOKEN_KEY, session.token);
  }
}

export function clearDemoSession() {
  localStorage.removeItem(DEMO_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function signInDemo(email, password) {
  const match = DEMO_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === String(email).trim().toLowerCase() && a.password === password
  );
  if (!match) return null;
  const session = {
    uid: `demo-${match.role}`,
    email: match.email,
    name: match.name,
    role: match.role,
    token: 'demo-token',
    demo: true,
  };
  saveDemoSession(session);
  return session;
}
