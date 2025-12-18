// components/reports/Charts.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { getBeneficiaries } from "@/lib/store";
import { useState, useEffect } from "react";

// Define the structure for the chart data
interface BeneficiaryChartData {
    name: string;
    value: number;
    fill: string;
}

// Mock Data for High-Risk Trend Chart
const riskData = [
    { month: 'Apr', highRisk: 4 },
    { month: 'May', highRisk: 3 },
    { month: 'Jun', highRisk: 5 },
    { month: 'Jul', highRisk: 4 },
    { month: 'Aug', highRisk: 6 },
    { month: 'Sep', highRisk: 8 },
];

// Custom label function to render percentages inside the pie slices
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6; // Position label inside
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent === 0) return null;

    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12px" fontWeight="bold">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


export function ReportCharts() {
    const [beneficiaryData, setBeneficiaryData] = useState<BeneficiaryChartData[]>([]);

    useEffect(() => {
        const allBeneficiaries = getBeneficiaries();

        const generalCount = allBeneficiaries.filter(b => b.category === 'General').length;
        const childCount = allBeneficiaries.filter(b => b.category === 'Child').length;
        const pregnantCount = allBeneficiaries.filter(b => b.category === 'Pregnant').length;

        const dynamicData = [
            { name: 'General', value: generalCount, fill: '#8884d8' },
            { name: 'Child (0-5)', value: childCount, fill: '#82ca9d' },
            { name: 'Pregnant', value: pregnantCount, fill: '#ffc658' },
        ].filter(item => item.value > 0);
        
        setBeneficiaryData(dynamicData);

    }, []);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Beneficiary Distribution Chart */}
        <Card className="lg:col-span-1 flex flex-col">
            <CardHeader>
                <CardTitle>Beneficiary Distribution</CardTitle>
                <CardDescription>Breakdown by category</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie 
                            data={beneficiaryData} 
                            dataKey="value" 
                            nameKey="name" 
                            cx="50%" 
                            cy="50%" 
                            outerRadius={90} 
                            labelLine={false}
                            label={renderCustomizedLabel} // Use the custom inner label
                        >
                            {beneficiaryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: "hsl(var(--card))",
                            borderColor: "hsl(var(--border))",
                          }}
                        />
                        <Legend iconSize={10} wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        {/* High Risk Cases Chart */}
        <Card className="lg:col-span-2 flex flex-col">
            <CardHeader>
                <CardTitle>High-Risk Cases Trend</CardTitle>
                <CardDescription>New high-risk cases identified per month</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={riskData}>
                        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                            cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }}
                            contentStyle={{
                                background: "hsl(var(--card))",
                                borderColor: "hsl(var(--border))",
                            }}
                        />
                        <Bar dataKey="highRisk" fill="#ef4444" radius={[4, 4, 0, 0]} name="High-Risk Cases"/>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    </div>
  )
}