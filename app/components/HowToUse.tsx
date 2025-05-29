// components/HowToUse.tsx
import { FaUpload, FaLeaf, FaInfoCircle, FaHistory } from 'react-icons/fa';

export default function HowToUse() {
  const usefulFlowers = [
    {
      icon: FaLeaf,
      name: 'Ромашка',
      description: 'Ромашка тыныштандыратын қасиеттерімен танымал және шай ретінде қолданылады.',
    },
    {
      icon: FaLeaf,
      name: 'Лаванда',
      description: 'Лаванда хош иісімен стрессті азайтады және ұйқыны жақсартады.',
    },
    {
      icon: FaLeaf,
      name: 'Түймедақ',
      description: 'Түймедақ ас қорытуға көмектеседі және теріні емдеуге пайдаланылады.',
    },
  ];

  const historyItems = [
    {
      icon: FaHistory,
      title: 'Ботаниканың бастауы',
      description: 'Өсімдіктерді анықтау ежелгі дәуірден басталды, адамдар емдік өсімдіктерді зерттеді.',
    },
    {
      icon: FaHistory,
      title: 'AI технологиясы',
      description: 'XXI ғасырда AI өсімдіктерді жылдам әрі дәл анықтауға мүмкіндік берді.',
    },
    {
      icon: FaHistory,
      title: 'PlantID-нің пайда болуы',
      description: 'PlantID 2024 жылы табиғат әуесқойларына көмектесу үшін құрылды.',
    },
  ];

  return (
    <div className="mt-16 card bg-[var(--bg-card)] p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 fade-in">
      <h2 className="text-3xl font-bold text-[var(--text-heading)] mb-6 tracking-tight">
        PlantID қалай пайдалану керек
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start p-4 bg-[var(--bg-secondary)] rounded-xl hover:bg-[var(--bg-card-hover)] transition-all duration-300">
          <FaUpload className="text-[var(--text-primary)] text-3xl mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-xl text-[var(--text-heading)] mb-2">Суретті жүктеу</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Анықтағыңыз келетін өсімдіктің анық суретін түсіріп, жүктеңіз.
            </p>
          </div>
        </div>
        <div className="flex items-start p-4 bg-[var(--bg-secondary)] rounded-xl hover:bg-[var(--bg-card-hover)] transition-all duration-300">
          <FaLeaf className="text-[var(--text-primary)] text-3xl mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-xl text-[var(--text-heading)] mb-2">Анықтау</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Біздің AI суретті талдап, өсімдіктің атауын және мәліметтерін береді.
            </p>
          </div>
        </div>
        <div className="flex items-start p-4 bg-[var(--bg-secondary)] rounded-xl hover:bg-[var(--bg-card-hover)] transition-all duration-300">
          <FaInfoCircle className="text-[var(--text-primary)] text-3xl mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-xl text-[var(--text-heading)] mb-2">Қосымша білу</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Анықталған өсімдік туралы күтім бойынша кеңестер, шығу тегі және қызықты фактілерді ашыңыз.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-[var(--text-heading)] mb-6 tracking-tight">
          Пайдалы гүлдер
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {usefulFlowers.map((flower, index) => (
            <div
              key={index}
              className="flex items-start p-4 bg-[var(--bg-secondary)] rounded-xl hover:bg-[var(--bg-card-hover)] transition-all duration-300"
            >
              <flower.icon className="text-[var(--text-primary)] text-3xl mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-xl text-[var(--text-heading)] mb-2">{flower.name}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{flower.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
