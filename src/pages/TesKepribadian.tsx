
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const personalityQuestions = [
  {
    id: 1,
    question: "Saya lebih suka bekerja sendiri daripada dalam tim",
    type: "Introvert vs Ekstrovert",
    dimension: "E"
  },
  {
    id: 2,
    question: "Saya sering membuat keputusan berdasarkan perasaan",
    type: "Thinking vs Feeling",
    dimension: "F"
  },
  {
    id: 3,
    question: "Saya suka merencanakan segala sesuatu dengan detail",
    type: "Judging vs Perceiving",
    dimension: "J"
  },
  {
    id: 4,
    question: "Saya lebih tertarik pada fakta daripada kemungkinan",
    type: "Sensing vs Intuition",
    dimension: "S"
  },
  {
    id: 5,
    question: "Saya merasa nyaman menjadi pusat perhatian",
    type: "Introvert vs Ekstrovert",
    dimension: "E"
  },
  {
    id: 6,
    question: "Saya selalu mempertimbangkan perasaan orang lain saat mengambil keputusan",
    type: "Thinking vs Feeling",
    dimension: "F"
  },
  {
    id: 7,
    question: "Saya suka mengikuti jadwal yang sudah ditentukan",
    type: "Judging vs Perceiving",
    dimension: "J"
  },
  {
    id: 8,
    question: "Saya lebih suka hal-hal yang praktis dan nyata",
    type: "Sensing vs Intuition",
    dimension: "S"
  }
];

const personalityTypes = {
  'ESTJ': { name: 'The Executive', description: 'Praktis, realistis, dan berorientasi pada fakta. Pemimpin alami yang mengorganisir proyek dan orang untuk mencapai tujuan.' },
  'ENFJ': { name: 'The Protagonist', description: 'Hangat, empatik, responsif, dan bertanggung jawab. Sangat attuned terhadap emosi dan kebutuhan orang lain.' },
  'ESFJ': { name: 'The Consul', description: 'Hangat, sadar akan orang lain, dan kooperatif. Ingin harmoni dalam lingkungan mereka dan bekerja dengan tekun untuk mencapainya.' },
  'ENTJ': { name: 'The Commander', description: 'Frank, decisive, pemimpin dalam aktivitas. Berkembang dalam perencanaan jangka panjang dan penetapan tujuan.' },
  'ISTJ': { name: 'The Logistician', description: 'Tenang, serius, sukses melalui ketekunan dan dapat diandalkan. Praktis, berorientasi pada fakta, realistis, dan bertanggung jawab.' },
  'ISFJ': { name: 'The Protector', description: 'Tenang, ramah, bertanggung jawab, dan teliti. Loyal, memperhatikan dan mengingat detail tentang orang yang penting bagi mereka.' },
  'INFJ': { name: 'The Advocate', description: 'Mencari makna dan hubungan dalam ide, hubungan, dan harta benda. Ingin memahami apa yang memotivasi orang.' },
  'INTJ': { name: 'The Architect', description: 'Memiliki imajinasi dan dorongan strategis untuk mengimplementasikan ide-ide mereka. Skeptis dan independen.' }
};

const TesKepribadian = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const progress = ((currentQuestion + 1) / personalityQuestions.length) * 100;

  const calculatePersonality = () => {
    const dimensionScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = personalityQuestions.find(q => q.id === parseInt(questionId));
      if (question) {
        let score = 0;
        switch (answer) {
          case 'sangat_tidak_setuju': score = 1; break;
          case 'tidak_setuju': score = 2; break;
          case 'netral': score = 3; break;
          case 'setuju': score = 4; break;
          case 'sangat_setuju': score = 5; break;
        }

        // Calculate dimension scores based on question type
        if (question.dimension === 'E') {
          if (score >= 4) dimensionScores.E += 1;
          else dimensionScores.I += 1;
        } else if (question.dimension === 'S') {
          if (score >= 4) dimensionScores.S += 1;
          else dimensionScores.N += 1;
        } else if (question.dimension === 'F') {
          if (score >= 4) dimensionScores.F += 1;
          else dimensionScores.T += 1;
        } else if (question.dimension === 'J') {
          if (score >= 4) dimensionScores.J += 1;
          else dimensionScores.P += 1;
        }
      }
    });

    // Determine personality type
    const type = 
      (dimensionScores.E > dimensionScores.I ? 'E' : 'I') +
      (dimensionScores.S > dimensionScores.N ? 'S' : 'N') +
      (dimensionScores.T > dimensionScores.F ? 'T' : 'F') +
      (dimensionScores.J > dimensionScores.P ? 'J' : 'P');

    const personalityInfo = personalityTypes[type as keyof typeof personalityTypes] || 
      { name: 'Unique Personality', description: 'Anda memiliki kombinasi kepribadian yang unik!' };

    return {
      type,
      ...personalityInfo,
      dimensionScores,
      strengths: getStrengths(type),
      careerSuggestions: getCareerSuggestions(type)
    };
  };

  const getStrengths = (type: string) => {
    const strengthsMap: Record<string, string[]> = {
      'ESTJ': ['Kepemimpinan yang kuat', 'Organisasi yang baik', 'Praktis dan efisien', 'Dapat diandalkan'],
      'ENFJ': ['Empati tinggi', 'Komunikasi yang baik', 'Inspiratif', 'Peduli terhadap orang lain'],
      'ESFJ': ['Harmonis', 'Perhatian terhadap detail', 'Kooperatif', 'Bertanggung jawab'],
      'ENTJ': ['Visi strategis', 'Kepemimpinan alami', 'Efisien', 'Percaya diri'],
      'ISTJ': ['Dapat diandalkan', 'Teliti', 'Sistematis', 'Bertanggung jawab'],
      'ISFJ': ['Perhatian', 'Loyal', 'Mendukung', 'Praktis'],
      'INFJ': ['Visioner', 'Empati', 'Kreatif', 'Berdedikasi'],
      'INTJ': ['Strategis', 'Independen', 'Inovatif', 'Analitis']
    };
    return strengthsMap[type] || ['Unik', 'Beragam', 'Adaptif', 'Kreatif'];
  };

  const getCareerSuggestions = (type: string) => {
    const careerMap: Record<string, string[]> = {
      'ESTJ': ['Manajer', 'Direktur', 'Administrator', 'Konsultan Bisnis'],
      'ENFJ': ['Guru', 'Konselor', 'Pelatih', 'Human Resources'],
      'ESFJ': ['Perawat', 'Guru SD', 'Customer Service', 'Event Organizer'],
      'ENTJ': ['CEO', 'Entrepreneur', 'Konsultan Strategi', 'Investment Banker'],
      'ISTJ': ['Akuntan', 'Auditor', 'Administrator', 'Engineer'],
      'ISFJ': ['Perawat', 'Guru', 'Konselor', 'Pustakawan'],
      'INFJ': ['Psikolog', 'Penulis', 'Konselor', 'Human Resources'],
      'INTJ': ['Arsitek', 'Scientist', 'Programmer', 'Konsultan']
    };
    return careerMap[type] || ['Peneliti', 'Konsultan', 'Analis', 'Spesialis'];
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [personalityQuestions[currentQuestion].id]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeTest();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeTest = () => {
    const personalityResults = calculatePersonality();
    setResults(personalityResults);
    setIsCompleted(true);
    toast({
      title: "Tes Kepribadian Selesai",
      description: "Hasil analisis kepribadian Anda telah selesai!",
    });
  };

  if (isCompleted && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-green-600">Hasil Tes Kepribadian</CardTitle>
              <CardDescription>
                Berdasarkan jawaban Anda, berikut adalah analisis kepribadian Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
                <h2 className="text-2xl font-bold">{results.type}</h2>
                <h3 className="text-xl mt-2">{results.name}</h3>
                <p className="mt-4 text-blue-100">{results.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Kekuatan Utama:</h3>
                  <div className="space-y-2">
                    {results.strengths.map((strength: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Saran Karir:</h3>
                  <div className="space-y-2">
                    {results.careerSuggestions.map((career: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{career}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Tips Pengembangan Diri:</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Kenali kekuatan dan kelemahan kepribadian Anda</li>
                  <li>• Kembangkan soft skills yang sesuai dengan tipe kepribadian</li>
                  <li>• Pilih lingkungan kerja yang mendukung karakteristik Anda</li>
                  <li>• Terus belajar dan beradaptasi dengan situasi yang berbeda</li>
                  <li>• Konsultasikan dengan guru BK untuk panduan lebih detail</li>
                </ul>
              </div>

              <div className="text-center">
                <Button onClick={() => window.history.back()}>
                  Kembali ke Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 p-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <div className="text-sm text-gray-600">
                {currentQuestion + 1} dari {personalityQuestions.length}
              </div>
            </div>
            <CardTitle>Tes Kepribadian</CardTitle>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">
                {personalityQuestions[currentQuestion].question}
              </h3>
              <RadioGroup
                value={answers[personalityQuestions[currentQuestion].id] || ""}
                onValueChange={handleAnswer}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sangat_tidak_setuju" id="sangat_tidak_setuju" />
                  <Label htmlFor="sangat_tidak_setuju">Sangat Tidak Setuju</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tidak_setuju" id="tidak_setuju" />
                  <Label htmlFor="tidak_setuju">Tidak Setuju</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="netral" id="netral" />
                  <Label htmlFor="netral">Netral</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="setuju" id="setuju" />
                  <Label htmlFor="setuju">Setuju</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sangat_setuju" id="sangat_setuju" />
                  <Label htmlFor="sangat_setuju">Sangat Setuju</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Sebelumnya
              </Button>
              <Button
                onClick={nextQuestion}
                disabled={!answers[personalityQuestions[currentQuestion].id]}
              >
                {currentQuestion === personalityQuestions.length - 1 ? "Selesai" : "Selanjutnya"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TesKepribadian;
