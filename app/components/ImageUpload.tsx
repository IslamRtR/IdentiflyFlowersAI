import { useState, ChangeEvent, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction } from 'react';

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

interface ImageUploadProps {
  setPlantInfo: Dispatch<SetStateAction<KeyValue | null>>;
  setUploadedImage: Dispatch<SetStateAction<string | null>>;
}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY as string;

if (!apiKey) {
  throw new Error('API кілті жоқ. .env.local файлын тексеріңіз.');
}
const genAI = new GoogleGenerativeAI(apiKey);

function extractJSON(str: string): KeyValue | null {
  try {
    return JSON.parse(str);
  } catch (e) {}
  try {
    const match = str.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
  } catch (e) {}
  try {
    const lines = str.split('\n');
    const obj: KeyValue = {
      key: '',
      commonName: '',
      scientificName: '',
      sunlight: '',
      water: '',
      growthRate: '',
      origin: '',
      description: '',
    };
    lines.forEach(line => {
      const [key, value] = line.split(':').map(s => s.trim());
      if (key && value) {
        (obj as any)[key] = value;
      }
    });
    return obj;
  } catch (e) {}
  console.error('Жауаптан жарамды JSON немесе кілт-мән жұптарын шығарып алу мүмкін болмады');
  return null;
}

export default function ImageUpload({ setPlantInfo, setUploadedImage }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    try {
      const base64Image = await readFileAsDataURL(file);
      setUploadedImage(base64Image);
      await processImage(base64Image);
    } catch (error) {
      console.error('Өсімдікті анықтау қатесі:', error);
      setError('Суретті өңдеу кезінде қате пайда болды. Қайтадан көріңіз.');
      handleProcessingError();
    } finally {
      setLoading(false);
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processImage = async (base64Image: string) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Сіз сарапшы ботаниксіз. Бұл өсімдік суретін талдап, тек осы кілттерді пайдаланып JSON форматында жауап беріңіз (жауап қазақ тілінде болуы керек):
{
  "commonName": "",
  "scientificName": "",
  "description": "",
  "origin": "",
  "sunlight": "",
  "water": "",
  "growthRate": ""
}`;
    try {
      const result = await model.generateContent([
        prompt,
        { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/jpeg' } },
      ]);
      const response = await result.response;
      const text = await response.text();
      const parsedInfo = extractJSON(text);
      if (parsedInfo) {
        setPlantInfo(parsedInfo);
      } else {
        console.error('Өсімдік ақпаратын талдау сәтсіз аяқталды. Шикі мәтін:', text);
        throw new Error('Өсімдік ақпаратын талдау сәтсіз аяқталды');
      }
    } catch (error) {
      console.error('processImage функциясындағы қате:', error);
      setError('AI өңдеу кезінде қате пайда болды. Қайтадан көріңіз.');
      handleProcessingError();
    }
  };

  const handleProcessingError = () => {
    setPlantInfo({
      key: '',
      commonName: 'Белгісіз',
      scientificName: 'Жоқ',
      description: 'Өсімдік ақпаратын шығарып алу мүмкін болмады. Қайтадан көріңіз.',
      origin: 'Жоқ',
      sunlight: 'Жоқ',
      water: 'Жоқ',
      growthRate: 'Жоқ',
    });
  };

  const handleCameraCapture = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Камераға қолдау көрсетілмейді немесе рұқсат жоқ.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Wait for user to capture the image (manually triggered below)
    } catch (err) {
      console.error('Камераға қол жеткізу қатесі:', err);
      setError('Камераға рұқсат берілмеді немесе қате пайда болды. Рұқсатты тексеріңіз.');
      setLoading(false);
    }
  };

  const captureImageFromCamera = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64Image = canvas.toDataURL('image/jpeg');

    // Stop the camera stream
    if (video.srcObject) {
      (video.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }

    setUploadedImage(base64Image);
    processImage(base64Image).finally(() => setLoading(false));
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col sm:flex-row gap-6 p-6 fade-in">
      <label
        htmlFor="upload-input"
        className={`relative flex items-center justify-center w-full py-5 px-10 card text-black rounded-3xl cursor-pointer transition-all duration-400 ease-out hover:bg-gray-100 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50 active:scale-95 ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        aria-disabled={loading}
      >
        {loading ? (
          <svg
            className="animate-spin h-7 w-7 mr-4 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <FontAwesomeIcon icon={faUpload} className="mr-4 text-2xl text-gray-900" />
        )}
        <span className="font-semibold text-lg tracking-wide">
          {loading ? 'Сурет өңделуде...' : 'Суретті жүктеу'}
        </span>
      </label>
      <input
        id="upload-input"
        type="file"
        accept="image/*"
        onChange={handleImageInput}
        className="hidden"
        disabled={loading}
      />

      <div className="relative flex flex-col items-center w-full">
        <button
          onClick={handleCameraCapture}
          className={`relative flex items-center justify-center w-full py-5 px-10 card text-black rounded-3xl cursor-pointer transition-all duration-400 ease-out hover:bg-gray-100 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50 active:scale-95 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-7 w-7 mr-4 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <FontAwesomeIcon icon={faCamera} className="mr-4 text-2xl text-gray-900" />
          )}
          <span className="font-semibold text-lg tracking-wide">
            {loading ? 'Сурет өңделуде...' : 'Фото түсіру'}
          </span>
        </button>
        {videoRef.current && (
          <div className="mt-4">
            <video
              ref={videoRef}
              className="w-full max-w-md rounded-xl shadow-md"
              style={{ display: videoRef.current?.srcObject ? 'block' : 'none' }}
            />
            <canvas ref={canvasRef} className="hidden" />
            <button
              onClick={captureImageFromCamera}
              className={`mt-4 w-full py-3 px-6 card text-black rounded-xl transition-all duration-300 hover:bg-gray-100 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50 active:scale-95 ${
                loading || !videoRef.current?.srcObject ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={loading || !videoRef.current?.srcObject}
            >
              Суретке түсіру
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
