import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const loginRes = http.post(
    'http://localhost:3000/rest/user/login',
    JSON.stringify({ email: 'admin@juice-sh.op', password: 'admin123' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(loginRes, { 'login exitoso': (r) => r.status === 200 });

  const token = JSON.parse(loginRes.body).authentication.token;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const searchRes = http.get('http://localhost:3000/rest/products/search?q=apple', { headers });
  check(searchRes, { 'busqueda exitosa': (r) => r.status === 200 });

  const basketRes = http.get('http://localhost:3000/rest/basket/1', { headers });
  check(basketRes, { 'carrito accesible': (r) => r.status === 200 });

  sleep(1);
}

export function handleSummary(data) {
  return {
    "tests/performance/reports/smoke-report.html": htmlReport(data),
  };
}