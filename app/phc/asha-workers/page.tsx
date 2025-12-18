// app/phc/asha-workers/page.tsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { ashaWorkers, AshaWorker } from '@/lib/asha-data';
import { formatDistanceToNow } from 'date-fns';

const ITEMS_PER_PAGE = 5;

export default function AshaWorkersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const totalPages = Math.ceil(ashaWorkers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentWorkers = ashaWorkers.slice(startIndex, endIndex);

  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePreviousPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Users className="h-8 w-8" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">ASHA Worker Management</h2>
          <p className="text-slate-500">View performance and manage assigned workers.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>ASHA Worker Roster</CardTitle>
          <CardDescription>Performance overview for all workers in the region. Click a worker to view their assigned beneficiaries.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Village</TableHead>
                <TableHead>Beneficiaries</TableHead>
                <TableHead>High-Risk</TableHead>
                <TableHead>Last Sync</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentWorkers.map((worker) => (
                <TableRow key={worker.id} onClick={() => router.push(`/phc/asha-workers/${worker.id}`)} className="cursor-pointer hover:bg-slate-50">
                  <TableCell className="font-medium">{worker.name}</TableCell>
                  <TableCell>{worker.village}</TableCell>
                  <TableCell>{worker.beneficiaries}</TableCell>
                  <TableCell className="font-semibold text-red-600">{worker.highRisk}</TableCell>
                  <TableCell>{formatDistanceToNow(new Date(worker.lastSync), { addSuffix: true })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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