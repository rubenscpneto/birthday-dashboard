import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, PartyPopper, Cake, Star } from 'lucide-react';

// PMF Logo
const PMF_LOGO = '/images/logo-pmf.svg';

// Helper to get today's date in MM-DD format
const getTodayFormatted = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${month}-${day}`;
};

// Helper to get initials
const getInitials = (name, surname) => {
  return `${name.charAt(0)}${surname ? surname.charAt(0) : ''}`.toUpperCase();
};

// Mock data generator
const generateMockData = () => {
  const data = [
    { id: 1, name: 'Rubens', surname: '', photo: 'images/rubens.jpeg', birthday: '09-23', department: 'Software' },
    { id: 2, name: 'Guilherme', surname: 'Vieira', photo: 'images/guiVieira.png', birthday: '04-09', department: 'Software' },
    { id: 3, name: 'Geninho', surname: '', birthday: '02-26', department: 'Software' },
    { id: 4, name: 'Alex', surname: '', birthday: '01-04', department: 'Software' },
    { id: 5, name: 'Isabella', surname: '', birthday: '11-30', department: 'Software' },
    { id: 6, name: 'Fábio', surname: '', birthday: '01-08', department: 'Diretor de Software' },
    { id: 7, name: 'Pedro', surname: 'Farias', photo: 'images/pedroFreitas.png', birthday: '04-10', department: 'Software' },
    { id: 8, name: 'Deison', surname: '', photo: 'images/deison.png', birthday: '04-06', department: 'Subsecretário' },
    { id: 9, name: 'Matheus', surname: 'Henrique', birthday: '01-20', department: 'Infra' },
    { id: 10, name: 'Pedro', surname: 'Guimarães', birthday: '09-09', department: 'Infra' },
    { id: 11, name: 'Matheus', surname: 'Martins', birthday: '11-22', department: 'Infra' },
    { id: 12, name: 'Gui', surname: 'Souza', birthday: '02-10', department: 'Gerente de Infra' },
    { id: 13, name: 'Márcio', surname: '', birthday: '08-27', department: 'Infra' },
    { id: 14, name: 'João Pedro', surname: '', photo: 'images/joaoPedro.png', birthday: '05-14', department: 'Infra' },
    { id: 15, name: 'Cássio', surname: '', photo: '', birthday: '12-04', department: 'Analista' },
    { id: 16, name: 'Alexandre', surname: '', photo: 'images/alexandre.png', birthday: '05-13', department: 'Analista' },
    { id: 17, name: 'Lucas', surname: '', photo: '', birthday: '03-14', department: 'Infra' },
    { id: 18, name: 'Rian', surname: '', photo: '', birthday: '01-06', department: 'Infra' },
    { id: 19, name: 'Samurai', surname: '', photo: '', birthday: '07-14', department: 'Infra' },
    { id: 19, name: 'Sidnei', surname: '', photo: '', birthday: '02-13', department: 'Diretor de Infra' },
  ].map(emp => ({ ...emp, type: 'birthday', date: emp.birthday }));

  // Events
  data.push(
    { id: 'e1', type: 'event', title: 'Futebol', date: '09-16' },
    { id: 'e2', type: 'event', title: 'Palestra', date: '09-29' }
  );

  return data;
};

const BirthdayDashboard = () => {
  const [monthBirthdays, setMonthBirthdays] = useState([]);
  const [monthEvents, setMonthEvents] = useState([]);
  const [birthdayPeeps, setBirthdayPeeps] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = generateMockData();

      const todayStr = getTodayFormatted();
      const currentMonth = todayStr.split('-')[0];

      // Filter items for this month, sort by day
      const monthData = data
        .filter(item => item.date.split('-')[0] === currentMonth)
        .sort((a, b) => a.date.localeCompare(b.date));

      const birthdays = monthData.filter(item => item.type === 'birthday');
      const events = monthData.filter(item => item.type === 'event');

      setMonthBirthdays(birthdays);
      setMonthEvents(events);

      // Today's birthday people only
      const todaysBirthdays = birthdays.filter(emp => emp.date === todayStr);
      setBirthdayPeeps(todaysBirthdays);
    };

    fetchData();

    // Auto-refresh at midnight
    const intervalId = setInterval(() => {
      setCurrentDate((prevDate) => {
        const now = new Date();
        if (now.getDate() !== prevDate.getDate()) {
          fetchData();
        }
        return now;
      });
    }, 1000 * 60);

    return () => clearInterval(intervalId);
  }, []);

  // Confetti effect when there are today's birthdays
  useEffect(() => {
    if (birthdayPeeps.length === 0) return;

    const duration = 15 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#00B1EB', '#003063', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#4dd4ff'] });
      confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#00B1EB', '#003063', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#4dd4ff'] });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
    const intervalId = setInterval(frame, 15000);

    return () => clearInterval(intervalId);
  }, [birthdayPeeps]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const currentMonthName = capitalize(currentDate.toLocaleDateString('pt-BR', { month: 'long' }));

  return (
    <div className="relative w-full h-full min-h-screen bg-pmf-light-bg overflow-y-auto overflow-x-hidden flex flex-col font-sans hide-scrollbar">
      {/* Background decoration with PMF brand colors — soft light blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-pmf-cyan/10 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-pmf-navy/8 blur-[120px]"></div>
        <div className="absolute top-[30%] -right-[20%] w-[40%] h-[40%] rounded-full bg-pmf-cyan/8 blur-[100px]"></div>
        <div className="absolute top-[60%] left-[20%] w-[30%] h-[30%] rounded-full bg-pmf-light-surface blur-[80px]"></div>
      </div>

      <div className="relative z-10 p-8 md:p-10 flex-1 flex flex-col h-full gap-8">
        {/* ========== HEADER ========== */}
        <header className="flex justify-between items-center glass-panel rounded-3xl p-5 px-8 shadow-lg border border-pmf-navy/10">
          <div className="flex items-center gap-5">
            {/* PMF Logo */}
            <img
              src={PMF_LOGO}
              alt="Prefeitura de Florianópolis"
              className="h-16 w-auto drop-shadow-md"
            />
            <div className="h-12 w-px bg-pmf-navy/20"></div>
            <div>
              <h1 className="text-3xl xl:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pmf-navy via-pmf-cyan-dark to-pmf-cyan tracking-tight">
                Eventos de {currentMonthName}
              </h1>
              <p className="text-sm text-pmf-navy/50 font-medium tracking-[0.3em] uppercase mt-0.5">
                Governo Eletrônico — EGOV
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-lg text-pmf-navy font-bold tracking-widest uppercase bg-pmf-cyan/10 px-6 py-2.5 rounded-full border border-pmf-cyan/30 shadow-sm">
              {currentDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
        </header>

        {/* ========== HERO: TODAY'S BIRTHDAYS ========== */}
        {birthdayPeeps.length > 0 && (
          <div className="glass-panel w-full rounded-[2.5rem] border border-pmf-cyan/30 overflow-hidden flex flex-col items-center justify-center relative p-12 shadow-[0_0_60px_-15px_rgba(0,177,235,0.2)] bg-gradient-to-b from-white/80 to-pmf-light-surface/90 shrink-0">
            {/* Animated Decors */}
            <div className="absolute top-10 right-10 text-pmf-cyan animate-bounce-slow opacity-70">
              <Cake size={64} />
            </div>
            <div className="absolute bottom-16 left-20 text-yellow-500 opacity-50 animate-pulse-slow">
              <Star size={48} />
            </div>
            <div className="absolute top-20 left-32 text-pmf-cyan-dark opacity-40 animate-float">
              <PartyPopper size={56} />
            </div>

            <div className="z-10 w-full text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-black bg-clip-text bg-gradient-to-r from-pmf-navy via-pmf-cyan-dark to-pmf-cyan tracking-tight drop-shadow-sm">
                🎉 PARABÉNS! HOJE É O SEU DIA! 🎉
              </h2>
            </div>

            <div className="flex flex-row flex-wrap justify-center items-center gap-12 lg:gap-16 z-10">
              {birthdayPeeps.map(emp => (
                <div key={emp.id} className="flex flex-col items-center">
                  <div className="relative mb-8 group cursor-default">
                    <div className="absolute inset-0 bg-gradient-to-r from-pmf-cyan via-pmf-navy to-pmf-cyan-light rounded-full blur-2xl opacity-30 scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                    {emp.photo ? (
                      <img
                        src={emp.photo}
                        alt={emp.name}
                        className="relative w-56 h-56 md:w-64 md:h-64 object-cover rounded-full border-[6px] border-white shadow-2xl z-10 ring-4 ring-pmf-cyan/50 group-hover:ring-pmf-cyan transition-all duration-300"
                      />
                    ) : (
                      <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center rounded-full border-[6px] border-white bg-gradient-to-br from-pmf-cyan/20 to-pmf-navy/10 shadow-2xl z-10 ring-4 ring-pmf-cyan/50 group-hover:ring-pmf-cyan transition-all duration-300">
                        <span className="text-7xl font-bold text-pmf-navy tracking-wider">
                          {getInitials(emp.name, emp.surname)}
                        </span>
                      </div>
                    )}
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-pmf-cyan to-pmf-cyan-dark p-4 rounded-full shadow-xl z-20 border-4 border-white transform rotate-12 group-hover:rotate-6 transition-transform duration-300 animate-glow">
                      <Cake size={36} className="text-white" />
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <h3 className="text-4xl font-extrabold text-pmf-navy tracking-wide">
                      {emp.name} {emp.surname}
                    </h3>
                    <div className="inline-flex items-center justify-center bg-pmf-cyan/15 rounded-full px-6 py-2 border border-pmf-cyan/40">
                      <span className="text-pmf-cyan-dark uppercase tracking-widest font-bold">
                        {emp.department}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-2xl text-pmf-navy/70 font-light tracking-wide mt-14 z-10">
              Que o dia de vocês seja repleto de alegria e muito sucesso!
            </p>
          </div>
        )}

        {/* ========== MONTHLY GRID ========== */}
        <div className="glass-panel w-full rounded-3xl p-8 shadow-lg bg-white/50 flex-1 border border-pmf-navy/10">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-pmf-navy/10">
            <div className="bg-pmf-cyan/15 p-2 rounded-xl">
              <Calendar className="text-pmf-cyan-dark" size={28} />
            </div>
            <h3 className="text-3xl font-bold text-pmf-navy">
              {currentMonthName}
            </h3>
            <span className="ml-auto text-pmf-navy/50 text-lg font-medium">
              {monthBirthdays.length} {monthBirthdays.length === 1 ? 'aniversariante' : 'aniversariantes'}
              {monthEvents.length > 0 && ` • ${monthEvents.length} ${monthEvents.length === 1 ? 'evento' : 'eventos'}`}
            </span>
          </div>

          {(monthBirthdays.length > 0 || monthEvents.length > 0) ? (
            (() => {
              const totalItems = monthBirthdays.length + (monthEvents.length > 0 ? 1 : 0);
              const isDense = totalItems > 4;

              let avatarSizeClass = "w-48 h-48 text-4xl";
              let cardPaddingClass = "p-8 px-6";
              let nameTextClass = "text-xl mb-1";
              let deptTextClass = "text-sm";
              let tagPaddingClass = "px-5 py-2 text-lg";
              let imgMarginClass = "mt-6 mb-5";
              let tagIconSize = 18;
              let evtPaddingClass = "p-4";
              let evtTitleClass = "text-lg";

              if (isDense) {
                if (totalItems === 5) {
                  avatarSizeClass = "w-32 h-32 md:w-36 md:h-36 xl:w-44 xl:h-44 text-3xl";
                  cardPaddingClass = "p-6 px-4";
                } else if (totalItems === 6) {
                  avatarSizeClass = "w-28 h-28 md:w-32 md:h-32 xl:w-36 xl:h-36 text-2xl";
                  cardPaddingClass = "p-5 px-3";
                  tagPaddingClass = "px-4 py-1.5 text-base";
                  imgMarginClass = "mt-5 mb-4";
                  evtTitleClass = "text-base md:text-lg";
                } else if (totalItems === 7) {
                  avatarSizeClass = "w-24 h-24 md:w-28 md:h-28 xl:w-32 xl:h-32 text-xl";
                  cardPaddingClass = "p-4 px-2";
                  nameTextClass = "text-lg leading-tight mb-1";
                  deptTextClass = "text-xs";
                  tagPaddingClass = "px-3 py-1 text-sm md:text-base";
                  imgMarginClass = "mt-4 mb-3";
                  tagIconSize = 16;
                  evtPaddingClass = "p-2 md:p-3";
                  evtTitleClass = "text-sm md:text-base";
                } else {
                  avatarSizeClass = "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 xl:w-28 xl:h-28 text-lg";
                  cardPaddingClass = "p-3 px-1";
                  nameTextClass = "text-base leading-tight mb-1";
                  deptTextClass = "text-[10px] md:text-xs";
                  tagPaddingClass = "px-2 py-1 text-xs md:text-sm";
                  imgMarginClass = "mt-4 mb-2";
                  tagIconSize = 14;
                  evtPaddingClass = "p-2";
                  evtTitleClass = "text-xs md:text-sm";
                }
              }

              return (
                <div
                  className={isDense ? `grid gap-2 lg:gap-4 xl:gap-5` : `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}
                  style={isDense ? { gridTemplateColumns: `repeat(${totalItems}, minmax(0, 1fr))` } : {}}
                >
                  {monthBirthdays.map(emp => {
                    const isToday = emp.date === getTodayFormatted();
                    return (
                      <div
                        key={emp.id}
                        className={`relative ${cardPaddingClass} rounded-2xl flex flex-col items-center text-center transition-all duration-300 overflow-hidden group h-full ${isToday
                          ? 'bg-gradient-to-br from-pmf-cyan/20 to-pmf-navy/10 border-2 border-pmf-cyan/50 shadow-[0_0_25px_-5px_rgba(0,177,235,0.3)] animate-glow'
                          : 'bg-white/70 border border-pmf-navy/10 hover:bg-white/90 hover:border-pmf-cyan/30 hover:shadow-md'
                          }`}
                      >
                        {/* Day Tag */}
                        <div className={`absolute top-0 right-0 rounded-bl-2xl ${tagPaddingClass} font-black tracking-wider ${isToday
                          ? 'bg-pmf-cyan text-white shadow-md'
                          : 'bg-pmf-light-card text-pmf-navy border-b border-l border-pmf-navy/10'
                          }`}>
                          Dia {parseInt(emp.date.split('-')[1])}
                        </div>

                        <div className={`${imgMarginClass} relative`}>
                          {emp.photo ? (
                            <img
                              src={emp.photo}
                              alt={emp.name}
                              className={`${avatarSizeClass} rounded-full object-cover border-4 transition-colors duration-300 ${isToday ? 'border-pmf-cyan shadow-[0_0_15px_rgba(0,177,235,0.3)]' : 'border-pmf-navy/20 group-hover:border-pmf-cyan/50'
                                }`}
                            />
                          ) : (
                            <div className={`${avatarSizeClass} flex items-center justify-center rounded-full border-4 font-bold transition-colors duration-300 ${isToday
                              ? 'border-pmf-cyan bg-pmf-cyan/15 text-pmf-navy shadow-[0_0_15px_rgba(0,177,235,0.3)]'
                              : 'border-pmf-navy/20 bg-pmf-light-surface text-pmf-navy group-hover:border-pmf-cyan/50'
                              }`}>
                              {getInitials(emp.name, emp.surname)}
                            </div>
                          )}

                          {isToday && (
                            <div className={`absolute -bottom-2 -right-2 bg-pmf-cyan rounded-full ${tagIconSize < 16 ? 'p-1' : 'p-2'} border-2 xl:border-4 border-white shadow-md`}>
                              <Star size={tagIconSize} className="text-white fill-current animate-pulse" />
                            </div>
                          )}
                        </div>

                        <div className="mt-auto flex flex-col items-center justify-end w-full">
                          <h4 className={`${nameTextClass} font-bold text-pmf-navy break-words line-clamp-2`}>
                            {emp.name} {emp.surname}
                          </h4>
                          <p className={`${deptTextClass} tracking-widest uppercase font-semibold ${isToday ? 'text-pmf-cyan-dark' : 'text-pmf-navy/50'}`}>
                            {emp.department}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Eventos Card */}
                  {monthEvents.length > 0 && (
                    <div className={`relative ${cardPaddingClass} rounded-2xl flex flex-col transition-all duration-300 overflow-hidden bg-white border border-pmf-navy/10 hover:shadow-md col-span-1 h-full min-h-[200px]`}>
                      <div className={`absolute top-0 right-0 rounded-bl-2xl ${tagPaddingClass} font-black tracking-wider bg-pmf-navy text-white shadow-md z-10 flex items-center gap-1 md:gap-2`}>
                        <Calendar size={tagIconSize} />
                        <span className={isDense && totalItems > 6 ? "hidden xl:inline" : ""}>Eventos</span>
                      </div>
                      <div className={`flex-1 flex flex-col justify-start ${isDense ? 'mt-6 md:mt-8' : 'mt-8'}`}>
                        <ul className="flex flex-col gap-2 md:gap-3">
                          {monthEvents.map(evt => {
                            const isToday = evt.date === getTodayFormatted();
                            const day = parseInt(evt.date.split('-')[1]);
                            return (
                              <li key={evt.id} className={`flex items-center justify-between ${evtPaddingClass} rounded-xl border transition-all ${isToday ? 'bg-pmf-cyan/20 border-pmf-cyan/50 text-pmf-navy shadow-sm' : 'bg-pmf-light-surface border-pmf-navy/10 text-pmf-navy/80 hover:bg-white hover:border-pmf-cyan/30'}`}>
                                <span className={`font-bold ${isToday ? 'text-pmf-navy' : 'text-pmf-navy/80'} ${evtTitleClass} truncate mr-2`}>{evt.title}</span>
                                <span className={`text-xs md:text-sm font-black whitespace-nowrap ${isToday ? 'text-pmf-cyan-dark' : 'text-pmf-navy/40'}`}>Dia {day}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()

          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <Calendar size={80} className="text-pmf-navy/20 mb-6" />
              <h4 className="text-3xl text-pmf-navy/40 font-medium">Nenhum aniversariante ou evento neste mês.</h4>
            </div>
          )}
        </div>

        {/* Footer with PMF branding */}
        <footer className="text-center py-3 text-pmf-navy/30 text-sm tracking-widest uppercase">
          Prefeitura de Florianópolis — Governo Eletrônico
        </footer>
      </div>
    </div>
  );
};

export default BirthdayDashboard;
