import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, PartyPopper, Cake, Star } from 'lucide-react';

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
  const today = getTodayFormatted();

  return [
    {
      id: 1,
      name: 'Rubens',
      surname: '',
      photo: '',
      birthday: '09-23',
      department: 'Software',
    },
    {
      id: 2,
      name: 'Guilherme',
      surname: 'Vieira',
      birthday: '04-09',
      department: 'Software',
    },
    {
      id: 3,
      name: 'Geninho',
      surname: '',
      birthday: '02-26',
      department: 'Software',
    },
    {
      id: 4,
      name: 'Alex',
      surname: '',
      birthday: '01-04',
      department: 'Software',
    },
    {
      id: 5,
      name: 'Isabella',
      surname: '',
      birthday: '11-30',
      department: 'Software',
    },
    {
      id: 6,
      name: 'Fábio',
      surname: '',
      birthday: '01-08',
      department: 'Software',
    },
    {
      id: 7,
      name: 'Pedro',
      surname: 'Clark',
      birthday: '04-10',
      department: 'Software',
    },
    {
      id: 8,
      name: 'Deison',
      surname: '',
      birthday: '04-06',
      department: 'Infra',
    },
    {
      id: 9,
      name: 'Matheus',
      surname: 'Henrique',
      birthday: '01-20',
      department: 'Infra',
    },
    {
      id: 10,
      name: 'Pedro',
      surname: '',
      birthday: '09-09',
      department: 'Infra',
    },
    {
      id: 11,
      name: 'Matheus',
      surname: 'Martins',
      birthday: '11-22',
      department: 'Infra',
    },
    {
      id: 12,
      name: 'Gui',
      surname: 'Souza',
      birthday: '02-10',
      department: 'Infra',
    },
    {
      id: 13,
      name: 'Márcio',
      surname: '',
      birthday: '08-27',
      department: 'Infra',
    },
    {
      id: 14,
      name: 'João Pedro',
      surname: '',
      photo: '',
      birthday: '05-14',
      department: 'Infra',
    },
    {
      id: 15,
      name: 'Cássio',
      surname: '',
      photo: '',
      birthday: '12-04',
      department: 'Analista',
    },
    {
      id: 16,
      name: 'Alexandre',
      surname: '',
      photo: '',
      birthday: '05-13',
      department: 'Analista',
    },
    {
      id: 17,
      name: 'Lucas',
      surname: '',
      photo: '',
      birthday: '03-14',
      department: 'Infra',
    },
    {
      id: 18,
      name: 'Rian',
      surname: '',
      photo: '',
      birthday: '01-06',
      department: 'Infra',
    }
  ];
};

const BirthdayDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [birthdayPeeps, setBirthdayPeeps] = useState([]);
  const [currentCelebration, setCurrentCelebration] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = generateMockEmployees();

      const todayStr = getTodayFormatted();
      const sortedByNext = [...data].sort((a, b) => {
        const aIsNextYear = a.birthday < todayStr;
        const bIsNextYear = b.birthday < todayStr;

        if (aIsNextYear !== bIsNextYear) {
          return aIsNextYear ? 1 : -1;
        }

        return a.birthday.localeCompare(b.birthday);
      });

      setEmployees(sortedByNext);

      const today = getTodayFormatted();
      const todaysBirthdays = data.filter(emp => emp.birthday === today);

      setBirthdayPeeps(todaysBirthdays);

      if (todaysBirthdays.length > 0) {
        // If there are multiple, cycle through them. For now, pick the first.
        setCurrentCelebration(todaysBirthdays[0]);
      }
    };

    fetchData();
  }, []);

  // Continuous Confetti effect when there's a celebration
  useEffect(() => {
    if (!currentCelebration) return;

    const duration = 15 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      // launch a few confetti from the left edge
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
      });
      // and launch a few from the right edge
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    const intervalId = setInterval(frame, 15000); // restart confetti every 15s

    return () => clearInterval(intervalId);
  }, [currentCelebration]);

  const formatDate = (dateStr) => {
    const [month, day] = dateStr.split('-');
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${day} de ${months[parseInt(month) - 1]}`;
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-slate-900 overflow-hidden flex flex-col font-sans">

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-rose-600/20 blur-[120px]"></div>
        <div className="absolute top-[30%] -right-[20%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[100px]"></div>
      </div>

      <div className="relative z-10 p-10 flex-1 flex flex-col h-full">
        {/* Header */}
        <header className="flex justify-between items-center mb-10 glass-panel rounded-3xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
              <PartyPopper size={36} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                Mural de Aniversariantes - EGOV
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xl text-indigo-300 font-medium tracking-widest uppercase">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 gap-10 overflow-hidden relative">

          {/* Main Overlay per Celebration */}
          {currentCelebration ? (
            <div className="flex-1 glass-panel rounded-[3rem] border border-indigo-500/30 overflow-hidden flex flex-col items-center justify-center relative p-12 shadow-[0_0_80px_-15px_rgba(99,102,241,0.3)] bg-gradient-to-b from-slate-800/80 to-slate-900/90">
              <div className="absolute top-10 right-10 text-rose-400 animate-bounce-slow">
                <Cake size={64} />
              </div>
              <div className="absolute bottom-20 left-20 text-yellow-400 opacity-50 animate-pulse-slow">
                <Star size={48} />
              </div>
              <div className="absolute top-32 left-32 text-cyan-400 opacity-60 animate-pulse-slow font-bold delay-150">
                <PartyPopper size={56} />
              </div>

              <div className="relative mb-12 group">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 rounded-full blur-2xl opacity-70 animate-pulse-slow mix-blend-screen scale-110"></div>
                {currentCelebration.photo ? (
                  <img
                    src={currentCelebration.photo}
                    alt={currentCelebration.name}
                    className="relative w-80 h-80 object-cover rounded-full border-[6px] border-slate-800 shadow-2xl z-10 ring-4 ring-indigo-500/50"
                  />
                ) : (
                  <div className="relative w-80 h-80 flex items-center justify-center rounded-full border-[6px] border-slate-800 bg-slate-700 shadow-2xl z-10 ring-4 ring-indigo-500/50">
                    <span className="text-8xl font-bold text-slate-300 tracking-wider">
                      {getInitials(currentCelebration.name, currentCelebration.surname)}
                    </span>
                  </div>
                )}
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-rose-500 to-orange-400 p-4 rounded-full shadow-xl z-20 border-4 border-slate-900 transform rotate-12">
                  <Cake size={40} className="text-white" />
                </div>
              </div>

              <div className="text-center space-y-4 z-10 w-full max-w-4xl mx-auto">
                <h2 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-rose-300 tracking-tight leading-tight">
                  Feliz Aniversário,<br /> {currentCelebration.name} {currentCelebration.surname}!
                </h2>
                <p className="text-3xl text-slate-300 font-light tracking-wide mt-6">
                  Que o seu dia seja repleto de alegria e muito sucesso.
                </p>
                <div className="mt-8 inline-flex items-center gap-3 bg-slate-800/60 rounded-full px-8 py-3 border border-slate-700">
                  <span className="text-indigo-400 uppercase tracking-widest text-lg font-bold">
                    {currentCelebration.department}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 glass-panel rounded-3xl p-12 flex flex-col items-center justify-center text-center">
              <Calendar size={80} className="text-slate-600 mb-6" />
              <h2 className="text-4xl text-slate-400 font-bold">Nenhum aniversariante hoje</h2>
              <p className="text-xl text-slate-500 mt-4">Aguardando as próximas comemorações!</p>
            </div>
          )}

          {/* Sidebar list of all employees/upcoming birthdays */}
          <div className="w-[450px] glass-panel rounded-3xl p-8 flex flex-col hide-scrollbar overflow-y-auto z-10 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-200 mb-8 flex items-center gap-3 pb-4 border-b border-slate-700/50">
              <Calendar className="text-indigo-400" /> Próximos Aniversários
            </h3>

            <div className="flex flex-col gap-5">
              {employees.map(emp => {
                const isToday = emp.birthday === getTodayFormatted();
                return (
                  <div
                    key={emp.id}
                    className={`flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 ${isToday
                      ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border border-indigo-500/50 shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)] transform scale-[1.02]'
                      : 'bg-slate-800/40 border border-slate-700/30 hover:bg-slate-800/80 hover:border-slate-600/50'
                      }`}
                  >
                    <div className="relative">
                      {emp.photo ? (
                        <img
                          src={emp.photo}
                          alt={emp.name}
                          className={`w-16 h-16 rounded-full object-cover border-2 ${isToday ? 'border-rose-400' : 'border-slate-600'}`}
                        />
                      ) : (
                        <div className={`w-16 h-16 flex items-center justify-center rounded-full border-2 ${isToday ? 'border-rose-400 bg-rose-500/20 text-rose-300' : 'border-slate-500 bg-slate-700 text-slate-300'} font-bold text-xl`}>
                          {getInitials(emp.name, emp.surname)}
                        </div>
                      )}
                      {isToday && (
                        <div className="absolute -top-2 -right-2 bg-rose-500 rounded-full p-1 border-2 border-slate-900">
                          <Star size={12} className="text-white fill-current" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className={`text-xl font-bold ${isToday ? 'text-white' : 'text-slate-200'}`}>
                        {emp.name} {emp.surname}
                      </h4>
                      <p className="text-md text-slate-400 font-medium">
                        {emp.department}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className={`text-sm tracking-widest uppercase font-bold ${isToday ? 'text-rose-400' : 'text-indigo-400'}`}>
                        {isToday ? 'Hoje!' : formatDate(emp.birthday)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BirthdayDashboard;
