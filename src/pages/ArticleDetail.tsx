
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, User, BookOpen } from "lucide-react";

const articles = {
  "manajemen-waktu": {
    title: "Tips Manajemen Waktu untuk Siswa",
    author: "Guru BK",
    readTime: "5 menit",
    category: "Belajar",
    publishDate: "15 Januari 2024",
    content: `
      <h2>Pentingnya Manajemen Waktu untuk Siswa</h2>
      <p>Manajemen waktu adalah keterampilan penting yang harus dikuasai oleh setiap siswa untuk mencapai kesuksesan akademik dan personal. Dengan mengelola waktu dengan baik, siswa dapat mengurangi stres, meningkatkan produktivitas, dan memiliki lebih banyak waktu untuk kegiatan yang disukai.</p>
      
      <h3>Tips Praktis Manajemen Waktu:</h3>
      <ul>
        <li><strong>Buat Jadwal Harian</strong> - Rencanakan aktivitas Anda setiap hari dengan detail. Gunakan agenda atau aplikasi kalender untuk mencatat semua kegiatan penting.</li>
        <li><strong>Prioritaskan Tugas</strong> - Kerjakan tugas yang paling penting dan mendesak terlebih dahulu. Gunakan matriks Eisenhower untuk membantu memprioritaskan.</li>
        <li><strong>Hindari Prokrastinasi</strong> - Mulai mengerjakan tugas sedini mungkin. Jangan menunda-nunda pekerjaan yang bisa diselesaikan hari ini.</li>
        <li><strong>Istirahat Teratur</strong> - Berikan waktu istirahat untuk menjaga produktivitas dan kesehatan mental Anda.</li>
        <li><strong>Gunakan Teknologi</strong> - Manfaatkan aplikasi pengingat, timer, dan kalender digital untuk membantu mengatur waktu.</li>
      </ul>
      
      <h3>Teknik Pomodoro untuk Belajar:</h3>
      <p>Teknik Pomodoro adalah metode manajemen waktu yang menggunakan timer untuk membagi waktu kerja menjadi interval 25 menit yang dipisahkan oleh istirahat singkat 5 menit. Setelah 4 interval, ambil istirahat yang lebih panjang (15-30 menit).</p>
      
      <h3>Manfaat Manajemen Waktu yang Baik:</h3>
      <ul>
        <li>Mengurangi stres dan kecemasan</li>
        <li>Meningkatkan produktivitas belajar</li>
        <li>Lebih banyak waktu untuk hobi dan relaksasi</li>
        <li>Prestasi akademik yang lebih baik</li>
        <li>Persiapan yang lebih baik untuk masa depan</li>
      </ul>
      
      <p>Ingatlah bahwa manajemen waktu adalah keterampilan yang perlu dilatih secara konsisten. Mulailah dengan langkah kecil dan tingkatkan secara bertahap.</p>
    `
  },
  "minat-bakat": {
    title: "Cara Menemukan Minat dan Bakat",
    author: "Guru BK",
    readTime: "7 menit",
    category: "Karier",
    publishDate: "12 Januari 2024",
    content: `
      <h2>Mengenal Diri Sendiri</h2>
      <p>Menemukan minat dan bakat adalah langkah penting dalam pengembangan diri dan perencanaan karier masa depan. Setiap orang memiliki keunikan dan potensi yang berbeda-beda.</p>
      
      <h3>Cara Menemukan Minat:</h3>
      <ul>
        <li><strong>Refleksi Diri</strong> - Luangkan waktu untuk memikirkan aktivitas apa yang membuat Anda merasa antusias dan energik.</li>
        <li><strong>Coba Hal Baru</strong> - Ikuti berbagai kegiatan ekstrakurikuler, workshop, atau kursus untuk mengeksplorasi minat baru.</li>
        <li><strong>Perhatikan Hobi</strong> - Analisis apa yang Anda lakukan di waktu luang tanpa paksaan dari siapa pun.</li>
        <li><strong>Tanya Orang Terdekat</strong> - Minta pendapat dari keluarga, teman, dan guru tentang hal yang Anda sukai dan kuasai.</li>
        <li><strong>Tes Minat</strong> - Ikuti tes minat yang tersedia online atau melalui konselor sekolah.</li>
      </ul>
      
      <h3>Mengidentifikasi Bakat:</h3>
      <ul>
        <li>Kemampuan yang datang secara natural tanpa banyak usaha</li>
        <li>Hal yang mudah dipelajari dibandingkan orang lain</li>
        <li>Aktivitas yang sering menghasilkan prestasi atau pujian</li>
        <li>Kemampuan yang diakui dan diapresiasi orang lain</li>
        <li>Keterampilan yang berkembang pesat dengan latihan minimal</li>
      </ul>
      
      <h3>Mengembangkan Minat dan Bakat:</h3>
      <p>Setelah menemukan minat dan bakat, penting untuk terus mengembangkannya melalui:</p>
      <ul>
        <li>Latihan yang konsisten dan berkelanjutan</li>
        <li>Mencari mentor atau pembimbing yang berpengalaman</li>
        <li>Bergabung dengan komunitas yang memiliki minat serupa</li>
        <li>Mengikuti kompetisi atau pertunjukan untuk mengasah kemampuan</li>
        <li>Terus belajar dan mengupdate pengetahuan di bidang tersebut</li>
      </ul>
      
      <h3>Menghubungkan dengan Karier:</h3>
      <p>Minat dan bakat yang telah diidentifikasi dapat menjadi dasar untuk memilih jurusan kuliah dan karier masa depan. Penting untuk meneliti berbagai profesi yang sesuai dengan minat dan bakat Anda.</p>
    `
  },
  "kepercayaan-diri": {
    title: "Membangun Kepercayaan Diri di Sekolah",
    author: "Guru BK",
    readTime: "6 menit",
    category: "Pribadi",
    publishDate: "10 Januari 2024",
    content: `
      <h2>Membangun Kepercayaan Diri</h2>
      <p>Kepercayaan diri adalah kunci untuk meraih kesuksesan dalam berbagai aspek kehidupan, baik akademik maupun sosial. Siswa yang memiliki kepercayaan diri yang baik cenderung lebih berani mengambil tantangan dan mencapai potensi terbaik mereka.</p>
      
      <h3>Langkah-langkah Membangun Kepercayaan Diri:</h3>
      <ul>
        <li><strong>Kenali Kelebihan Diri</strong> - Buat daftar hal-hal yang Anda kuasai dengan baik dan prestasi yang pernah dicapai.</li>
        <li><strong>Tetapkan Tujuan Kecil</strong> - Mulai dengan target yang realistis dan mudah dicapai untuk membangun momentum positif.</li>
        <li><strong>Belajar dari Kesalahan</strong> - Jadikan kegagalan sebagai pembelajaran, bukan sebagai alasan untuk menyerah.</li>
        <li><strong>Berlatih Bicara</strong> - Latih kemampuan komunikasi Anda dengan berbicara di depan cermin atau bersama teman.</li>
        <li><strong>Jaga Postur Tubuh</strong> - Berdiri dan duduk dengan tegak, kontak mata yang baik, dan senyum yang tulus.</li>
        <li><strong>Persiapan yang Matang</strong> - Selalu siapkan diri dengan baik sebelum presentasi atau ujian.</li>
      </ul>
      
      <h3>Mengatasi Rasa Tidak Percaya Diri:</h3>
      <ul>
        <li>Hindari membandingkan diri dengan orang lain secara berlebihan</li>
        <li>Fokus pada proses dan usaha, bukan hanya pada hasil akhir</li>
        <li>Kelilingi diri dengan orang-orang yang mendukung dan positif</li>
        <li>Berlatih self-talk yang positif dan konstruktif</li>
        <li>Tantang pikiran negatif dengan fakta yang objektif</li>
        <li>Rayakan setiap pencapaian, sekecil apapun itu</li>
      </ul>
      
      <h3>Strategi di Lingkungan Sekolah:</h3>
      <ul>
        <li>Aktif berpartisipasi dalam diskusi kelas</li>
        <li>Bergabung dengan organisasi atau ekstrakurikuler</li>
        <li>Bantu teman yang membutuhkan bantuan</li>
        <li>Volunteer untuk menjadi pemimpin dalam projek kelompok</li>
        <li>Ikuti kompetisi atau lomba sesuai minat</li>
      </ul>
      
      <h3>Manfaat Kepercayaan Diri:</h3>
      <ul>
        <li>Berani mengambil peluang dan tantangan baru</li>
        <li>Hubungan sosial yang lebih baik dan bermakna</li>
        <li>Performa akademik yang meningkat</li>
        <li>Kesehatan mental yang lebih baik</li>
        <li>Kemampuan kepemimpinan yang berkembang</li>
        <li>Persiapan yang lebih baik untuk masa depan</li>
      </ul>
      
      <p>Ingatlah bahwa membangun kepercayaan diri adalah proses yang membutuhkan waktu dan latihan. Bersabarlah dengan diri sendiri dan terus berusaha untuk berkembang.</p>
    `
  }
};

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles[id as keyof typeof articles];

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardContent className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Artikel Tidak Ditemukan</h2>
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
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                {article.category}
              </span>
            </div>
            <CardTitle className="text-3xl mb-4">{article.title}</CardTitle>
            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {article.readTime}
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                {article.publishDate}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-ul:text-gray-700 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticleDetail;
