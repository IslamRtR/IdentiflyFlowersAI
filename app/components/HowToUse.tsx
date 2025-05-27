import { FaUpload, FaLeaf, FaInfoCircle } from 'react-icons/fa'

export default function HowToUse() {
  return (
    <div className="mt-16 bg-[#d6ffe2] p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-green-800 mb-4">PlantID қалай пайдалану керек</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-start">
          <FaUpload className="text-green-600 text-2xl mr-3 mt-1" />
          <div>
            <h3 className="font-semibold text-lg">Суретті жүктеу</h3>
            <p>Анықтағыңыз келетін өсімдіктің анық суретін түсіріп, жүктеңіз.</p>
          </div>
        </div>
        <div className="flex items-start">
          <FaLeaf className="text-green-600 text-2xl mr-3 mt-1" />
          <div>
            <h3 className="font-semibold text-lg">Анықтау</h3>
            <p>Біздің AI суретті талдап, өсімдіктің атауын және мәліметтерін береді.</p>
          </div>
        </div>
        <div className="flex items-start">
          <FaInfoCircle className="text-green-600 text-2xl mr-3 mt-1" />
          <div>
            <h3 className="font-semibold text-lg">Қосымша білу</h3>
            <p>Анықталған өсімдік туралы күтім бойынша кеңестер, шығу тегі және қызықты фактілерді ашыңыз.</p>
          </div>
        </div>
      </div>
    </div>
  )
}