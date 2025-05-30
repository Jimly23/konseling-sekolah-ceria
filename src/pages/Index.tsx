
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Heart, Users, TrendingUp } from "lucide-react";
import CounselingRequestForm from "@/components/CounselingRequestForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">BK Digital</h1>
                <p className="text-sm text-gray-600">Bimbingan & Konseling</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Layanan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Bimbingan & Konseling</span> Digital
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Platform terpadu untuk mendukung perkembangan pribadi, sosial, belajar, dan karier siswa dengan bimbingan profesional dari Guru BK
          </p>
        </div>
      </section>

      {/* Counseling Request Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Ajukan Layanan Konseling</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <CounselingRequestForm serviceType="Pribadi">
              <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-pink-500 to-rose-500 text-white">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-lg">Konseling Pribadi</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-white/90">
                    Bimbingan untuk pengembangan kepribadian dan masalah personal
                  </CardDescription>
                </CardContent>
              </Card>
            </CounselingRequestForm>
            
            <CounselingRequestForm serviceType="Sosial">
              <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-lg">Konseling Sosial</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-white/90">
                    Bantuan dalam mengatasi masalah hubungan sosial dan interpersonal
                  </CardDescription>
                </CardContent>
              </Card>
            </CounselingRequestForm>
            
            <CounselingRequestForm serviceType="Belajar">
              <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-lg">Konseling Belajar</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-white/90">
                    Dukungan untuk meningkatkan prestasi dan motivasi belajar
                  </CardDescription>
                </CardContent>
              </Card>
            </CounselingRequestForm>
            
            <CounselingRequestForm serviceType="Karier">
              <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-lg">Konseling Karier</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-white/90">
                    Panduan untuk perencanaan masa depan dan pemilihan karier
                  </CardDescription>
                </CardContent>
              </Card>
            </CounselingRequestForm>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-300">© 2024 BK Digital - Sistem Bimbingan dan Konseling Sekolah</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
