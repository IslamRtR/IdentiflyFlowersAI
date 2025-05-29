// components/PlantInfo.tsx
import { FaLeaf, FaSun, FaTint, FaSeedling, FaGlobeAmericas, FaFlask } from 'react-icons/fa';

interface PlantInfoProps {
  info: {
    commonName: string;
    scientificName: string;
    sunlight: string;
    water: string;
    growthRate: string;
    origin: string;
    description: string;
  };
}

export default function PlantInfo({ info }: PlantInfoProps) {
  const infoCards = [
    { icon: FaLeaf, title: 'Жалпы атауы', value: info.commonName },
    { icon: FaFlask, title: 'Ғылыми атауы', value: info.scientificName },
    { icon: FaSun, title: 'Күн сәулесі', value: info.sunlight },
    { icon: FaTint, title: 'Су қажеттілігі', value: info.water },
    { icon: FaSeedling, title: 'Өсу қарқыны', value: info.growthRate },
    { icon: FaGlobeAmericas, title: 'Шығу тегі', value: info.origin },
  ];

  return (
    <div className="mt-8 fade-in">
      <h2 className="text-3xl font-bold text-[var(--text-heading)] mb-6 tracking-tight">
        Өсімдік туралы ақпарат
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {infoCards.map((card, index) => (
          <div
            key={index}
            className="card bg-[var(--bg-card)] rounded-xl p-5 hover:bg-[var(--bg-card-hover)] hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-3">
              <card.icon className="text-[var(--text-primary)] text-2xl mr-3 flex-shrink-0" />
              <h3 className="font-semibold text-lg text-[var(--text-heading)]">{card.title}</h3>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 card bg-[var(--bg-card)] rounded-xl p-5 hover:bg-[var(--bg-card-hover)] hover:shadow-xl transition-all duration-300">
        <h3 className="font-semibold text-lg text-[var(--text-heading)] mb-3">Сипаттама</h3>
        <p className="text-[var(--text-secondary)] leading-relaxed">{info.description}</p>
      </div>
    </div>
  );
}
