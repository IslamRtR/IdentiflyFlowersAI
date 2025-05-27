export default function Footer() {
    return (
      <footer className="bg-black bg-opacity-85 text-white p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-[20rem] sm:gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">PlantID туралы</h3>
            <p>PlantID - өсімдіктерді анықтау және олар туралы білу үшін сіздің басты ресурсыңыз. Біздің AI технологиясымен жұмыс істейтін құрал табиғат әуесқойларына флора әлемін ашуға көмектеседі.</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>© 2024 PlantID. Барлық құқықтар қорғалған.</p>
        </div>
      </footer>
    )
}
