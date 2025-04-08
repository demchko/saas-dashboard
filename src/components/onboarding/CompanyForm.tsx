import { Button } from "../ui/button"

export const CompanyForm = ({ backToType }: { backToType: () => void }) => {
  return (
    <div>
      <Button onClick={backToType} >Back</Button>
      Company Form
    </div>
  )
}