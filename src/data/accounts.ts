
export const studentAccounts = [
  { username: "siswa1", password: "password123", nama: "Ahmad Fauzi", kelas: "XI IPA 1", nisn: "1234567890" },
  { username: "siswa2", password: "password123", nama: "Siti Nurhaliza", kelas: "X IPS 2", nisn: "1234567891" },
  { username: "siswa3", password: "password123", nama: "Budi Santoso", kelas: "XII IPA 3", nisn: "1234567892" },
  { username: "siswa4", password: "password123", nama: "Dewi Sartika", kelas: "XI IPS 1", nisn: "1234567893" },
  { username: "siswa5", password: "password123", nama: "Rizki Pratama", kelas: "X IPA 1", nisn: "1234567894" }
];

export const teacherAccounts = [
  { username: "gurubk1", password: "password123", nama: "Drs. Bambang Sutrisno, M.Pd", nip: "196501011990031001", spesialisasi: "Konseling Pribadi & Sosial" },
  { username: "gurubk2", password: "password123", nama: "Dra. Siti Aminah, M.Si", nip: "197203152000122001", spesialisasi: "Konseling Belajar & Karier" },
  { username: "gurubk3", password: "password123", nama: "Dr. Ahmad Wijaya, S.Pd, M.Pd", nip: "198008102005011002", spesialisasi: "Psikologi Pendidikan" },
  { username: "gurubk4", password: "password123", nama: "Ratna Sari, S.Psi, M.Psi", nip: "198505202010012003", spesialisasi: "Konseling Kelompok" },
  { username: "gurubk5", password: "password123", nama: "Hendra Gunawan, S.Pd, M.Pd", nip: "197912051999031004", spesialisasi: "Bimbingan Karier" }
];

export const validateLogin = (username: string, password: string, role: "siswa" | "guru") => {
  if (role === "siswa") {
    return studentAccounts.find(account => account.username === username && account.password === password);
  } else {
    return teacherAccounts.find(account => account.username === username && account.password === password);
  }
};
