
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface CounselingRequestFormProps {
  serviceType: string;
  children: React.ReactNode;
}

const CounselingRequestForm = ({ serviceType, children }: CounselingRequestFormProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    kelas: "",
    jenisKonseling: serviceType,
    masalah: "",
    tingkatUrgency: "",
    tanggalPreferensi: undefined as Date | undefined,
    waktuPreferensi: "",
    catatanTambahan: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.nama || !formData.kelas || !formData.masalah || !formData.tingkatUrgency) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive",
      });
      return;
    }

    console.log("Form data:", formData);
    
    toast({
      title: "Permintaan Konseling Dikirim",
      description: `Permintaan konseling ${serviceType} telah dikirim ke Guru BK. Anda akan mendapat notifikasi untuk jadwal selanjutnya.`,
    });
    
    setOpen(false);
    // Reset form
    setFormData({
      nama: "",
      kelas: "",
      jenisKonseling: serviceType,
      masalah: "",
      tingkatUrgency: "",
      tanggalPreferensi: undefined,
      waktuPreferensi: "",
      catatanTambahan: ""
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Form Permintaan Konseling {serviceType}</DialogTitle>
          <DialogDescription>
            Isi form di bawah ini untuk mengajukan layanan konseling. Guru BK akan menghubungi Anda untuk konfirmasi jadwal.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nama">Nama Lengkap *</Label>
            <Input
              id="nama"
              value={formData.nama}
              onChange={(e) => handleInputChange("nama", e.target.value)}
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="kelas">Kelas *</Label>
            <Select value={formData.kelas} onValueChange={(value) => handleInputChange("kelas", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="X-1">X-1</SelectItem>
                <SelectItem value="X-2">X-2</SelectItem>
                <SelectItem value="X-3">X-3</SelectItem>
                <SelectItem value="XI-IPA-1">XI IPA 1</SelectItem>
                <SelectItem value="XI-IPA-2">XI IPA 2</SelectItem>
                <SelectItem value="XI-IPS-1">XI IPS 1</SelectItem>
                <SelectItem value="XI-IPS-2">XI IPS 2</SelectItem>
                <SelectItem value="XII-IPA-1">XII IPA 1</SelectItem>
                <SelectItem value="XII-IPA-2">XII IPA 2</SelectItem>
                <SelectItem value="XII-IPS-1">XII IPS 1</SelectItem>
                <SelectItem value="XII-IPS-2">XII IPS 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="masalah">Deskripsi Masalah/Keluhan *</Label>
            <Textarea
              id="masalah"
              value={formData.masalah}
              onChange={(e) => handleInputChange("masalah", e.target.value)}
              placeholder="Jelaskan masalah atau keluhan yang ingin dikonsultasikan"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="urgency">Tingkat Urgensi *</Label>
            <Select value={formData.tingkatUrgency} onValueChange={(value) => handleInputChange("tingkatUrgency", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tingkat urgensi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rendah">Rendah - Bisa dijadwalkan minggu depan</SelectItem>
                <SelectItem value="sedang">Sedang - Perlu dalam 2-3 hari</SelectItem>
                <SelectItem value="tinggi">Tinggi - Perlu segera (hari ini/besok)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Tanggal Preferensi</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.tanggalPreferensi && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.tanggalPreferensi ? (
                    format(formData.tanggalPreferensi, "PPP", { locale: localeId })
                  ) : (
                    <span>Pilih tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.tanggalPreferensi}
                  onSelect={(date) => handleInputChange("tanggalPreferensi", date)}
                  disabled={(date) =>
                    date < new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="waktu">Waktu Preferensi</Label>
            <Select value={formData.waktuPreferensi} onValueChange={(value) => handleInputChange("waktuPreferensi", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih waktu preferensi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="08:00-09:00">08:00 - 09:00</SelectItem>
                <SelectItem value="09:00-10:00">09:00 - 10:00</SelectItem>
                <SelectItem value="10:00-11:00">10:00 - 11:00</SelectItem>
                <SelectItem value="11:00-12:00">11:00 - 12:00</SelectItem>
                <SelectItem value="13:00-14:00">13:00 - 14:00</SelectItem>
                <SelectItem value="14:00-15:00">14:00 - 15:00</SelectItem>
                <SelectItem value="15:00-16:00">15:00 - 16:00</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="catatan">Catatan Tambahan</Label>
            <Textarea
              id="catatan"
              value={formData.catatanTambahan}
              onChange={(e) => handleInputChange("catatanTambahan", e.target.value)}
              placeholder="Informasi tambahan yang perlu diketahui Guru BK"
              rows={2}
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Batal
            </Button>
            <Button type="submit" className="flex-1">
              Kirim Permintaan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CounselingRequestForm;
