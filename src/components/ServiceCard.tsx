import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Scissors } from "lucide-react"; // Or other relevant icons

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  icon?: React.ReactNode;
}

export function ServiceCard({ title, description, price, icon }: ServiceCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {icon || <Scissors className="h-5 w-5 text-muted-foreground" />}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <CardDescription className="mb-4">{description}</CardDescription>
        <p className="text-2xl font-bold">{price}</p>
      </CardContent>
    </Card>
  );
}