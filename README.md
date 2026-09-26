:root {
  font-family: 'Tahoma', 'Segoe UI', sans-serif;
  color: #0f172a;
  background: #f3f6f1;
  line-height: 1.5;
  font-weight: 500;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  background: linear-gradient(180deg, #eef8ee, #f4f7f3 45%, #edf4ef);
}

body {
  min-height: 100vh;
}

button {
  font: inherit;
  cursor: pointer;
}

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
  margin-bottom: 22px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #2f8f5b;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
}

h2, h3, p {
  margin: 0;
}

.primary-btn,
.ghost-btn {
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  transition: 0.2s ease;
}

.primary-btn {
  background: #1d7a4c;
  color: #fff;
  box-shadow: 0 10px 24px rgba(29, 122, 76, 0.2);
}

.ghost-btn {
  background: #edf8ef;
  color: #14532d;
}

.kpis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.kpi-card,
.panel,
.metric-box {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(15, 23, 42, 0.04);
  border-radius: 18px;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.04);
}

.kpi-card {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.kpi-card span {
  color: #406b61;
  font-size: 0.9rem;
}

.kpi-card strong {
  font-size: clamp(1.4rem, 2vw, 2rem);
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
  margin-bottom: 16px;
}

.animal-list,
.list-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.animal-item,
.list-row,
.vet-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: #f9fbf9;
  border: 1px solid #edf1ee;
  border-radius: 14px;
  padding: 14px 16px;
}

.animal-item {
  align-items: flex-start;
}

.animal-item h3 {
  margin-bottom: 6px;
  font-size: 1.1rem;
}

.animal-item p,
.animal-meta span,
.list-row span,
.vet-item p,
.vet-item small,
.note {
  color: #4f5f59;
}

.animal-meta {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 6px;
}

.money-box,
.break-even-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.money-box > div,
.metric-box {
  padding: 16px;
  background: #f7faf7;
  border-radius: 12px;
  border: 1px solid #edf0ee;
}

.money-box label,
.metric-box label {
  display: block;
  margin-bottom: 8px;
  color: #4b5d59;
  font-size: 0.8rem;
}

.profit-box {
  grid-column: span 2;
  background: #eaf9ef;
}

.vet-item {
  justify-content: flex-start;
  text-align: right;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #1d7a4c;
  box-shadow: 0 0 0 4px rgba(29, 122, 76, 0.1);
}

.vet-item div:nth-child(2) {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.note {
  margin-top: 14px;
  padding: 12px 14px;
  background: #f3faf5;
  border-radius: 12px;
  border: 1px solid #e1f1e7;
}

@media (max-width: 860px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .wide-panel {
    grid-column: span 1;
  }

  .topbar {
    flex-direction: column;
    align-items: stretch;
  }

  .animal-item,
  .list-row,
  .vet-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .animal-meta {
    text-align: right;
  }
}
