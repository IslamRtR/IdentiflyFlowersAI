// app/page.tsx
'use client';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import PlantInfo from './components/PlantInfo';
import Header from './components/Header';
import HowToUse from './components/HowToUse';
import Image from 'next/image';

interface KeyValue {
  key: string;
  commonName: string;
  scientificName: string;
  sunlight: string;
  water: string;
  growthRate: string;
  origin: string;
  description: string;
}

export default function Home() {
  const [plantInfo, setPlantInfo] = useState<KeyValue | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center p-6 fade-in">
      <Header />
      <main className="max-w-5xl w-full p-8 mb-12">
        <ImageUpload setPlantInfo={setPlantInfo} setUploadedImage={setUploadedImage} />
        <HowToUse />
        <SpeedInsights />
        {uploadedImage && (
          <div className="mt-8 card bg-[var(--bg-card)] rounded-xl p-6 hover:shadow-xl transition-all duration-300 fade-in">
            <h2 className="text-3xl font-bold text-[var(--text-heading)] mb-6 tracking-tight">
              Жүктелген сурет
            </h2>
            <Image
              src={uploadedImage}
              alt="Жүктелген өсімдік"
              layout="responsive"
              width={500}
              height={300}
              className="w-full max-w-md mx-auto rounded-xl shadow-md"
            />
          </div>
        )}
        {plantInfo && <PlantInfo info={plantInfo} />}
      </main>
    </div>
  );
}
