
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface CounselingRequestFormProps {
  serviceType: string;
  children: React.ReactNode;
}

const CounselingRequestForm = ({ serviceType, children }: CounselingRequestFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    studentClass: "",
    phoneNumber: "",
    description: "",
    priority: "",
    preferredDate: "",
    preferredTime: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const whatsappNumber = "082329322353";
    const message = `*PERMINTAAN KONSELING ${serviceType.toUpperCase()}*

*Data Siswa:*
• Nama: ${formData.studentName}
• Kelas: ${formData.studentClass}
• No. HP: ${formData.phoneNumber}

*Detail Konseling:*
• Jenis: Konseling ${serviceType}
• Prioritas: ${formData.priority}
• Tanggal Pilihan: ${formData.preferredDate}
• Waktu Pilihan: ${formData.preferredTime}

*Deskripsi Masalah:*
${formData.description}

*Waktu Pengajuan:* ${format(new Date(), 'dd/MM/yyyy HH:mm')}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Permintaan Dikirim",
      description: `Permintaan konseling ${serviceType.toLowerCase()} telah dikirim ke WhatsApp Guru BK`,
    });

    setOpen(false);
    setFormData({
      studentName: "",
      studentClass: "",
      phoneNumber: "",
      description: "",
      priority: "",
      preferredDate: "",
      preferredTime: "",
    });
  };

  // Set minimum date to today
  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajukan Konseling {serviceType}</DialogTitle>
          <DialogDescription>
            Isi form berikut untuk mengajukan layanan konseling {serviceType.toLowerCase()}. Data akan dikirim langsung ke WhatsApp Guru BK.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentName">Nama Lengkap</Label>
              <Input
                id="studentName"
                placeholder="Masukkan nama lengkap"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="studentClass">Kelas</Label>
              <Input
                id="studentClass"
                placeholder="Contoh: XII IPA 1"
                value={formData.studentClass}
                onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phoneNumber">Nomor HP/WhatsApp</Label>
            <Input
              id="phoneNumber"
              placeholder="Contoh: 081234567890"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Deskripsi Masalah</Label>
            <Textarea
              id="description"
              placeholder="Jelaskan masalah atau hal yang ingin dikonsultasikan..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="priority">Tingkat Prioritas</Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tingkat prioritas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rendah">Rendah - Bisa dijadwalkan fleksibel</SelectItem>
                <SelectItem value="sedang">Sedang - Perlu ditangani dalam minggu ini</SelectItem>
                <SelectItem value="tinggi">Tinggi - Perlu segera ditangani</SelectItem>
                <SelectItem value="darurat">Darurat - Butuh perhatian segera</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preferredDate">Tanggal Pilihan</Label>
              <Input
                id="preferredDate"
                type="date"
                min={today}
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="preferredTime">Waktu Pilihan</Label>
              <Select value={formData.preferredTime} onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih waktu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="08:00">08:00 - 09:00</SelectItem>
                  <SelectItem value="09:00">09:00 - 10:00</SelectItem>
                  <SelectItem value="10:00">10:00 - 11:00</SelectItem>
                  <SelectItem value="11:00">11:00 - 12:00</SelectItem>
                  <SelectItem value="13:00">13:00 - 14:00</SelectItem>
                  <SelectItem value="14:00">14:00 - 15:00</SelectItem>
                  <SelectItem value="15:00">15:00 - 16:00</SelectItem>
                  <SelectItem value="16:00">16:00 - 17:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Kirim ke WhatsApp Guru BK
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CounselingRequestForm;
