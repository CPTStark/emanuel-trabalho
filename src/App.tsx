import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Animal {
  name: string;
  numbers: string;
}

interface ChartData {
  name: string;
  count: number;
  probability: number;
}

const animals: Animal[] = [
  { name: "Avestruz", numbers: "01-02-03-04" },
  { name: "Águia", numbers: "05-06-07-08" },
  { name: "Burro", numbers: "09-10-11-12" },
  { name: "Cachorro", numbers: "13-14-15-16" },
  { name: "Cavalo", numbers: "17-18-19-20" },
  { name: "Camelo", numbers: "21-22-23-24" },
  { name: "Cobra", numbers: "25-26-27-28" },
  { name: "Coelho", numbers: "29-30-31-32" },
  { name: "Galo", numbers: "33-34-35-36" },
  { name: "Gato", numbers: "37-38-39-40" },
  { name: "Jacaré", numbers: "41-42-43-44" },
  { name: "Leão", numbers: "45-46-47-48" },
  { name: "Macaco", numbers: "49-50-51-52" },
  { name: "Porco", numbers: "53-54-55-56" },
  { name: "Pavão", numbers: "57-58-59-60" },
  { name: "Peru", numbers: "61-62-63-64" },
  { name: "Touro", numbers: "65-66-67-68" },
  { name: "Tigre", numbers: "69-70-71-72" },
  { name: "Urso", numbers: "73-74-75-76" },
  { name: "Veado", numbers: "77-78-79-80" },
  { name: "Vaca", numbers: "81-82-83-84" },
  { name: "Elefante", numbers: "85-86-87-88" },
  { name: "Carneiro", numbers: "89-90-91-92" },
  { name: "Bicho-Preguiça", numbers: "93-94-95-96" },
  { name: "Jacutinga", numbers: "97-98-99-00" },
];

const chartConfig = {
  count: {
    label: "Quantidade de Números",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function Grafic({ type }: { type: string }) {
  const chartData: ChartData[] = animals.map((animal) => {
    const count = animal.numbers.split("-").length;
    let probability = 0;

    switch (type) {
      case "grupo":
        probability = 1 / 25;
        break;
      case "dezena":
        probability = 1 / 100;
        break;
      case "centena":
        probability = 1 / 1000;
        break;
      case "milhar":
        probability = 1 / 10000;
        break;
      default:
        probability = 0;
    }

    return {
      name: animal.name,
      count,
      probability: probability * 100,
    };
  });

  return (
    <Card className="w-[1200px]">
      <CardHeader>
        <CardTitle>Jogo do Bicho</CardTitle>
        <CardDescription>Probabilidades por tipo de aposta</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="probability"
              radius={8}
              fill="blue"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Mostrando probabilidades <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Baseado no tipo de aposta selecionado
        </div>
      </CardFooter>
    </Card>
  );
}

function App() {
  const [type, setType] = useState("grupo");

  return (
    <div className="w-screen h-screen">
      <div className="w-full py-8 flex items-center justify-center">
        <h1 className="text-3xl font-bold">Probabilidades do Jogo do Bicho</h1>
      </div>
      <div className="flex justify-center items-center flex-col gap-4">
        <p className="text-gray-500 text-xl">Selecione o tipo de aposta</p>
        <Select onValueChange={(value) => setType(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Aposta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grupo">Grupo (1/25)</SelectItem>
            <SelectItem value="dezena">Dezena (1/100)</SelectItem>
            <SelectItem value="centena">Centena (1/1000)</SelectItem>
            <SelectItem value="milhar">Milhar (1/10000)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex items-center justify-center mt-10">
        <Grafic type={type} />
      </div>
    </div>
  );
}

export default App;
