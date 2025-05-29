
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, User, Download } from "lucide-react";

const materials = {
  "manajemen-waktu": {
    title: "Tips Manajemen Waktu",
    author: "Guru BK",
    duration: "15 menit",
    content: `
      <h2>Pentingnya Manajemen Waktu</h2>
      <p>Manajemen waktu adalah keterampilan penting yang harus dikuasai oleh setiap siswa untuk mencapai kesuksesan akademik dan personal.</p>
      
      <h3>Tips Praktis Manajemen Waktu:</h3>
      <ul>
        <li><strong>Buat Jadwal Harian</strong> - Rencanakan aktivitas Anda setiap hari</li>
        <li><strong>Prioritaskan Tugas</strong> - Kerjakan tugas yang paling penting terlebih dahulu</li>
        <li><strong>Hindari Prokrastinasi</strong> - Mulai mengerjakan tugas sedini mungkin</li>
        <li><strong>Istirahat Teratur</strong> - Berikan waktu istirahat untuk menjaga produktivitas</li>
        <li><strong>Gunakan Teknologi</strong> - Manfaatkan aplikasi pengingat dan kalender</li>
      </ul>
      
      <h3>Teknik Pomodoro:</h3>
      <p>Teknik ini menggunakan timer untuk membagi waktu kerja menjadi interval 25 menit yang dipisahkan oleh istirahat singkat.</p>
      
      <h3>Manfaat Manajemen Waktu yang Baik:</h3>
      <ul>
        <li>Mengurangi stres</li>
        <li>Meningkatkan produktivitas</li>
        <li>Lebih banyak waktu untuk kegiatan yang disukai</li>
        <li>Prestasi akademik yang lebih baik</li>
      </ul>
    `
  },
  "minat-bakat": {
    title: "Menemukan Minat & Bakat",
    author: "Guru BK",
    duration: "20 menit",
    content: `
      <h2>Mengenal Diri Sendiri</h2>
      <p>Menemukan minat dan bakat adalah langkah penting dalam pengembangan diri dan perencanaan karier masa depan.</p>
      
      <h3>Cara Menemukan Minat:</h3>
      <ul>
        <li><strong>Refleksi Diri</strong> - Pikirkan aktivitas apa yang membuat Anda antusias</li>
        <li><strong>Coba Hal Baru</strong> - Ikuti berbagai kegiatan ekstrakurikuler</li>
        <li><strong>Perhatikan Hobi</strong> - Apa yang Anda lakukan di waktu luang?</li>
        <li><strong>Tanya Orang Terdekat</strong> - Minta pendapat dari keluarga dan teman</li>
      </ul>
      
      <h3>Mengidentifikasi Bakat:</h3>
      <ul>
        <li>Kemampuan yang datang secara natural</li>
        <li>Hal yang mudah dipelajari</li>
        <li>Aktivitas yang menghasilkan prestasi</li>
        <li>Kemampuan yang diakui orang lain</li>
      </ul>
      
      <h3>Mengembangkan Minat dan Bakat:</h3>
      <p>Setelah menemukan minat dan bakat, penting untuk terus mengembangkannya melalui latihan, pembelajaran, dan pengalaman.</p>
    `
  },
  "kepercayaan-diri": {
    title: "Membangun Kepercayaan Diri",
    author: "Guru BK",
    duration: "18 menit",
    content: `
      <h2>Membangun Kepercayaan Diri</h2>
      <p>Kepercayaan diri adalah kunci untuk meraih kesuksesan dalam berbagai aspek kehidupan, baik akademik maupun sosial.</p>
      
      <h3>Langkah-langkah Membangun Kepercayaan Diri:</h3>
      <ul>
        <li><strong>Kenali Kelebihan Diri</strong> - Buat daftar hal-hal yang Anda kuasai</li>
        <li><strong>Tetapkan Tujuan Kecil</strong> - Mulai dengan target yang mudah dicapai</li>
        <li><strong>Belajar dari Kesalahan</strong> - Jadikan kegagalan sebagai pembelajaran</li>
        <li><strong>Berlatih Bicara</strong> - Latih kemampuan komunikasi Anda</li>
        <li><strong>Jaga Postur Tubuh</strong> - Berdiri dan duduk dengan tegak</li>
      </ul>
      
      <h3>Mengatasi Rasa Tidak Percaya Diri:</h3>
      <ul>
        <li>Hindari membandingkan diri dengan orang lain</li>
        <li>Fokus pada proses, bukan hasil</li>
        <li>Kelilingi diri dengan orang-orang positif</li>
        <li>Berlatih self-talk yang positif</li>
      </ul>
      
      <h3>Manfaat Kepercayaan Diri:</h3>
      <ul>
        <li>Berani mengambil peluang</li>
        <li>Hubungan sosial yang lebih baik</li>
        <li>Performa akademik meningkat</li>
        <li>Mental yang lebih sehat</li>
      </ul>
    `
  }
};

const MaterialDetail = () => {
  const { id } = useParams<{ id: string }>();
  const material = materials[id as keyof typeof materials];

  if (!material) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardContent className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Materi Tidak Ditemukan</h2>
              <Button onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Unduh PDF
              </Button>
            </div>
            <CardTitle className="text-2xl">{material.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {material.author}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {material.duration}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: material.content }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaterialDetail;
