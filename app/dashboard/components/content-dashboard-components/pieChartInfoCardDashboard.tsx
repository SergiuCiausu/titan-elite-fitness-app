"use client";

import { Label, Pie, PieChart } from "recharts";

export function PieChartInfoCardDashboard({ centerLabel, data }: { centerLabel: string, data: { value: number, fill: string }[] }) {
    return (
        <PieChart width={200} height={200}>
            <Pie
                data={data}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={6}
                stroke="transparent"
            >
                <Label
                    position="center"
                    content={() => (
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-accent text-3xl logo font-semibold"
                        >
                                {centerLabel}
                        </text>
                    )}
                />
            </Pie>
        </PieChart>
    )
}