import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/a522132d-9a8e-4b4c-8c5a-39496ffeb5fc/files/5b01d8f5-8ee7-46f6-81d3-197c4f96a2a5.jpg";
const MASTER_IMG = "https://cdn.poehali.dev/projects/a522132d-9a8e-4b4c-8c5a-39496ffeb5fc/files/1ea0dbd1-54cd-4648-94d9-805add4ac3fa.jpg";

const services = [
  { icon: "Sparkles", title: "Классический массаж", duration: "60 мин", price: "2 500 ₽", desc: "Глубокое расслабление мышц, улучшение кровообращения и снятие накопленного стресса." },
  { icon: "Flame", title: "Тайский массаж", duration: "90 мин", price: "3 800 ₽", desc: "Древние техники растяжки и точечного воздействия для полного восстановления тела." },
  { icon: "Wind", title: "Ароматерапевтический", duration: "75 мин", price: "3 200 ₽", desc: "Массаж с эфирными маслами, подобранными индивидуально под ваше настроение." },
  { icon: "Heart", title: "Стоун-терапия", duration: "90 мин", price: "4 500 ₽", desc: "Горячие базальтовые камни, растворяющие напряжение на самых глубоких уровнях." },
  { icon: "Star", title: "Антицеллюлитный", duration: "60 мин", price: "2 800 ₽", desc: "Интенсивные техники для улучшения контуров тела и упругости кожи." },
  { icon: "Moon", title: "Релаксирующий SPA", duration: "120 мин", price: "5 500 ₽", desc: "Полный ритуал красоты: пилинг, обёртывание, массаж и маска для лица." },
];

const masters = [
  { name: "Анна Соколова", spec: "Тайский & классический", exp: "8 лет", img: MASTER_IMG, emoji: "🌸" },
  { name: "Марина Лебедева", spec: "SPA & ароматерапия", exp: "6 лет", img: null, emoji: "🌿" },
  { name: "Елена Романова", spec: "Стоун-терапия", exp: "10 лет", img: null, emoji: "🪨" },
];

const reviews = [
  { name: "Татьяна К.", text: "Невероятная атмосфера! После тайского массажа с Анной чувствую себя совершенно другим человеком. Буду возвращаться снова и снова.", rating: 5, date: "Март 2026" },
  { name: "Ольга М.", text: "Стоун-терапия — это что-то волшебное. Напряжение, которое держалось неделями, ушло за один сеанс. Спасибо Елене!", rating: 5, date: "Апрель 2026" },
  { name: "Виктория Р.", text: "Пришла на ароматерапевтический, осталась на SPA-ритуал. Мастера настоящие профессионалы, а интерьер просто обволакивает.", rating: 5, date: "Апрель 2026" },
];

const navLinks = ["Услуги", "О нас", "Мастера", "Отзывы", "Контакты"];
const TIMES = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function getDates() {
  const today = new Date();
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      label: d.getDate().toString(),
      day: DAYS[d.getDay() === 0 ? 6 : d.getDay() - 1],
      full: d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" }),
    };
  });
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedMaster, setSelectedMaster] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [form, setForm] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const dates = getDates();
  const blockedTimes = ["11:00", "14:00", "16:00"];

  function handleBook() {
    if (!form.name || !form.phone) return;
    setSubmitted(true);
  }

  function openBook() {
    setBookOpen(true);
    setStep(1);
    setSubmitted(false);
    setSelectedService("");
    setSelectedMaster("");
    setSelectedDate("");
    setSelectedTime("");
    setForm({ name: "", phone: "" });
  }

  function scrollTo(id: string) {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  const btnGrad = { background: "linear-gradient(135deg, hsl(340,40%,58%), hsl(20,55%,68%))" };
  const cardBorder = { border: "1px solid hsl(30,20%,90%)" };

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "rgba(250,245,240,0.88)", backdropFilter: "blur(18px)", borderBottom: "1px solid hsl(30,20%,88%)" }}>
        <span className="font-display text-2xl font-light tracking-widest text-[hsl(340,40%,45%)]">Мандарин</span>
        <div className="hidden md:flex gap-8">
          {navLinks.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())}
              className="font-body text-sm text-foreground/60 hover:text-[hsl(340,40%,52%)] transition-colors tracking-wide">
              {l}
            </button>
          ))}
        </div>
        <button onClick={openBook}
          className="hidden md:block px-6 py-2 rounded-full text-sm font-body text-white transition-all hover:opacity-90 hover:scale-105"
          style={btnGrad}>
          Записаться
        </button>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} className="text-foreground/60" />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: "rgba(250,245,240,0.97)", backdropFilter: "blur(20px)" }}>
          {navLinks.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())}
              className="font-display text-3xl font-light text-foreground/75 hover:text-[hsl(340,40%,52%)] transition-colors">
              {l}
            </button>
          ))}
          <button onClick={() => { setMenuOpen(false); openBook(); }}
            className="mt-4 px-10 py-3 rounded-full text-white font-body" style={btnGrad}>
            Записаться
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Серена — массажный центр" className="w-full h-full object-cover" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(110deg, rgba(250,242,234,0.93) 0%, rgba(250,242,234,0.78) 50%, rgba(250,242,234,0.25) 100%)" }} />
        </div>
        <div className="absolute top-32 right-20 w-56 h-56 rounded-full pointer-events-none animate-float"
          style={{ background: "radial-gradient(circle, hsl(340,60%,82%), transparent)", filter: "blur(35px)", opacity: 0.22 }} />
        <div className="absolute bottom-28 right-1/3 w-36 h-36 rounded-full pointer-events-none animate-float"
          style={{ background: "radial-gradient(circle, hsl(25,80%,80%), transparent)", filter: "blur(22px)", opacity: 0.18, animationDelay: "2s" }} />

        <div className="relative z-10 px-8 md:px-20 max-w-3xl">
          <p className="animate-fade-up-1 font-body text-xs tracking-[0.35em] uppercase text-[hsl(340,40%,52%)] mb-4">
            Место для вашего отдыха
          </p>
          <h1 className="animate-fade-up-2 font-display text-6xl md:text-8xl font-light leading-[1.05] text-foreground mb-6">
            Массаж<br />
            <em className="not-italic" style={{ color: "hsl(340,40%,56%)" }}>как искусство</em>
          </h1>
          <p className="animate-fade-up-3 font-body text-lg leading-relaxed max-w-md mb-10" style={{ color: "hsl(20,15%,42%)" }}>
            Профессиональные мастера, отборные масла и атмосфера, в которой время останавливается.
          </p>
          <div className="animate-fade-up-4 flex flex-wrap gap-4">
            <button onClick={openBook}
              className="px-8 py-4 rounded-full text-white font-body text-base transition-all hover:scale-105 hover:opacity-95"
              style={btnGrad}>
              Забронировать сеанс
            </button>
            <button onClick={() => scrollTo("услуги")}
              className="px-8 py-4 rounded-full font-body text-base transition-all hover:bg-white/60"
              style={{ border: "1px solid hsl(30,20%,80%)", color: "hsl(20,15%,42%)" }}>
              Все услуги
            </button>
          </div>
          <div className="animate-fade-up-4 flex gap-10 mt-14">
            {[["1 200+", "Довольных гостей"], ["8", "Мастеров"], ["3", "Года работы"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl font-light" style={{ color: "hsl(340,40%,52%)" }}>{n}</div>
                <div className="font-body text-xs mt-1" style={{ color: "hsl(20,10%,55%)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="услуги" className="py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "hsl(340,40%,52%)" }}>Что мы предлагаем</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-foreground">Наши услуги</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={s.title} className="hover-lift rounded-2xl p-7 cursor-pointer"
                style={{ background: i % 3 === 1 ? "linear-gradient(145deg, hsl(340,35%,95%), hsl(25,45%,93%))" : "white", ...cardBorder }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, hsl(340,40%,91%), hsl(25,55%,89%))" }}>
                  <Icon name={s.icon} fallback="Sparkles" size={20} style={{ color: "hsl(340,40%,52%)" }} />
                </div>
                <h3 className="font-display text-2xl font-light text-foreground mb-2">{s.title}</h3>
                <p className="font-body text-sm leading-relaxed mb-5" style={{ color: "hsl(20,12%,50%)" }}>{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs flex items-center gap-1" style={{ color: "hsl(20,10%,60%)" }}>
                    <Icon name="Clock" size={12} /> {s.duration}
                  </span>
                  <span className="font-body font-medium" style={{ color: "hsl(340,40%,48%)" }}>{s.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="о нас" className="py-24 px-6 md:px-20"
        style={{ background: "linear-gradient(135deg, hsl(30,35%,95%), hsl(340,30%,95%))" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "hsl(340,40%,52%)" }}>О нас</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-foreground mb-8 leading-tight">
              Тихая гавань<br />в центре города
            </h2>
            <p className="font-body text-base leading-8 mb-6" style={{ color: "hsl(20,12%,50%)" }}>
              Мандарин — это больше чем массажный центр. Мы создали пространство, где каждая деталь продумана для вашего комфорта: от аромата свежих трав на входе до температуры подогретых масел.
            </p>
            <p className="font-body text-base leading-8 mb-10" style={{ color: "hsl(20,12%,50%)" }}>
              Наши мастера прошли обучение в лучших школах России и Азии. Каждая техника — результат многолетней практики и искренней любви к своему делу.
            </p>
            <div className="flex flex-wrap gap-6">
              {[["🌿", "Натуральные масла"], ["🕯️", "Атмосфера покоя"], ["✨", "Индивидуальный подход"]].map(([e, t]) => (
                <div key={t} className="flex items-center gap-2 font-body text-sm" style={{ color: "hsl(20,12%,50%)" }}>
                  <span className="text-lg">{e}</span>{t}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 30px 80px rgba(180,90,130,0.18)" }}>
              <img src={HERO_IMG} alt="Интерьер Мандарин" className="w-full h-80 md:h-96 object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl px-6 py-4"
              style={{ background: "white", border: "1px solid hsl(30,20%,88%)", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
              <div className="font-display text-3xl font-light" style={{ color: "hsl(340,40%,52%)" }}>⭐ 4.9</div>
              <div className="font-body text-xs mt-1" style={{ color: "hsl(20,10%,58%)" }}>Средний рейтинг</div>
            </div>
          </div>
        </div>
      </section>

      {/* MASTERS */}
      <section id="мастера" className="py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "hsl(340,40%,52%)" }}>Команда</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-foreground">Наши мастера</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {masters.map((m) => (
              <div key={m.name} className="hover-lift text-center rounded-3xl overflow-hidden"
                style={{ background: "white", ...cardBorder }}>
                <div className="h-56 flex items-center justify-center overflow-hidden"
                  style={{ background: "linear-gradient(145deg, hsl(340,35%,93%), hsl(25,50%,90%))" }}>
                  {m.img
                    ? <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                    : <span className="text-8xl">{m.emoji}</span>}
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl font-light text-foreground mb-1">{m.name}</h3>
                  <p className="font-body text-sm mb-2" style={{ color: "hsl(340,40%,52%)" }}>{m.spec}</p>
                  <p className="font-body text-xs" style={{ color: "hsl(20,10%,60%)" }}>Опыт: {m.exp}</p>
                  <button onClick={openBook}
                    className="mt-5 w-full py-3 rounded-2xl font-body text-sm transition-all hover:opacity-80"
                    style={{ background: "linear-gradient(135deg, hsl(340,35%,93%), hsl(25,50%,90%))", border: "1px solid hsl(30,20%,88%)", color: "hsl(340,40%,48%)" }}>
                    Записаться к мастеру
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="отзывы" className="py-24 px-6 md:px-20"
        style={{ background: "linear-gradient(160deg, hsl(340,35%,96%), hsl(30,40%,95%))" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "hsl(340,40%,52%)" }}>Отзывы</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-foreground">Они уже отдохнули</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="hover-lift rounded-3xl p-8"
                style={{ background: "white", ...cardBorder }}>
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i} style={{ color: "hsl(340,60%,68%)" }}>★</span>
                  ))}
                </div>
                <p className="font-body text-base leading-relaxed mb-6 italic" style={{ color: "hsl(20,12%,48%)" }}>
                  «{r.text}»
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-body font-medium text-foreground text-sm">{r.name}</span>
                  <span className="font-body text-xs" style={{ color: "hsl(20,10%,65%)" }}>{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="контакты" className="py-24 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "hsl(340,40%,52%)" }}>Контакты</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-foreground mb-8">Найдите нас</h2>
            <div className="space-y-5">
              {[
                { icon: "MapPin", text: "ул. Тверская, 18, Москва" },
                { icon: "Phone", text: "+7 (495) 123-45-67" },
                { icon: "Mail", text: "hello@serena-spa.ru" },
                { icon: "Clock", text: "Ежедневно, 10:00 — 21:00" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, hsl(340,40%,91%), hsl(25,55%,89%))" }}>
                    <Icon name={icon} fallback="MapPin" size={18} style={{ color: "hsl(340,40%,52%)" }} />
                  </div>
                  <span className="font-body text-base" style={{ color: "hsl(20,12%,50%)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl h-64 md:h-80 flex flex-col items-center justify-center gap-4 text-center px-8"
            style={{ background: "linear-gradient(145deg, hsl(340,35%,93%), hsl(25,50%,90%))", ...cardBorder }}>
            <span className="text-5xl">🗺️</span>
            <p className="font-body text-base" style={{ color: "hsl(20,12%,52%)" }}>Карта появится здесь</p>
            <p className="font-body text-sm" style={{ color: "hsl(20,10%,65%)" }}>ул. Тверская, 18, Москва</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-6 md:mx-20 mb-20 rounded-3xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, hsl(340,45%,58%), hsl(20,60%,68%))" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)" }} />
        <div className="relative z-10 py-16 px-10 md:px-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-4">Первый визит — со скидкой 20%</h2>
          <p className="font-body text-base mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
            Запишитесь сегодня и получите приветственный подарок от Мандарин
          </p>
          <button onClick={openBook}
            className="px-10 py-4 rounded-full font-body text-base transition-all hover:scale-105"
            style={{ background: "white", color: "hsl(340,40%,50%)" }}>
            Получить скидку
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 md:px-20" style={{ borderTop: "1px solid hsl(30,20%,88%)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-2xl font-light tracking-widest" style={{ color: "hsl(340,40%,45%)" }}>Мандарин</span>
          <p className="font-body text-sm" style={{ color: "hsl(20,10%,62%)" }}>© 2026 Мандарин Massage Center. Все права защищены.</p>
          <div className="flex gap-6">
            {["ВКонтакте", "Telegram", "Instagram"].map(s => (
              <button key={s} className="font-body text-sm transition-colors hover:opacity-80"
                style={{ color: "hsl(20,10%,62%)" }}>{s}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {bookOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(35,20,25,0.55)", backdropFilter: "blur(10px)" }}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-8 relative"
            style={{ background: "hsl(30,30%,97%)", border: "1px solid hsl(30,20%,88%)" }}>
            <button onClick={() => setBookOpen(false)}
              className="absolute top-6 right-6 transition-colors"
              style={{ color: "hsl(20,10%,60%)" }}>
              <Icon name="X" size={20} />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🌸</div>
                <h3 className="font-display text-3xl font-light text-foreground mb-3">Вы записаны!</h3>
                <p className="font-body text-base mb-2" style={{ color: "hsl(20,12%,50%)" }}>
                  Ждём вас {selectedDate} в {selectedTime}
                </p>
                <p className="font-body text-sm mb-8" style={{ color: "hsl(20,10%,65%)" }}>
                  Подтверждение придёт на указанный номер телефона
                </p>
                <button onClick={() => setBookOpen(false)}
                  className="px-8 py-3 rounded-full text-white font-body" style={btnGrad}>
                  Отлично!
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-3xl font-light text-foreground mb-2">Запись на сеанс</h3>
                <div className="flex gap-1 mb-8">
                  {[1, 2, 3, 4].map(s => (
                    <div key={s} className="h-1 flex-1 rounded-full transition-all"
                      style={{ background: s <= step ? "hsl(340,40%,60%)" : "hsl(30,20%,88%)" }} />
                  ))}
                </div>

                {step === 1 && (
                  <div>
                    <p className="font-body text-xs uppercase tracking-widest mb-4" style={{ color: "hsl(20,10%,58%)" }}>Шаг 1 — Выберите услугу</p>
                    <div className="space-y-2">
                      {services.map(s => (
                        <button key={s.title} onClick={() => { setSelectedService(s.title); setStep(2); }}
                          className="w-full text-left rounded-2xl p-4 transition-all"
                          style={{
                            background: selectedService === s.title ? "linear-gradient(135deg, hsl(340,40%,93%), hsl(25,50%,91%))" : "white",
                            border: `1px solid ${selectedService === s.title ? "hsl(340,40%,72%)" : "hsl(30,20%,88%)"}`,
                          }}>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-body font-medium text-foreground text-sm">{s.title}</div>
                              <div className="font-body text-xs mt-0.5" style={{ color: "hsl(20,10%,60%)" }}>{s.duration}</div>
                            </div>
                            <span className="font-body font-medium text-sm" style={{ color: "hsl(340,40%,50%)" }}>{s.price}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <p className="font-body text-xs uppercase tracking-widest mb-4" style={{ color: "hsl(20,10%,58%)" }}>Шаг 2 — Выберите мастера</p>
                    <div className="space-y-3">
                      {masters.map(m => (
                        <button key={m.name} onClick={() => { setSelectedMaster(m.name); setStep(3); }}
                          className="w-full text-left rounded-2xl p-4 transition-all flex items-center gap-4"
                          style={{
                            background: selectedMaster === m.name ? "linear-gradient(135deg, hsl(340,40%,93%), hsl(25,50%,91%))" : "white",
                            border: `1px solid ${selectedMaster === m.name ? "hsl(340,40%,72%)" : "hsl(30,20%,88%)"}`,
                          }}>
                          <span className="text-3xl">{m.emoji}</span>
                          <div>
                            <div className="font-body font-medium text-foreground text-sm">{m.name}</div>
                            <div className="font-body text-xs mt-0.5" style={{ color: "hsl(20,10%,60%)" }}>{m.spec} · {m.exp}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <p className="font-body text-xs uppercase tracking-widest mb-4" style={{ color: "hsl(20,10%,58%)" }}>Шаг 3 — Дата и время</p>
                    <div className="overflow-x-auto pb-2 mb-5">
                      <div className="flex gap-2 w-max">
                        {dates.map(d => (
                          <button key={d.full} onClick={() => setSelectedDate(d.full)}
                            className="flex flex-col items-center rounded-2xl px-4 py-3 min-w-[52px] transition-all"
                            style={{
                              background: selectedDate === d.full ? "linear-gradient(135deg, hsl(340,40%,60%), hsl(20,55%,68%))" : "white",
                              border: `1px solid ${selectedDate === d.full ? "transparent" : "hsl(30,20%,88%)"}`,
                              color: selectedDate === d.full ? "white" : "hsl(20,15%,35%)",
                            }}>
                            <span className="font-body text-xs opacity-70">{d.day}</span>
                            <span className="font-display text-xl font-light">{d.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    {selectedDate && (
                      <div className="grid grid-cols-4 gap-2">
                        {TIMES.map(t => {
                          const blocked = blockedTimes.includes(t);
                          return (
                            <button key={t} disabled={blocked}
                              onClick={() => { setSelectedTime(t); setStep(4); }}
                              className="rounded-xl py-2.5 font-body text-sm transition-all"
                              style={{
                                background: blocked ? "hsl(30,15%,93%)" : selectedTime === t ? "linear-gradient(135deg, hsl(340,40%,60%), hsl(20,55%,68%))" : "white",
                                border: `1px solid ${blocked ? "transparent" : selectedTime === t ? "transparent" : "hsl(30,20%,88%)"}`,
                                color: blocked ? "hsl(30,10%,72%)" : selectedTime === t ? "white" : "hsl(20,15%,35%)",
                                cursor: blocked ? "not-allowed" : "pointer",
                              }}>
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <p className="font-body text-xs uppercase tracking-widest mb-4" style={{ color: "hsl(20,10%,58%)" }}>Шаг 4 — Ваши данные</p>
                    <div className="rounded-2xl p-4 mb-6 text-sm font-body space-y-1"
                      style={{ background: "linear-gradient(135deg, hsl(340,35%,93%), hsl(25,45%,91%))", border: "1px solid hsl(30,20%,88%)" }}>
                      <div style={{ color: "hsl(20,12%,50%)" }}>📋 {selectedService}</div>
                      <div style={{ color: "hsl(20,12%,50%)" }}>👤 {selectedMaster}</div>
                      <div style={{ color: "hsl(20,12%,50%)" }}>📅 {selectedDate}, {selectedTime}</div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="font-body text-xs uppercase tracking-widest block mb-2" style={{ color: "hsl(20,10%,58%)" }}>Ваше имя</label>
                        <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Как вас зовут?"
                          className="w-full rounded-2xl px-4 py-3 font-body text-sm outline-none transition-all"
                          style={{ background: "white", border: "1px solid hsl(30,20%,85%)", color: "hsl(20,15%,25%)" }} />
                      </div>
                      <div>
                        <label className="font-body text-xs uppercase tracking-widest block mb-2" style={{ color: "hsl(20,10%,58%)" }}>Телефон</label>
                        <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder="+7 (___) ___-__-__"
                          className="w-full rounded-2xl px-4 py-3 font-body text-sm outline-none transition-all"
                          style={{ background: "white", border: "1px solid hsl(30,20%,85%)", color: "hsl(20,15%,25%)" }} />
                      </div>
                    </div>
                    <button onClick={handleBook} disabled={!form.name || !form.phone}
                      className="mt-6 w-full py-4 rounded-2xl font-body text-base text-white transition-all hover:opacity-95 disabled:opacity-50"
                      style={btnGrad}>
                      Подтвердить запись
                    </button>
                  </div>
                )}

                {step > 1 && (
                  <button onClick={() => setStep(s => s - 1)}
                    className="mt-4 font-body text-sm flex items-center gap-1 transition-colors hover:opacity-80"
                    style={{ color: "hsl(20,10%,60%)" }}>
                    <Icon name="ChevronLeft" size={14} /> Назад
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}