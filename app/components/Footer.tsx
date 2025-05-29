// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-[var(--footer-bg)] text-[var(--footer-text)] p-8 w-full fade-in">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32">
        <div>
          <h3 className="text-xl font-bold text-[var(--footer-heading)] mb-4 tracking-tight">
            PlantID туралы
          </h3>
          <p className="text-[var(--footer-text)] leading-relaxed">
            PlantID - өсімдіктерді анықтау және олар туралы білу үшін сіздің басты ресурсыңыз. Біздің AI технологиясымен жұмыс істейтін құрал табиғат әуесқойларына флора әлемін ашуға көмектеседі.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-[var(--footer-heading)] mb-4 tracking-tight">
            Бізбен байланыс
          </h3>
          <p className="text-[var(--footer-text)] leading-relaxed">
            Электронды пошта: gabbasislam59@gmail.com
          </p>
          <p className="text-[var(--footer-text)] leading-relaxed">
            Телефон: +77082084757
          </p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-[var(--footer-text)] text-sm">
          © 2024 PlantID. Барлық құқықтар қорғалған.
        </p>
      </div>
    </footer>
  );
}
