
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const questions = [
  {
    id: 1,
    question: "Saya senang menganalisis data dan angka",
    category: "Analitis"
  },
  {
    id: 2,
    question: "Saya tertarik membantu orang lain menyelesaikan masalah",
    category: "Sosial"
  },
  {
    id: 3,
    question: "Saya menikmati kegiatan yang melibatkan kreativitas dan seni",
    category: "Kreatif"
  },
  {
    id: 4,
    question: "Saya suka bekerja dengan mesin atau teknologi",
    category: "Teknis"
  },
  {
    id: 5,
    question: "Saya tertarik pada kegiatan penelitian dan eksperimen",
    category: "Investigatif"
  },
  {
    id: 6,
    question: "Saya senang memimpin tim dan mengorganisir kegiatan",
    category: "Kepemimpinan"
  },
  {
    id: 7,
    question: "Saya tertarik pada kegiatan yang berhubungan dengan alam",
    category: "Realistik"
  },
  {
    id: 8,
    question: "Saya menikmati berbicara di depan umum dan presentasi",
    category: "Komunikasi"
  }
];

const KuisionerMinat = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const calculateResults = () => {
    const categoryScores: Record<string, number> = {};
    
    // Initialize all categories
    questions.forEach(q => {
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = 0;
      }
    });

    // Calculate scores based on answers
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        let score = 0;
        switch (answer) {
          case 'sangat_tidak_setuju': score = 1; break;
          case 'tidak_setuju': score = 2; break;
          case 'netral': score = 3; break;
          case 'setuju': score = 4; break;
          case 'sangat_setuju': score = 5; break;
        }
        categoryScores[question.category] += score;
      }
    });

    // Find top interests
    const sortedCategories = Object.entries(categoryScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    const recommendations = {
      'Analitis': ['Akuntansi', 'Data Analyst', 'Statistisi', 'Peneliti'],
      'Sosial': ['Konselor', 'Pekerja Sosial', 'Guru', 'Psikolog'],
      'Kreatif': ['Desainer Grafis', 'Seniman', 'Penulis', 'Fotografer'],
      'Teknis': ['Programmer', 'Teknisi', 'Insinyur', 'IT Support'],
      'Investigatif': ['Ilmuwan', 'Dokter', 'Peneliti', 'Detektif'],
      'Kepemimpinan': ['Manajer', 'Entrepreneur', 'Direktur', 'Supervisor'],
      'Realistik': ['Petani', 'Teknisi Mesin', 'Tukang Kayu', 'Pilot'],
      'Komunikasi': ['Presenter', 'Public Relations', 'Sales', 'Jurnalis']
    };

    return {
      topInterests: sortedCategories,
      recommendations: sortedCategories.map(([category]) => ({
        category,
        careers: recommendations[category] || []
      }))
    };
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuestionnaire();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeQuestionnaire = () => {
    const analysisResults = calculateResults();
    setResults(analysisResults);
    setIsCompleted(true);
    toast({
      title: "Kuisioner Selesai",
      description: "Hasil analisis minat Anda telah selesai!",
    });
  };

  if (isCompleted && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-600">Hasil Analisis Minat</CardTitle>
              <CardDescription>
                Berikut adalah hasil analisis berdasarkan jawaban Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Minat Tertinggi Anda:</h3>
                <div className="grid gap-4">
                  {results.topInterests.map(([category, score], index) => (
                    <div key={category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{category}</span>
                      </div>
                      <div className="text-sm text-gray-600">Skor: {score}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Rekomendasi Karir:</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.recommendations.map(({ category, careers }) => (
                    <div key={category} className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-blue-600 mb-2">{category}</h4>
                      <ul className="space-y-1">
                        {careers.map(career => (
                          <li key={career} className="text-sm text-gray-700">• {career}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Saran untuk Pengembangan:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Fokuskan pengembangan diri pada bidang minat tertinggi Anda</li>
                  <li>• Cari pengalaman melalui magang atau kegiatan ekstrakurikuler terkait</li>
                  <li>• Konsultasikan dengan guru BK untuk panduan lebih lanjut</li>
                  <li>• Ikuti kursus atau pelatihan yang mendukung minat Anda</li>
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
                {currentQuestion + 1} dari {questions.length}
              </div>
            </div>
            <CardTitle>Kuisioner Minat</CardTitle>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">
                {questions[currentQuestion].question}
              </h3>
              <RadioGroup
                value={answers[questions[currentQuestion].id] || ""}
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
                disabled={!answers[questions[currentQuestion].id]}
              >
                {currentQuestion === questions.length - 1 ? "Selesai" : "Selanjutnya"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KuisionerMinat;
