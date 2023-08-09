import { FC } from 'react'
import SalesCard from './components/SalesCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPesoSign } from '@fortawesome/free-solid-svg-icons'
import { CreditCard } from 'lucide-react'
import { numberToPriceFormat } from '@/lib/utils'

interface Props {
  
}



const SalesNumbers: FC<Props> = ({}) => {
  
  const MOCK_REVENUE = Math.floor(Math.random() * 100000) + 10000

  return(
    <div className='flex flex-row flex-wrap gap-2 w-full h-full basis-1/3 min-[700px]:flex-col min-[700px]:gap-5'>

      <SalesCard
        title={'Total Revenue'}
        mainContent={`+${numberToPriceFormat(MOCK_REVENUE)}`}
        description={`+${Math.floor(Math.random() * 40) + 2}% from last month. This is mock data for graph simulation`}
        logo={<FontAwesomeIcon icon={faPesoSign} className='w-4 h-4 text-muted-foreground'/>}/>

      <SalesCard
        title="Recent Sales"
        mainContent={`+${numberToPriceFormat(Math.floor(Math.random() * MOCK_REVENUE) + 1000)}`}
        description={`+${Math.floor(Math.random() * 40) + 2}% from last month. This is mock data for graph simulation`}
        logo={<CreditCard className='w-5 h-5 text-muted-foreground'/>}/>

    </div>
  )
}

export default SalesNumbers
