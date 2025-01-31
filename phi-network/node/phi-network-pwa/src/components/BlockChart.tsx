// src/components/BlockChart.tsx
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface BlockData {
  blockNumber: number;
  transactions: number;
  timestamp: string;
}

interface BlockChartProps {
  data: BlockData[];
}

const BlockChart: React.FC<BlockChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64 mt-8">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="blockNumber" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="transactions" stroke="#4ade80" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BlockChart;
