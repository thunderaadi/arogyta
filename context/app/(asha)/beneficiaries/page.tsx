'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { differenceInYears } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { getBeneficiaries, Beneficiary } from "@/lib/store";
import { Mic } from "lucide-react";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition"; // Import the new hook

const ITEMS_PER_PAGE = 5;

export default function BeneficiariesPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [allBeneficiaries, setAllBeneficiaries] = useState<Beneficiary[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Voice Recognition Hook Integration ---
  const { isListening, transcript, startListening, hasRecognitionSupport } = useVoiceRecognition();

  useEffect(() => {
    // When the transcript is updated from voice input, set it as the search term
    if (transcript) {
      setSearchTerm(transcript);
    }
  }, [transcript]);
  // -----------------------------------------

  useEffect(() => {
    setAllBeneficiaries(getBeneficiaries());
  }, []);

  const filteredBeneficiaries = allBeneficiaries.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBeneficiaries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBeneficiaries = filteredBeneficiaries.slice(startIndex, endIndex);

  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePreviousPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('beneficiaries')}</h2>
          <p className="text-slate-500">{t('manageBeneficiaries')}</p>
        </div>
        <Link href="/add">
            <Button>{t('addNewBeneficiary')}</Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>{t('allCommunityMembers')}</CardTitle>
            <div className="relative w-full md:w-auto md:max-w-xs">
              <Input 
                placeholder={isListening ? "Listening..." : t('searchByNameOrId')} 
                className="pr-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {hasRecognitionSupport && (
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className={`absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-slate-500 hover:text-slate-900 ${isListening ? 'text-red-500' : ''}`}
                    onClick={startListening}
                >
                    <Mic className="h-4 w-4" />
                </Button>
              )}
            </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Mobile View */}
          <div className="md:hidden p-4 space-y-4">
            {currentBeneficiaries.map((b) => {
              const age = b.age ?? (b.dob ? differenceInYears(new Date(), new Date(b.dob)) : 'N/A');
              return (
                <Card key={b.id} onClick={() => router.push(`/beneficiaries/${b.id}`)} className="cursor-pointer hover:bg-slate-50">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-800">{b.name}</p>
                      <p className="text-sm text-slate-500">{t('id')}: {b.id} • {age} {t('yearsOld')}</p>
                      <p className="text-sm text-slate-500">{t('category')}: {b.category}</p>
                    </div>
                    <Badge variant={b.risk === 'High' ? 'destructive' : 'secondary'}>
                      {b.risk} Risk
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('id')}</TableHead>
                  <TableHead>{t('name')}</TableHead>
                  <TableHead>{t('age')}</TableHead>
                  <TableHead>{t('category')}</TableHead>
                  <TableHead>{t('riskLevel')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentBeneficiaries.map((b) => {
                   const age = b.age ?? (b.dob ? differenceInYears(new Date(), new Date(b.dob)) : 'N/A');
                   return (
                      <TableRow key={b.id} onClick={() => router.push(`/beneficiaries/${b.id}`)} className="cursor-pointer">
                        <TableCell className="font-medium">{b.id}</TableCell>
                        <TableCell>{b.name}</TableCell>
                        <TableCell>{age}</TableCell>
                        <TableCell>{b.category}</TableCell>
                        <TableCell>
                          <Badge variant={b.risk === 'High' ? 'destructive' : b.risk === 'Medium' ? 'default' : 'secondary'} className={b.risk === 'Medium' ? 'bg-yellow-400 text-black' : ''}>
                            {b.risk} Risk
                          </Badge>
                        </TableCell>
                      </TableRow>
                   );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {totalPages > 1 && (
          <CardFooter>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button variant="outline" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <PaginationPrevious href="#" />
                  </Button>
                </PaginationItem>
                <PaginationItem className="font-medium px-4">
                  Page {currentPage} of {totalPages}
                </PaginationItem>
                <PaginationItem>
                  <Button variant="outline" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <PaginationNext href="#" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}