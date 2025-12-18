"use client";
import { useTranslation } from "react-i18next";
import { useParams, notFound } from "next/navigation";
import { findBeneficiaryById, BeneficiaryCategory } from "@/lib/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Edit,
  PlusCircle,
  CheckCircle,
  Clock,
  HeartPulse,
  Droplet,
  Phone,
  Home,
  Fingerprint,
  Users,
  BadgeIndianRupee,
  Baby,
  ListChecks,
  Cake,
} from "lucide-react";
import Link from "next/link";
import { differenceInYears, format } from "date-fns";

export default function BeneficiaryDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const id = params.id as string;
  const beneficiary = findBeneficiaryById(id);

  if (!beneficiary) {
    return notFound();
  }

  const age =
    beneficiary.age ??
    (beneficiary.dob
      ? differenceInYears(new Date(), new Date(beneficiary.dob))
      : "N/A");

  const childCategories: BeneficiaryCategory[] = ["Newborn", "Infant", "Child"];
  const isChild = childCategories.includes(beneficiary.category);
  const isMaternal = beneficiary.category === "Pregnant";

  const tabs = [];
  if (isMaternal) tabs.push("anc");
  if (isChild) {
    tabs.push("child");
    tabs.push("immunization");
  }
  const defaultTab = tabs[0] || (tabs.length > 0 ? tabs[0] : undefined);

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <Link
        href="/beneficiaries"
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("backToBeneficiaries")}
      </Link>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-4 flex-wrap">
              <CardTitle className="text-2xl">{beneficiary.name}</CardTitle>
              <Badge
                variant={
                  beneficiary.risk === "High" ? "destructive" : "secondary"
                }
              >
                {beneficiary.risk} {t("riskLevel")}
              </Badge>
            </div>
            <CardDescription className="mt-2 text-base">
              {beneficiary.guardianName &&
                `${t("guardianName")}: ${beneficiary.guardianName}`}
            </CardDescription>
          </div>
          <div className="flex gap-2 w-full sm:w-auto shrink-0">
            <Button variant="outline" className="flex-1 sm:flex-initial">
              <Edit className="w-4 h-4 mr-2" /> {t("editDetails")}
            </Button>
            <Button asChild className="flex-1 sm:flex-initial">
              <Link href={`/beneficiaries/${id}/add-visit`}>
                <PlusCircle className="w-4 h-4 mr-2" /> {t("newVisit")}
              </Link>
            </Button>
            <Button variant="secondary" className="flex-1 sm:flex-initial">
              <ListChecks className="w-4 h-4 mr-2" /> {("View Report")}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm text-slate-500">{t("category")}</p>
            <p className="font-semibold">
              {t(
                `categoryOptions.${beneficiary.category.toLowerCase()}` as any,
                beneficiary.category
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">{t("age")}</p>
            <p className="font-semibold">
              {age} {t("yearsOld")}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">{t("gender")}</p>
            <p className="font-semibold">
              {t(
                `genderOptions.${beneficiary.gender}` as any,
                beneficiary.gender
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">{t("lastVisit")}</p>
            <p className="font-semibold">
              {format(new Date(beneficiary.lastVisit), "PPP")}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              {t("contactAndHousehold")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4" /> {beneficiary.contact}
            </div>
            <div className="flex items-start gap-3">
              <Home className="w-4 h-4" />{" "}
              {`${beneficiary.address}, ${beneficiary.village}`}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              {t("socialProfile")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" />{" "}
              {beneficiary.socialCategory || "N/A"}
            </div>
            <div className="flex items-center gap-3">
              <BadgeIndianRupee className="w-4 h-4" />{" "}
              {beneficiary.economicStatus || "N/A"}
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              {t("healthInformation")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Fingerprint className="w-4 h-4" /> {t("aadhaarNumber")}:{" "}
              {beneficiary.aadhaar || "N/A"}
            </div>
            <div className="flex items-center gap-3">
              <Droplet className="w-4 h-4" /> {t("bloodGroupOptional")}:{" "}
              {beneficiary.bloodGroup}
            </div>
            <div className="flex items-start gap-3">
              <HeartPulse className="w-4 h-4" />{" "}
              {t("chronicConditionsOptional")}: {beneficiary.chronicConditions}
            </div>
          </CardContent>
        </Card>
      </div>

      {isMaternal && (
        <Card>
          <CardHeader>
            <CardTitle>{t("addBeneficiary.pregnancyHistory")}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-slate-500">{t("lmpDate")}</p>
              <p className="font-semibold">
                {beneficiary.details.lmp
                  ? format(new Date(beneficiary.details.lmp), "PPP")
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-slate-500">{t("edd")}</p>
              <p className="font-semibold">
                {beneficiary.details.edd
                  ? format(new Date(beneficiary.details.edd), "PPP")
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-slate-500">
                {t("gravida")}/{t("parity")}
              </p>
              <p className="font-semibold">
                {beneficiary.details.gravida || "N/A"} /{" "}
                {beneficiary.details.parity || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-slate-500">{t("jsyRegistered")}</p>
              <p className="font-semibold">
                {beneficiary.isJSYRegistered ? t("yes") : t("no")}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-slate-500">{t("highRiskFactors")}</p>
              <p className="font-semibold">
                {beneficiary.details.highRiskFactors?.join(", ") || "None"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {(beneficiary.category === "Newborn" ||
        beneficiary.category === "Infant") &&
        beneficiary.details.birthWeight && (
          <Card>
            <CardHeader>
              <CardTitle>{t("addBeneficiary.birthDetails")}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-slate-500">{t("birthWeight")}</p>
                <p className="font-semibold">
                  {beneficiary.details.birthWeight} kg
                </p>
              </div>
              <div>
                <p className="text-slate-500">{t("placeOfDelivery")}</p>
                <p className="font-semibold">
                  {beneficiary.details.deliveryPlace}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

      <Tabs
        defaultValue={defaultTab}
        className={tabs.length === 0 ? "hidden" : ""}
      >
        <TabsList
          className="grid w-full"
          style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
        >
          {isMaternal && (
            <TabsTrigger value="anc">
              <HeartPulse className="w-4 h-4 mr-2" /> {t("maternalHealth")}
            </TabsTrigger>
          )}
          {isChild && (
            <TabsTrigger value="child">
              <Cake className="w-4 h-4 mr-2" /> {t("childHealth")}
            </TabsTrigger>
          )}
          {isChild && (
            <TabsTrigger value="immunization">
              <ListChecks className="w-4 h-4 mr-2" /> {t("immunization")}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="anc">
          <Card>
            <CardHeader>
              <CardTitle>{t("visitHistory")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("date")}</TableHead>
                    <TableHead>{t("weight")}</TableHead>
                    <TableHead>BP</TableHead>
                    <TableHead>IFA</TableHead>
                    <TableHead>TT</TableHead>
                    <TableHead>{t("notes")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {beneficiary.details.ancVisits?.map((v, i) => (
                    <TableRow key={i}>
                      <TableCell>{format(new Date(v.date), "PPP")}</TableCell>
                      <TableCell>{v.weight} kg</TableCell>
                      <TableCell>{v.bp}</TableCell>
                      <TableCell>{v.ifaTablets}</TableCell>
                      <TableCell>{v.ttInjection}</TableCell>
                      <TableCell>{v.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="child">
          <Card>
            <CardHeader>
              <CardTitle>{t("visitHistory")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("date")}</TableHead>
                    <TableHead>{t("weight")}</TableHead>
                    <TableHead>{t("height")}</TableHead>
                    <TableHead>MUAC</TableHead>
                    <TableHead>{t("diarrhea")}</TableHead>
                    <TableHead>ARI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {beneficiary.details.childVisits?.map((v, i) => (
                    <TableRow key={i}>
                      <TableCell>{format(new Date(v.date), "PPP")}</TableCell>
                      <TableCell>{v.weight} kg</TableCell>
                      <TableCell>{v.height} cm</TableCell>
                      <TableCell>{v.muac} cm</TableCell>
                      <TableCell>
                        {v.hasDiarrhea ? t("yes") : t("no")}
                      </TableCell>
                      <TableCell>{v.hasARI ? t("yes") : t("no")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="immunization">
          <Card>
            <CardHeader>
              <CardTitle>{t("immunizationSchedule")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("vaccine")}</TableHead>
                    <TableHead>{t("dueDate")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {beneficiary.details.immunizations?.map((imm, i) => (
                    <TableRow key={i}>
                      <TableCell>{imm.vaccine}</TableCell>
                      <TableCell>{format(new Date(imm.date), "PPP")}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            imm.status === "Done"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {imm.status === "Done" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {imm.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
