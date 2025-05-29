
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
    type: "Introvert vs Ekstrovert"
  },
  {
    id: 2,
    question: "Saya sering membuat keputusan berdasarkan perasaan",
    type: "Thinking vs Feeling"
  },
  {
    id: 3,
    question: "Saya suka merencanakan segala sesuatu dengan detail",
    type: "Judging vs Perceiving"
  },
  {
    id: 4,
    question: "Saya lebih tertarik pada fakta daripada kemungkinan",
    type: "Sensing vs Intuition"
  },
  {
    id: 5,
    question: "Saya merasa nyaman menjadi pusat perhatian",
    type: "Introvert vs Ekstrovert"
  },
  {
    id: 6,
    question: "Saya selalu mempertimbangkan perasaan orang lain saat mengambil keputusan",
    type: "Thinking vs Feeling"
  },
  {
    id: 7,
    question: "Saya suka mengikuti jadwal yang sudah ditentukan",
    type: "Judging vs Perceiving"
  },
  {
    id: 8,
    question: "Saya lebih suka hal-hal yang praktis dan nyata",
    type: "Sensing vs Intuition"
  }
];

const TesKepribadian = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const progress = ((currentQuestion + 1) / personalityQuestions.length) * 100;

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
    setIsCompleted(true);
    toast({
      title: "Tes Kepribadian Selesai",
      description: "Hasil tes kepribadian Anda telah disimpan untuk analisis",
    });
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 p-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-600">Tes Kepribadian Selesai!</CardTitle>
              <CardDescription>
                Hasil tes kepribadian Anda akan dianalisis dan dapat digunakan dalam sesi konseling.
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
