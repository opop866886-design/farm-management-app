:root {
  font-family: 'Tahoma', 'Segoe UI', sans-serif;
  direction: rtl;
  color: #15232d;
  background: #f4f7f3;
  line-height: 1.6;
  font-weight: 500;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* { box-sizing: border-box; }

html, body, #root {
  margin: 0;
  min-height: 100%;
  background: linear-gradient(180deg, #eef8ee, #f4f7f3 45%, #edf4ef);
}

body {
  min-height: 100vh;
}

button, input, select, textarea {
  font: inherit;
}

button { cursor: pointer; }

.app-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 20px 48px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #2f8f5b;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1, h2, h3, p, span, strong { margin: 0; }

h1 {
  font-size: clamp(1.8rem, 3vw, 2.7rem);
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.tab {
  border: 1px solid #dfe9e2;
  background: #f9fbf9;
  color: #254c3d;
  border-radius: 12px;
  padding: 10px 16px;
  font-weight: 700;
}

.tab.active {
  background: #1d7a4c;
  border-color: #1d7a4c;
  color: #fff;
}

.kpis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.kpi-card, .panel, .metric-box {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(21, 35, 45, 0.04);
  border-radius: 18px;
  box-shadow: 0 16px 30px rgba(15,23,42,0.04);
}

.kpi-card {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.kpi-card span {
  color: #506a63;
  font-size: 0.9rem;
}

.kpi-card strong {
  font-size: clamp(1.5rem, 2vw, 2rem);
}

.content-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
}

.panel {
  padding: 20px;
}

.wide-panel {
  grid-column: span 2;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.primary-btn,
.ghost-btn,
.danger-btn {
  border: none;
  border-radius: 12px;
  padding: 10px 14px;
  font-weight: 700;
}

.primary-btn {
  background: #1d7a4c;
  color: #fff;
  box-shadow: 0 12px 26px rgba(29, 122, 76, 0.18);
}

.ghost-btn {
  background: #edf8ef;
  color: #14532d;
}

.danger-btn {
  background: #fee2e2;
  color: #991b1b;
}

.list-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list-item,
.mini-row,
.transaction-row,
.health-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: #f8faf8;
  border: 1px solid #ebf0eb;
  border-radius: 14px;
  padding: 14px 16px;
}

.meta-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  color: #475e58;
  font-size: 0.88rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: 16px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #35504a;
  font-size: 0.9rem;
}

input, select, textarea {
  border: 1px solid #dfece3;
  background: #fff;
  border-radius: 12px;
  padding: 11px 12px;
  color: #15232d;
}

.full-width {
  grid-column: 1 / -1;
}

.income { color: #166534; }
.expense { color: #b91c1c; }

.break-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(170px, 1fr));
  gap: 16px;
}

.metric-box {
  padding: 16px;
  background: #f7faf7;
}

.metric-box label {
  display: block;
  margin-bottom: 8px;
  color: #4b5d59;
  font-size: 0.8rem;
}

.note {
  padding: 14px 16px;
  border-radius: 12px;
  background: #f3faf5;
  color: #345246;
  border: 1px solid #dfeee3;
  margin-top: 18px;
}

@media (max-width: 860px) {
  .content-grid,
  .form-grid,
  .break-grid {
    grid-template-columns: 1fr;
  }

  .topbar,
  .list-item,
  .mini-row,
  .transaction-row,
  .health-item {
    flex-direction: column;
    align-items: stretch;
  }

  .wide-panel {
    grid-column: auto;
  }

  .meta-col {
    align-items: flex-start;
  }
}
