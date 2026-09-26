import { useMemo } from 'react';

const animals = [
  { id: 1, name: 'عجل 01', age: 120, status: 'رضيع', weight: 65, price: 2200, source: 'مزرعة الشمال' },
  { id: 2, name: 'عجل 02', age: 180, status: 'مفطوم', weight: 110, price: 2800, source: 'مزرعة الجنوب' },
  { id: 3, name: 'عجل 03', age: 260, status: 'نامٍ', weight: 150, price: 3400, source: 'شراء محلي' },
  { id: 4, name: 'عجل 04', age: 310, status: 'جاهز للبيع', weight: 195, price: 4100, source: 'مزرعة الشرقية' },
];

const expenses = [
  { title: 'علف', value: 2400 },
  { title: 'أدوية', value: 850 },
  { title: 'طبيب بيطري', value: 600 },
  { title: 'أجور', value: 1500 },
  { title: 'صيانة', value: 320 },
];

const income = [
  { title: 'مبيعات الحيوانات', value: 7200 },
  { title: 'إيرادات إضافية', value: 1100 },
];

const vetRecords = [
  { title: 'تطعيم', detail: 'لقاح الحمى القلاعية', date: '2026-09-10' },
  { title: 'فحص دوري', detail: 'تقييم النمو والوزن', date: '2026-09-16' },
  { title: 'علاج', detail: 'مضاد التهاب', date: '2026-09-20' },
];

const kpis = [
  { label: 'إجمالي الحيوانات', value: animals.length },
  { label: 'الرصيد', value: '٤٢٥٠ ر.س' },
  { label: 'إجمالي المصروفات', value: '٥٦٧٠ ر.س' },
  { label: 'إجمالي الإيرادات', value: '٨٣٠٠ ر.س' },
];

const formatMoney = (value) => `${Number(value).toLocaleString('en-US')} ر.س`;

export default function App() {
  const totalCosts = useMemo(() => expenses.reduce((sum, item) => sum + item.value, 0), []);
  const totalIncome = useMemo(() => income.reduce((sum, item) => sum + item.value, 0), []);
  const netProfit = totalIncome - totalCosts;
  const averageCost = totalCosts / animals.length;
  const breakEven = Math.round(averageCost + 450);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">لوحة التحكم</p>
          <h1>تطبيق إدارة المزرعة</h1>
        </div>
        <button className="primary-btn">+ إضافة حيوان</button>
      </header>

      <section className="kpis">
        {kpis.map((item) => (
          <div className="kpi-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>

      <main className="content-grid">
        <section className="panel wide-panel">
          <div className="panel-header">
            <h2>إدارة الحيوانات</h2>
            <button className="ghost-btn">عرض الكل</button>
          </div>

          <div className="animal-list">
            {animals.map((animal) => (
              <div className="animal-item" key={animal.id}>
                <div>
                  <h3>{animal.name}</h3>
                  <p>الحالة: {animal.status}</p>
                </div>
                <div className="animal-meta">
                  <span>الوزن: {animal.weight} كجم</span>
                  <span>العمر: {animal.age} يوم</span>
                  <span>السعر: {formatMoney(animal.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>الحسابات المالية</h2>
          </div>

          <div className="money-box">
            <div>
              <label>إجمالي المصروفات</label>
              <strong>{formatMoney(totalCosts)}</strong>
            </div>
            <div>
              <label>إجمالي الإيرادات</label>
              <strong>{formatMoney(totalIncome)}</strong>
            </div>
            <div className="profit-box">
              <label>صافي الربح</label>
              <strong>{formatMoney(netProfit)}</strong>
            </div>
          </div>

          <div className="list-block">
            {expenses.map((item) => (
              <div className="list-row" key={item.title}>
                <span>{item.title}</span>
                <strong>{formatMoney(item.value)}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>الرعاية البيطرية</h2>
          </div>

          <div className="list-block">
            {vetRecords.map((item) => (
              <div className="vet-item" key={item.title + item.date}>
                <div className="dot" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <small>{item.date}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel wide-panel">
          <div className="panel-header">
            <h2>نقطة التعادل</h2>
          </div>

          <div className="break-even-grid">
            <div className="metric-box">
              <label>متوسط تكلفة الحيوان</label>
              <strong>{formatMoney(averageCost)}</strong>
            </div>
            <div className="metric-box">
              <label>سعر التعادل</label>
              <strong>{formatMoney(breakEven)}</strong>
            </div>
            <div className="metric-box">
              <label>سعر البيع المستهدف</label>
              <strong>{formatMoney(breakEven + 700)}</strong>
            </div>
          </div>

          <p className="note">
            نقطة التعادل تمثل السعر الذي يغطي التكاليف التشغيلية دون ربح أو خسارة، مع مراعاة هامش عائد مناسب.
          </p>
        </section>
      </main>
    </div>
  );
}
