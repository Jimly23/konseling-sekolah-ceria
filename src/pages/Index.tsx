import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Users, TrendingUp, Clock, ArrowRight, Menu, Brain, Target } from "lucide-react";
import { Link } from "react-router-dom";
import CounselingRequestForm from "@/components/CounselingRequestForm";

const articles = [
  {
    id: "manajemen-waktu",
    title: "Tips Manajemen Waktu untuk Siswa",
    excerpt: "Pelajari cara mengelola waktu dengan efektif untuk meningkatkan produktivitas belajar dan mengurangi stres.",
    readTime: "5 menit",
    category: "Belajar"
  },
  {
    id: "minat-bakat",
    title: "Cara Menemukan Minat dan Bakat",
    excerpt: "Panduan lengkap untuk mengidentifikasi minat dan bakat yang dapat membantu merencanakan masa depan.",
    readTime: "7 menit",
    category: "Karier"
  },
  {
    id: "kepercayaan-diri",
    title: "Membangun Kepercayaan Diri di Sekolah",
    excerpt: "Strategi praktis untuk meningkatkan rasa percaya diri dalam berinteraksi dan belajar di lingkungan sekolah.",
    readTime: "6 menit",
    category: "Pribadi"
  }
];

const Index = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">BK Digital</h1>
                <p className="text-sm text-gray-600">Bimbingan & Konseling</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Beranda
              </button>
              <button 
                onClick={() => scrollToSection('counseling')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Layanan Konseling
              </button>
              <button 
                onClick={() => scrollToSection('assessment')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Asesmen
              </button>
              <button 
                onClick={() => scrollToSection('articles')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Artikel
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-20 px-4">
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
      <section id="counseling" className="py-16 px-4">
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

      {/* Assessment Tools Section */}
      <section id="assessment" className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">Asesmen & Evaluasi</h3>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Kenali potensi diri dengan mengikuti asesmen minat dan kepribadian untuk membantu perencanaan masa depan
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Kuisioner Minat</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-white/90 mb-6">
                  Temukan minat dan bakat yang sesuai dengan kepribadian untuk membantu menentukan jurusan dan karier
                </CardDescription>
                <Link to="/kuisioner-minat">
                  <Button variant="secondary" className="w-full">
                    Mulai Kuisioner
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                  <Brain className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">Tes Kepribadian</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-white/90 mb-6">
                  Pahami karakteristik dan tipe kepribadian untuk mengoptimalkan potensi dan hubungan sosial
                </CardDescription>
                <Link to="/tes-kepribadian">
                  <Button variant="secondary" className="w-full">
                    Mulai Tes
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Artikel Terbaru</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {articles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </CardDescription>
                  <Link to={`/article/${article.id}`}>
                    <Button variant="outline" className="w-full group">
                      Baca Selengkapnya
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
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
