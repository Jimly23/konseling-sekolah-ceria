import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Heart, Users, TrendingUp, MessageCircle, Calendar, FileText, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validateLogin } from "@/data/accounts";
import { useNavigate } from "react-router-dom";
import CounselingRequestForm from "@/components/CounselingRequestForm";

const Index = () => {
  const [loginType, setLoginType] = useState<"siswa" | "guru" | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"siswa" | "guru" | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string, role: "siswa" | "guru") => {
    const user = validateLogin(username, password, role);
    
    if (user) {
      setIsLoggedIn(true);
      setUserRole(role);
      setCurrentUser(user);
      toast({
        title: "Login Berhasil",
        description: `Selamat datang, ${user.nama}!`,
      });
    } else {
      toast({
        title: "Login Gagal",
        description: "Username atau password salah. Coba: siswa1/password123 atau gurubk1/password123",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentUser(null);
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem",
    });
  };

  if (isLoggedIn && userRole) {
    return userRole === "siswa" ? (
      <SiswaDashboard onLogout={handleLogout} user={currentUser} navigate={navigate} />
    ) : (
      <GuruBKDashboard onLogout={handleLogout} user={currentUser} />
    );
  }

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
            <div className="flex space-x-2">
              <LoginDialog type="siswa" onLogin={handleLogin} />
              <LoginDialog type="guru" onLogin={handleLogin} />
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
          <div className="flex justify-center space-x-4">
            <LoginDialog type="siswa" onLogin={handleLogin}>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                Masuk sebagai Siswa
              </Button>
            </LoginDialog>
            <LoginDialog type="guru" onLogin={handleLogin}>
              <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                Masuk sebagai Guru BK
              </Button>
            </LoginDialog>
          </div>
          
          {/* Demo Accounts Info */}
          <div className="mt-8 p-4 bg-white/60 rounded-lg max-w-2xl mx-auto">
            <h3 className="font-semibold mb-2">Akun Demo:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Siswa:</p>
                <p>Username: siswa1-siswa5</p>
                <p>Password: password123</p>
              </div>
              <div>
                <p className="font-medium">Guru BK:</p>
                <p>Username: gurubk1-gurubk5</p>
                <p>Password: password123</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Jenis Layanan Konseling</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Heart className="h-8 w-8" />}
              title="Konseling Pribadi"
              description="Bimbingan untuk pengembangan kepribadian dan masalah personal"
              color="from-pink-500 to-rose-500"
            />
            <ServiceCard
              icon={<Users className="h-8 w-8" />}
              title="Konseling Sosial"
              description="Bantuan dalam mengatasi masalah hubungan sosial dan interpersonal"
              color="from-blue-500 to-cyan-500"
            />
            <ServiceCard
              icon={<BookOpen className="h-8 w-8" />}
              title="Konseling Belajar"
              description="Dukungan untuk meningkatkan prestasi dan motivasi belajar"
              color="from-green-500 to-emerald-500"
            />
            <ServiceCard
              icon={<TrendingUp className="h-8 w-8" />}
              title="Konseling Karier"
              description="Panduan untuk perencanaan masa depan dan pemilihan karier"
              color="from-purple-500 to-indigo-500"
            />
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

const ServiceCard = ({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) => (
  <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
    <CardHeader className="text-center">
      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} mx-auto mb-4 flex items-center justify-center text-white`}>
        {icon}
      </div>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-center">{description}</CardDescription>
    </CardContent>
  </Card>
);

const LoginDialog = ({ 
  type, 
  onLogin, 
  children 
}: { 
  type: "siswa" | "guru"; 
  onLogin: (username: string, password: string, role: "siswa" | "guru") => void;
  children?: React.ReactNode;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password, type);
    setOpen(false);
    setUsername("");
    setPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant={type === "siswa" ? "default" : "outline"}>
            {type === "siswa" ? "Login Siswa" : "Login Guru BK"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login {type === "siswa" ? "Siswa" : "Guru BK"}</DialogTitle>
          <DialogDescription>
            Masukkan kredensial Anda untuk mengakses dashboard
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const SiswaDashboard = ({ onLogout, user, navigate }: { onLogout: () => void; user: any; navigate: any }) => {
  const [selectedService, setSelectedService] = useState<string>("");
  const { toast } = useToast();

  const handleServiceRequest = (serviceType: string) => {
    setSelectedService(serviceType);
  };

  const handleMaterialClick = (materialId: string) => {
    navigate(`/material/${materialId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard Siswa</h1>
              <p className="text-sm text-gray-600">Selamat datang, {user.nama} - {user.kelas}</p>
            </div>
            <Button onClick={onLogout} variant="outline">Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ajukan Layanan */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Ajukan Layanan Konseling</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <CounselingRequestForm serviceType="Pribadi">
                  <Button className="h-20 bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 w-full">
                    <div className="text-center">
                      <Heart className="h-6 w-6 mx-auto mb-1" />
                      <div>Konseling Pribadi</div>
                    </div>
                  </Button>
                </CounselingRequestForm>
                
                <CounselingRequestForm serviceType="Sosial">
                  <Button className="h-20 bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 w-full">
                    <div className="text-center">
                      <Users className="h-6 w-6 mx-auto mb-1" />
                      <div>Konseling Sosial</div>
                    </div>
                  </Button>
                </CounselingRequestForm>
                
                <CounselingRequestForm serviceType="Belajar">
                  <Button className="h-20 bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 w-full">
                    <div className="text-center">
                      <BookOpen className="h-6 w-6 mx-auto mb-1" />
                      <div>Konseling Belajar</div>
                    </div>
                  </Button>
                </CounselingRequestForm>
                
                <CounselingRequestForm serviceType="Karier">
                  <Button className="h-20 bg-gradient-to-br from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 w-full">
                    <div className="text-center">
                      <TrendingUp className="h-6 w-6 mx-auto mb-1" />
                      <div>Konseling Karier</div>
                    </div>
                  </Button>
                </CounselingRequestForm>
              </div>
            </CardContent>
          </Card>

          {/* Jadwal Sesi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Jadwal Sesi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-sm">Konseling Pribadi</p>
                  <p className="text-xs text-gray-600">Senin, 4 Des 2024 - 10:00</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-sm">Self Assessment</p>
                  <p className="text-xs text-gray-600">Rabu, 6 Des 2024 - 14:00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat dengan Guru BK */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Chat dengan Guru BK</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Buka Chat
              </Button>
            </CardContent>
          </Card>

          {/* Materi Pengembangan Diri */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Materi Pengembangan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm"
                  onClick={() => handleMaterialClick("manajemen-waktu")}
                >
                  📚 Tips Manajemen Waktu
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm"
                  onClick={() => handleMaterialClick("minat-bakat")}
                >
                  🎯 Menemukan Minat & Bakat
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm"
                  onClick={() => handleMaterialClick("kepercayaan-diri")}
                >
                  💪 Membangun Kepercayaan Diri
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Self Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Self Assessment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  size="sm"
                  onClick={() => navigate("/kuisioner-minat")}
                >
                  Kuisioner Minat
                </Button>
                <Button 
                  className="w-full" 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigate("/tes-kepribadian")}
                >
                  Tes Kepribadian
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const GuruBKDashboard = ({ onLogout, user }: { onLogout: () => void; user: any }) => {
  const [requests] = useState([
    { id: 1, nama: "Ahmad Fauzi", kelas: "XI IPA 1", jenis: "Pribadi", status: "Menunggu", tanggal: "2024-12-01" },
    { id: 2, nama: "Siti Nurhaliza", kelas: "X IPS 2", jenis: "Sosial", status: "Disetujui", tanggal: "2024-12-02" },
    { id: 3, nama: "Budi Santoso", kelas: "XII IPA 3", jenis: "Karier", status: "Menunggu", tanggal: "2024-12-03" },
  ]);

  const { toast } = useToast();

  const handleApproveRequest = (id: number) => {
    toast({
      title: "Permintaan Disetujui",
      description: "Permintaan konseling telah disetujui dan dijadwalkan",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard Guru BK</h1>
              <p className="text-sm text-gray-600">Selamat datang, {user.nama}</p>
            </div>
            <Button onClick={onLogout} variant="outline">Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Statistik */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-xs text-gray-600">Total Siswa</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs text-gray-600">Sesi Aktif</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs text-gray-600">Permintaan Baru</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-xs text-gray-600">Total Kasus</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Permintaan Layanan */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Permintaan Layanan Konseling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{request.nama}</p>
                      <p className="text-sm text-gray-600">{request.kelas} • {request.jenis}</p>
                      <p className="text-xs text-gray-500">{request.tanggal}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        request.status === "Menunggu" 
                          ? "bg-yellow-100 text-yellow-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {request.status}
                      </span>
                      {request.status === "Menunggu" && (
                        <Button size="sm" onClick={() => handleApproveRequest(request.id)}>
                          Setujui
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Jadwal Hari Ini */}
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-sm">Ahmad Fauzi</p>
                  <p className="text-xs text-gray-600">10:00 - Konseling Pribadi</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-sm">Siti Nurhaliza</p>
                  <p className="text-xs text-gray-600">14:00 - Konseling Sosial</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="font-medium text-sm">Budi Santoso</p>
                  <p className="text-xs text-gray-600">16:00 - Konseling Karier</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
