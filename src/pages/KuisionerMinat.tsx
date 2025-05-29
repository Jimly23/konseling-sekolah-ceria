
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
  const { toast } = useToast();

  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
    setIsCompleted(true);
    toast({
      title: "Kuisioner Selesai",
      description: "Hasil kuisioner minat Anda telah disimpan",
    });
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 p-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-600">Kuisioner Selesai!</CardTitle>
              <CardDescription>
                Terima kasih telah mengisi kuisioner minat. Hasil akan dianalisis oleh Guru BK.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={() => window.history.back()}>
                Kembali ke Dashboard
              </Button>
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
