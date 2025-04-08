import { Button } from "../ui/button"

export const SeekerForm = ({ backToType }: { backToType: () => void }) => {
  return (
    <div>
      <Button onClick={backToType} >Back</Button>
      Seeker Form
    </div>
  )
}