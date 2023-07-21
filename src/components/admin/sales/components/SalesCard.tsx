import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { SVGProps } from "react";

interface Props {
  title: string
  mainContent: string
  description: string
  logo: React.ReactElement<SVGProps<SVGSVGElement>>;
}

const SalesCard = ({title, mainContent, description, logo}:Props) => {

  return(
    <Card className="flex-grow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {logo}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{mainContent}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

export default SalesCard