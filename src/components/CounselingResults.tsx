
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/contexts/AppContext";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const CounselingResults = () => {
  const { counselingSessions, updateSession, updateRequestStatus } = useApp();
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [resultData, setResultData] = useState({
    notes: "",
    progress: "",
    nextSteps: "",
    followUpDate: "",
  });
  const { toast } = useToast();

  const handleSubmitResult = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSession) return;

    const session = counselingSessions.find(s => s.id === selectedSession);
    if (!session) return;

    updateSession(selectedSession, {
      status: 'selesai',
      notes: resultData.notes,
      progress: `${resultData.progress}\n\nLangkah Selanjutnya: ${resultData.nextSteps}\nTindak Lanjut: ${resultData.followUpDate}`,
    });

    // Update the original request status to completed
    updateRequestStatus(session.requestId, 'selesai', resultData.notes);

    toast({
      title: "Hasil Konseling Disimpan",
      description: "Catatan hasil dan progress konseling berhasil disimpan",
    });

    setSelectedSession(null);
    setResultData({ notes: "", progress: "", nextSteps: "", followUpDate: "" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'dijadwalkan':
        return <Badge variant="secondary">Dijadwalkan</Badge>;
      case 'berlangsung':
        return <Badge className="bg-blue-500">Berlangsung</Badge>;
      case 'selesai':
        return <Badge className="bg-green-500">Selesai</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const completedSessions = counselingSessions.filter(s => s.status === 'selesai');
  const activeSessions = counselingSessions.filter(s => s.status !== 'selesai');

  return (
    <div className="space-y-6">
      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Sesi Konseling Aktif</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Siswa</TableHead>
                <TableHead>Jenis Konseling</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{session.studentName}</p>
                      <p className="text-sm text-gray-600">{session.studentClass}</p>
                    </div>
                  </TableCell>
                  <TableCell>{session.serviceType}</TableCell>
                  <TableCell>
                    {format(new Date(session.scheduledDate), 'dd MMM yyyy', { locale: id })}
                  </TableCell>
                  <TableCell>{session.scheduledTime}</TableCell>
                  <TableCell>{getStatusBadge(session.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {session.status === 'dijadwalkan' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateSession(session.id, { status: 'berlangsung' })}
                        >
                          Mulai Sesi
                        </Button>
                      )}
                      {session.status === 'berlangsung' && (
                        <Dialog open={selectedSession === session.id} onOpenChange={(open) => !open && setSelectedSession(null)}>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm"
                              onClick={() => setSelectedSession(session.id)}
                            >
                              Selesaikan Sesi
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Catatan Hasil Konseling</DialogTitle>
                              <DialogDescription>
                                Isi catatan hasil dan progress konseling untuk {session.studentName}
                              </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmitResult} className="space-y-4">
                              <div>
                                <Label htmlFor="notes">Catatan Sesi</Label>
                                <Textarea
                                  id="notes"
                                  placeholder="Catatan detail mengenai sesi konseling..."
                                  value={resultData.notes}
                                  onChange={(e) => setResultData({ ...resultData, notes: e.target.value })}
                                  required
                                  rows={4}
                                />
                              </div>
                              <div>
                                <Label htmlFor="progress">Progress/Perkembangan</Label>
                                <Textarea
                                  id="progress"
                                  placeholder="Perkembangan yang dicapai siswa..."
                                  value={resultData.progress}
                                  onChange={(e) => setResultData({ ...resultData, progress: e.target.value })}
                                  required
                                  rows={3}
                                />
                              </div>
                              <div>
                                <Label htmlFor="nextSteps">Langkah Selanjutnya</Label>
                                <Textarea
                                  id="nextSteps"
                                  placeholder="Rekomendasi dan langkah selanjutnya..."
                                  value={resultData.nextSteps}
                                  onChange={(e) => setResultData({ ...resultData, nextSteps: e.target.value })}
                                  required
                                  rows={3}
                                />
                              </div>
                              <div>
                                <Label htmlFor="followUpDate">Tindak Lanjut</Label>
                                <Input
                                  id="followUpDate"
                                  placeholder="Tanggal tindak lanjut atau evaluasi..."
                                  value={resultData.followUpDate}
                                  onChange={(e) => setResultData({ ...resultData, followUpDate: e.target.value })}
                                />
                              </div>
                              <Button type="submit" className="w-full">
                                Simpan Hasil Konseling
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {activeSessions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    Tidak ada sesi konseling aktif
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Completed Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Riwayat Konseling Selesai</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Siswa</TableHead>
                <TableHead>Jenis Konseling</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{session.studentName}</p>
                      <p className="text-sm text-gray-600">{session.studentClass}</p>
                    </div>
                  </TableCell>
                  <TableCell>{session.serviceType}</TableCell>
                  <TableCell>
                    {format(new Date(session.scheduledDate), 'dd MMM yyyy', { locale: id })}
                  </TableCell>
                  <TableCell>{getStatusBadge(session.status)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          Lihat Catatan
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Catatan Konseling - {session.studentName}</DialogTitle>
                          <DialogDescription>
                            {session.serviceType} • {format(new Date(session.scheduledDate), 'dd MMM yyyy', { locale: id })}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Catatan Sesi:</Label>
                            <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">
                              {session.notes || 'Tidak ada catatan'}
                            </div>
                          </div>
                          <div>
                            <Label>Progress & Langkah Selanjutnya:</Label>
                            <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm whitespace-pre-wrap">
                              {session.progress || 'Tidak ada catatan progress'}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
              {completedSessions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                    Belum ada konseling yang selesai
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounselingResults;
