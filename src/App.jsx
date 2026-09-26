import { useEffect, useMemo, useState } from 'react';

const defaultAnimals = [
  {
    id: 1,
    name: 'العجل 01',
    status: 'رضيع',
    sex: 'ذكر',
    breed: 'هولشتاين',
    ageDays: 45,
    weight: 65,
    buyDate: '2026-08-10',
    price: 2200,
    salePrice: 4200,
    source: 'مزرعة الشمال',
    notes: 'يحتاج إلى متابعة تغذية منتظمة.'
  },
  {
    id: 2,
    name: 'العجل 02',
    status: 'مفطوم',
    sex: 'أنثى',
    breed: 'أرباي',
    ageDays: 120,
    weight: 110,
    buyDate: '2026-07-18',
    price: 2800,
    salePrice: 5200,
    source: 'مزرعة الجنوب',
    notes: 'تغذية جيدة، نمو مناسب.'
  },
  {
    id: 3,
    name: 'العجل 03',
    status: 'نامٍ',
    sex: 'ذكر',
    breed: 'هولشتاين',
    ageDays: 180,
    weight: 160,
    buyDate: '2026-06-22',
    price: 3300,
    salePrice: 6100,
    source: 'شراء محلي',
    notes: 'حالة صحية جي��ة، يتطلب متابعة وزن.'
  }
];

const defaultTransactions = [
  { id: 1, type: 'expense', title: 'علف', category: 'التغذية', amount: 2400, date: '2026-09-20', notes: 'علف مخلوط' },
  { id: 2, type: 'expense', title: 'أدوية', category: 'الصحة', amount: 850, date: '2026-09-18', notes: 'مضادات التهاب' },
  { id: 3, type: 'expense', title: 'طبيب بيطري', category: 'الصحة', amount: 600, date: '2026-09-15', notes: 'فحص دوري' },
  { id: 4, type: 'income', title: 'بيع حيوان', category: 'المبيعات', amount: 7200, date: '2026-09-12', notes: 'بيع عجل من القطاع الأول' },
  { id: 5, type: 'income', title: 'إيراد إضافي', category: 'أخرى', amount: 1100, date: '2026-09-10', notes: 'بيع بقايا' }
];

const defaultHealth = [
  { id: 1, animalId: 1, type: 'تطعيم', title: 'لقاح الحمى القلاعية', notes: 'تم التطعيم بنجاح', date: '2026-09-10' },
  { id: 2, animalId: 2, type: 'فحص', title: 'الفحص الدوري', notes: 'وزن الحيوان مناسب', date: '2026-09-16' },
  { id: 3, animalId: 3, type: 'علاج', title: 'علاج التهاب', notes: 'تم إعطاء العلاج حسب الوصفة', date: '2026-09-20' }
];

const statusOptions = ['رضيع', 'مفطوم', 'نامٍ', 'جاهز للبيع', 'مباع'];
const sexOptions = ['ذكر', 'أنثى'];

const moneyFormat = (value) => `${Number(value || 0).toLocaleString('en-US')} ر.س`;

function App() {
  const [tab, setTab] = useState('dashboard');
  const [animals, setAnimals] = useState(() => {
    const stored = localStorage.getItem('farm-animals');
    return stored ? JSON.parse(stored) : defaultAnimals;
  });
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem('farm-transactions');
    return stored ? JSON.parse(stored) : defaultTransactions;
  });
  const [health, setHealth] = useState(() => {
    const stored = localStorage.getItem('farm-health');
    return stored ? JSON.parse(stored) : defaultHealth;
  });

  const [animalForm, setAnimalForm] = useState({
    name: '',
    status: 'رضيع',
    sex: 'ذكر',
    breed: '',
    ageDays: '',
    weight: '',
    buyDate: '',
    price: '',
    salePrice: '',
    source: '',
    notes: ''
  });

  const [txForm, setTxForm] = useState({
    type: 'expense',
    title: '',
    category: 'التغذية',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    notes: ''
  });

  const [healthForm, setHealthForm] = useState({
    animalId: animals[0]?.id || 1,
    type: 'تطعيم',
    title: '',
    date: new Date().toISOString().slice(0, 10),
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('farm-animals', JSON.stringify(animals));
  }, [animals]);

  useEffect(() => {
    localStorage.setItem('farm-transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('farm-health', JSON.stringify(health));
  }, [health]);

  const totalExpenses = useMemo(
    () => transactions.filter((tx) => tx.type === 'expense').reduce((sum, tx) => sum + Number(tx.amount), 0),
    [transactions]
  );

  const totalIncome = useMemo(
    () => transactions.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + Number(tx.amount), 0),
    [transactions]
  );

  const netProfit = totalIncome - totalExpenses;
  const averageCost = animals.length ? totalExpenses / animals.length : 0;
  const breakEven = Math.round(averageCost + 300);

  const addAnimal = (e) => {
    e.preventDefault();
    if (!animalForm.name.trim()) return;

    const newAnimal = {
      id: Date.now(),
      name: animalForm.name.trim(),
      status: animalForm.status,
      sex: animalForm.sex,
      breed: animalForm.breed || 'غير محدد',
      ageDays: Number(animalForm.ageDays || 0),
      weight: Number(animalForm.weight || 0),
      buyDate: animalForm.buyDate || new Date().toISOString().slice(0, 10),
      price: Number(animalForm.price || 0),
      salePrice: Number(animalForm.salePrice || 0),
      source: animalForm.source || 'غير محدد',
      notes: animalForm.notes || 'لا توجد ملاحظات.'
    };

    setAnimals((prev) => [newAnimal, ...prev]);
    setAnimalForm({
      name: '',
      status: 'رضيع',
      sex: 'ذكر',
      breed: '',
      ageDays: '',
      weight: '',
      buyDate: '',
      price: '',
      salePrice: '',
      source: '',
      notes: ''
    });
    setTab('animals');
  };

  const addTransaction = (e) => {
    e.preventDefault();
    if (!txForm.title.trim() || !txForm.amount) return;

    const newTx = {
      id: Date.now(),
      type: txForm.type,
      title: txForm.title.trim(),
      category: txForm.category,
      amount: Number(txForm.amount),
      date: txForm.date,
      notes: txForm.notes || 'لا توجد ملاحظات.'
    };

    setTransactions((prev) => [newTx, ...prev]);
    setTxForm({
      type: 'expense',
      title: '',
      category: 'التغذية',
      amount: '',
      date: new Date().toISOString().slice(0, 10),
      notes: ''
    });
    setTab('transactions');
  };

  const addHealthEntry = (e) => {
    e.preventDefault();
    if (!healthForm.title.trim()) return;

    const newEntry = {
      id: Date.now(),
      animalId: Number(healthForm.animalId),
      type: healthForm.type,
      title: healthForm.title.trim(),
      date: healthForm.date,
      notes: healthForm.notes || 'لا توجد ملاحظات.'
    };

    setHealth((prev) => [newEntry, ...prev]);
    setHealthForm({
      animalId: animals[0]?.id || 1,
      type: 'تطعيم',
      title: '',
      date: new Date().toISOString().slice(0, 10),
      notes: ''
    });
    setTab('health');
  };

  const removeAnimal = (id) => {
    setAnimals((prev) => prev.filter((animal) => animal.id !== id));
  };

  const removeTx = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">لوحة التحكم</p>
          <h1>تطبيق إدارة المزرعة</h1>
        </div>
        <button className="primary-btn" onClick={() => setTab('animals')}>+ إضافة حيوان</button>
      </header>

      <nav className="tabs" aria-label="التنقل الرئيسي">
        {['dashboard', 'animals', 'transactions', 'health', 'break-even'].map((item) => (
          <button
            key={item}
            className={tab === item ? 'tab active' : 'tab'}
            onClick={() => setTab(item)}
          >
            {item === 'dashboard' && 'الرئيسية'}
            {item === 'animals' && 'الحيوانات'}
            {item === 'transactions' && 'الحسابات'}
            {item === 'health' && 'الرعاية البيطرية'}
            {item === 'break-even' && 'نقطة التعادل'}
          </button>
        ))}
      </nav>

      {tab === 'dashboard' && (
        <>
          <section className="kpis">
            <div className="kpi-card">
              <span>إجمالي الحيوانات</span>
              <strong>{animals.length}</strong>
            </div>
            <div className="kpi-card">
              <span>إجمالي المصروفات</span>
              <strong>{moneyFormat(totalExpenses)}</strong>
            </div>
            <div className="kpi-card">
              <span>إجمالي الإيرادات</span>
              <strong>{moneyFormat(totalIncome)}</strong>
            </div>
            <div className="kpi-card">
              <span>صافي الربح</span>
              <strong>{moneyFormat(netProfit)}</strong>
            </div>
          </section>

          <section className="content-grid">
            <div className="panel wide-panel">
              <div className="panel-header">
                <h2>قائمة الحيوانات</h2>
                <button className="ghost-btn" onClick={() => setTab('animals')}>إدارة</button>
              </div>
              <div className="list-stack">
                {animals.map((animal) => (
                  <div className="list-item" key={animal.id}>
                    <div>
                      <h3>{animal.name}</h3>
                      <p>الحالة: {animal.status}</p>
                    </div>
                    <div className="meta-col">
                      <span>الوزن: {animal.weight} كجم</span>
                      <span>العمر: {animal.ageDays} يوم</span>
                      <span>السعر: {moneyFormat(animal.salePrice || animal.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>المصروفات</h2>
              </div>
              <div className="list-stack">
                {transactions.filter((tx) => tx.type === 'expense').map((tx) => (
                  <div className="mini-row" key={tx.id}>
                    <span>{tx.title}</span>
                    <strong>{moneyFormat(tx.amount)}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>الإيرادات</h2>
              </div>
              <div className="list-stack">
                {transactions.filter((tx) => tx.type === 'income').map((tx) => (
                  <div className="mini-row" key={tx.id}>
                    <span>{tx.title}</span>
                    <strong>{moneyFormat(tx.amount)}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {tab === 'animals' && (
        <section className="content-grid">
          <div className="panel">
            <div className="panel-header">
              <h2>إضافة حيوان جديد</h2>
            </div>

            <form className="form-grid" onSubmit={addAnimal}>
              <label>
                الاسم
                <input value={animalForm.name} onChange={(e) => setAnimalForm({ ...animalForm, name: e.target.value })} placeholder="مثال: العجل 04" />
              </label>
              <label>
                الحالة
                <select value={animalForm.status} onChange={(e) => setAnimalForm({ ...animalForm, status: e.target.value })}>
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
              <label>
                الجنس
                <select value={animalForm.sex} onChange={(e) => setAnimalForm({ ...animalForm, sex: e.target.value })}>
                  {sexOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
              <label>
                السلالة
                <input value={animalForm.breed} onChange={(e) => setAnimalForm({ ...animalForm, breed: e.target.value })} placeholder="مثال: هولشتاين" />
              </label>
              <label>
                العمر بالأيام
                <input type="number" value={animalForm.ageDays} onChange={(e) => setAnimalForm({ ...animalForm, ageDays: e.target.value })} />
              </label>
              <label>
                الوزن (كجم)
                <input type="number" value={animalForm.weight} onChange={(e) => setAnimalForm({ ...animalForm, weight: e.target.value })} />
              </label>
              <label>
                تاريخ الشراء
                <input type="date" value={animalForm.buyDate} onChange={(e) => setAnimalForm({ ...animalForm, buyDate: e.target.value })} />
              </label>
              <label>
                سعر الشراء (ر.س)
                <input type="number" value={animalForm.price} onChange={(e) => setAnimalForm({ ...animalForm, price: e.target.value })} />
              </label>
              <label>
                سعر البيع (ر.س)
                <input type="number" value={animalForm.salePrice} onChange={(e) => setAnimalForm({ ...animalForm, salePrice: e.target.value })} />
              </label>
              <label>
                مصدر الحيوان
                <input value={animalForm.source} onChange={(e) => setAnimalForm({ ...animalForm, source: e.target.value })} placeholder="مثال: مزرعة الشمال" />
              </label>
              <label className="full-width">
                ملاحظات
                <textarea value={animalForm.notes} onChange={(e) => setAnimalForm({ ...animalForm, notes: e.target.value })} rows="3" />
              </label>
              <button type="submit" className="primary-btn full-width">حفظ الحيوان</button>
            </form>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>قائمة الحيوانات</h2>
            </div>
            <div className="list-stack">
              {animals.map((animal) => (
                <div className="list-item" key={animal.id}>
                  <div>
                    <h3>{animal.name}</h3>
                    <p>{animal.breed} • {animal.sex}</p>
                  </div>
                  <div className="meta-col">
                    <span>{animal.status}</span>
                    <span>{animal.weight} كجم</span>
                    <button className="danger-btn" onClick={() => removeAnimal(animal.id)}>حذف</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === 'transactions' && (
        <section className="content-grid">
          <div className="panel">
            <div className="panel-header">
              <h2>إضافة حركة مالية</h2>
            </div>

            <form className="form-grid" onSubmit={addTransaction}>
              <label>
                النوع
                <select value={txForm.type} onChange={(e) => setTxForm({ ...txForm, type: e.target.value })}>
                  <option value="expense">مصروف</option>
                  <option value="income">إيراد</option>
                </select>
              </label>
              <label>
                العنوان
                <input value={txForm.title} onChange={(e) => setTxForm({ ...txForm, title: e.target.value })} placeholder="مثال: علف، بيع حيوان" />
              </label>
              <label>
                الفئة
                <select value={txForm.category} onChange={(e) => setTxForm({ ...txForm, category: e.target.value })}>
                  <option value="التغذية">التغذية</option>
                  <option value="الصحة">الصحة</option>
                  <option value="المبيعات">المبيعات</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </label>
              <label>
                المبلغ (ر.س)
                <input type="number" value={txForm.amount} onChange={(e) => setTxForm({ ...txForm, amount: e.target.value })} />
              </label>
              <label>
                التاريخ
                <input type="date" value={txForm.date} onChange={(e) => setTxForm({ ...txForm, date: e.target.value })} />
              </label>
              <label className="full-width">
                الملاحظات
                <textarea value={txForm.notes} onChange={(e) => setTxForm({ ...txForm, notes: e.target.value })} rows="3" />
              </label>
              <button type="submit" className="primary-btn full-width">حفظ الحركة</button>
            </form>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>سجل الحسابات</h2>
            </div>
            <div className="list-stack">
              {transactions.map((tx) => (
                <div className="transaction-row" key={tx.id}>
                  <div>
                    <strong>{tx.title}</strong>
                    <p>{tx.category}</p>
                  </div>
                  <div className="meta-col">
                    <span className={tx.type === 'income' ? 'income' : 'expense'}>{tx.type === 'income' ? 'إيراد' : 'مصروف'}</span>
                    <span>{moneyFormat(tx.amount)}</span>
                    <button className="danger-btn" onClick={() => removeTx(tx.id)}>حذف</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === 'health' && (
        <section className="content-grid">
          <div className="panel">
            <div className="panel-header">
              <h2>إضافة سجل طبي</h2>
            </div>

            <form className="form-grid" onSubmit={addHealthEntry}>
              <label>
                الحيوان
                <select value={healthForm.animalId} onChange={(e) => setHealthForm({ ...healthForm, animalId: e.target.value })}>
                  {animals.map((animal) => (
                    <option key={animal.id} value={animal.id}>{animal.name}</option>
                  ))}
                </select>
              </label>
              <label>
                النوع
                <select value={healthForm.type} onChange={(e) => setHealthForm({ ...healthForm, type: e.target.value })}>
                  <option value="تطعيم">تطعيم</option>
                  <option value="فحص">فحص</option>
                  <option value="علاج">علاج</option>
                </select>
              </label>
              <label>
                العنوان
                <input value={healthForm.title} onChange={(e) => setHealthForm({ ...healthForm, title: e.target.value })} placeholder="مثال: لقاح الحمى" />
              </label>
              <label>
                التاريخ
                <input type="date" value={healthForm.date} onChange={(e) => setHealthForm({ ...healthForm, date: e.target.value })} />
              </label>
              <label className="full-width">
                الملاحظات
                <textarea value={healthForm.notes} onChange={(e) => setHealthForm({ ...healthForm, notes: e.target.value })} rows="3" />
              </label>
              <button type="submit" className="primary-btn full-width">حفظ السجل</button>
            </form>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>سجل الرعاية البيطرية</h2>
            </div>
            <div className="list-stack">
              {health.map((entry) => {
                const animal = animals.find((item) => item.id === Number(entry.animalId));
                return (
                  <div className="health-item" key={entry.id}>
                    <div>
                      <strong>{entry.type}</strong>
                      <p>{entry.title}</p>
                    </div>
                    <div className="meta-col">
                      <span>{animal ? animal.name : 'حيوان غير محدد'}</span>
                      <span>{entry.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {tab === 'break-even' && (
        <section className="content-grid">
          <div className="panel wide-panel">
            <div className="panel-header">
              <h2>حساب نقطة التعادل</h2>
            </div>

            <div className="break-grid">
              <div className="metric-box">
                <label>إجمالي التكاليف</label>
                <strong>{moneyFormat(totalExpenses)}</strong>
              </div>
              <div className="metric-box">
                <label>عدد الحيوانات</label>
                <strong>{animals.length}</strong>
              </div>
              <div className="metric-box">
                <label>متوسط تكلفة الحيوان</label>
                <strong>{moneyFormat(averageCost)}</strong>
              </div>
              <div className="metric-box">
                <label>سعر التعادل</label>
                <strong>{moneyFormat(breakEven)}</strong>
              </div>
              <div className="metric-box">
                <label>الربح المتوقع</label>
                <strong>{moneyFormat(netProfit)}</strong>
              </div>
              <div className="metric-box">
                <label>سعر البيع المستهدف</label>
                <strong>{moneyFormat(breakEven + 700)}</strong>
              </div>
            </div>

            <p className="note">
              نقطة التعادل هي السعر الذي يغطي تكاليف الإنتاج دون خسارة أو ربح، ويُعدّ السعر المستهدف أعلى من نقطة التعادل ليضمن هامش ربح مناسب.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
