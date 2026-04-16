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
const generateMockEmployees = () => {
  return [
    { id: 1, name: 'Rubens', surname: '', photo: 'images/rubens.jpeg', birthday: '09-23', department: 'Software' },
    { id: 2, name: 'Guilherme', surname: 'Vieira', photo: 'images/guiVieira.png', birthday: '04-09', department: 'Software' },
    { id: 3, name: 'Geninho', surname: '', birthday: '02-26', department: 'Software' },
    { id: 4, name: 'Alex', surname: '', birthday: '01-04', department: 'Software' },
    { id: 5, name: 'Isabella', surname: '', birthday: '11-30', department: 'Software' },
    { id: 6, name: 'Fábio', surname: '', birthday: '01-08', department: 'Software' },
    { id: 7, name: 'Pedro', surname: 'Freitas', photo: 'images/pedroFreitas.png', birthday: '04-10', department: 'Software' },
    { id: 8, name: 'Deison', surname: '', photo: 'images/deison.png', birthday: '04-06', department: 'Infra' },
    { id: 9, name: 'Matheus', surname: 'Henrique', birthday: '01-20', department: 'Infra' },
    { id: 10, name: 'Pedro', surname: 'Guimarães', birthday: '09-09', department: 'Infra' },
    { id: 11, name: 'Matheus', surname: 'Martins', birthday: '11-22', department: 'Infra' },
    { id: 12, name: 'Gui', surname: 'Souza', birthday: '02-10', department: 'Infra' },
    { id: 13, name: 'Márcio', surname: '', birthday: '08-27', department: 'Infra' },
    { id: 14, name: 'João Pedro', surname: '', photo: '', birthday: '05-14', department: 'Infra' },
    { id: 15, name: 'Cássio', surname: '', photo: '', birthday: '12-04', department: 'Analista' },
    { id: 16, name: 'Alexandre', surname: '', photo: '', birthday: '05-13', department: 'Analista' },
    { id: 17, name: 'Lucas', surname: '', photo: '', birthday: '03-14', department: 'Infra' },
    { id: 18, name: 'Rian', surname: '', photo: '', birthday: '01-06', department: 'Infra' },
    { id: 19, name: 'Samurai', surname: '', photo: '', birthday: '07-14', department: 'Infra' },
  ];
};

const BirthdayDashboard = () => {
  const [monthBirthdays, setMonthBirthdays] = useState([]);
  const [birthdayPeeps, setBirthdayPeeps] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = generateMockEmployees();

      const todayStr = getTodayFormatted();
      const currentMonth = todayStr.split('-')[0];

      // Filter employees with birthday this month, sort by day
      const monthData = data
        .filter(emp => emp.birthday.split('-')[0] === currentMonth)
        .sort((a, b) => a.birthday.localeCompare(b.birthday));

      setMonthBirthdays(monthData);

      // Today's birthday people
      const todaysBirthdays = monthData.filter(emp => emp.birthday === todayStr);
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
                Aniversariantes de {currentMonthName}
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
              Todos de {currentMonthName}
            </h3>
            <span className="ml-auto text-pmf-navy/50 text-lg font-medium">
              {monthBirthdays.length} {monthBirthdays.length === 1 ? 'aniversariante' : 'aniversariantes'}
            </span>
          </div>

          {monthBirthdays.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {monthBirthdays.map(emp => {
                const isToday = emp.birthday === getTodayFormatted();
                return (
                  <div
                    key={emp.id}
                    className={`relative p-8 px-6 rounded-2xl flex flex-col items-center text-center transition-all duration-300 overflow-hidden group ${isToday
                      ? 'bg-gradient-to-br from-pmf-cyan/20 to-pmf-navy/10 border-2 border-pmf-cyan/50 shadow-[0_0_25px_-5px_rgba(0,177,235,0.3)] animate-glow'
                      : 'bg-white/70 border border-pmf-navy/10 hover:bg-white/90 hover:border-pmf-cyan/30 hover:shadow-md'
                      }`}
                  >
                    {/* Day Tag */}
                    <div className={`absolute top-0 right-0 rounded-bl-2xl px-5 py-2 font-black text-lg tracking-wider ${isToday
                      ? 'bg-pmf-cyan text-white shadow-md'
                      : 'bg-pmf-light-card text-pmf-navy border-b border-l border-pmf-navy/10'
                      }`}>
                      Dia {parseInt(emp.birthday.split('-')[1])}
                    </div>

                    <div className="mt-6 mb-5 relative">
                      {emp.photo ? (
                        <img
                          src={emp.photo}
                          alt={emp.name}
                          className={`w-48 h-48 rounded-full object-cover border-4 transition-colors duration-300 ${isToday ? 'border-pmf-cyan shadow-[0_0_15px_rgba(0,177,235,0.3)]' : 'border-pmf-navy/20 group-hover:border-pmf-cyan/50'
                            }`}
                        />
                      ) : (
                        <div className={`w-48 h-48 flex items-center justify-center rounded-full border-4 font-bold text-4xl transition-colors duration-300 ${isToday
                          ? 'border-pmf-cyan bg-pmf-cyan/15 text-pmf-navy shadow-[0_0_15px_rgba(0,177,235,0.3)]'
                          : 'border-pmf-navy/20 bg-pmf-light-surface text-pmf-navy group-hover:border-pmf-cyan/50'
                          }`}>
                          {getInitials(emp.name, emp.surname)}
                        </div>
                      )}

                      {isToday && (
                        <div className="absolute -bottom-2 -right-2 bg-pmf-cyan rounded-full p-2 border-4 border-white shadow-md">
                          <Star size={18} className="text-white fill-current animate-pulse" />
                        </div>
                      )}
                    </div>

                    <h4 className={`text-xl font-bold mb-1 ${isToday ? 'text-pmf-navy' : 'text-pmf-navy'}`}>
                      {emp.name} {emp.surname}
                    </h4>
                    <p className={`text-sm tracking-widest uppercase font-semibold ${isToday ? 'text-pmf-cyan-dark' : 'text-pmf-navy/50'}`}>
                      {emp.department}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <Calendar size={80} className="text-pmf-navy/20 mb-6" />
              <h4 className="text-3xl text-pmf-navy/40 font-medium">Nenhum aniversariante neste mês.</h4>
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
