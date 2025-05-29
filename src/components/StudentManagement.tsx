
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApp, Student } from "@/contexts/AppContext";

const StudentManagement = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useApp();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nama: "",
    kelas: "",
    nisn: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStudent) {
      updateStudent(editingStudent.username, formData);
      toast({
        title: "Data Siswa Diperbarui",
        description: "Data siswa berhasil diperbarui",
      });
      setEditingStudent(null);
    } else {
      // Check if username already exists
      if (students.find(s => s.username === formData.username)) {
        toast({
          title: "Username Sudah Ada",
          description: "Username tersebut sudah digunakan",
          variant: "destructive",
        });
        return;
      }
      
      addStudent(formData as Student);
      toast({
        title: "Siswa Ditambahkan",
        description: "Data siswa berhasil ditambahkan",
      });
      setIsAddDialogOpen(false);
    }
    
    setFormData({ username: "", password: "", nama: "", kelas: "", nisn: "" });
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData(student);
  };

  const handleDelete = (username: string, nama: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data ${nama}?`)) {
      deleteStudent(username);
      toast({
        title: "Siswa Dihapus",
        description: "Data siswa berhasil dihapus",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Manajemen Data Siswa</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Siswa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Siswa Baru</DialogTitle>
                <DialogDescription>
                  Masukkan data siswa baru
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="kelas">Kelas</Label>
                  <Input
                    id="kelas"
                    value={formData.kelas}
                    onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nisn">NISN</Label>
                  <Input
                    id="nisn"
                    value={formData.nisn}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Tambah Siswa
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>NISN</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.username}>
                <TableCell>{student.username}</TableCell>
                <TableCell>{student.nama}</TableCell>
                <TableCell>{student.kelas}</TableCell>
                <TableCell>{student.nisn}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog open={editingStudent?.username === student.username} onOpenChange={(open) => !open && setEditingStudent(null)}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(student)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Data Siswa</DialogTitle>
                          <DialogDescription>
                            Perbarui data siswa
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <Label htmlFor="edit-username">Username</Label>
                            <Input
                              id="edit-username"
                              value={formData.username}
                              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                              disabled
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-password">Password</Label>
                            <Input
                              id="edit-password"
                              type="password"
                              value={formData.password}
                              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-nama">Nama Lengkap</Label>
                            <Input
                              id="edit-nama"
                              value={formData.nama}
                              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-kelas">Kelas</Label>
                            <Input
                              id="edit-kelas"
                              value={formData.kelas}
                              onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-nisn">NISN</Label>
                            <Input
                              id="edit-nisn"
                              value={formData.nisn}
                              onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Perbarui Data
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDelete(student.username, student.nama)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StudentManagement;
