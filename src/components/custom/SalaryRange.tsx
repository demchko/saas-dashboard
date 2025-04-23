import { useState } from "react"
import { Slider } from "../ui/slider"
import { useController, type Control } from "react-hook-form";

export const SalaryRange = ({ control }: {
  control: Control<any>
}) => {
  const { field: fromField } = useController({
    name: "salaryFrom",
    control
  });

  const { field: toField } = useController({
    name: "salaryTo",
    control
  })

  const [salary, setSalary] = useState<number[]>([fromField.value || 1000, toField.value || 2000]);

  const handleChange = (val: number[]) => {
    setSalary([val[0], val[1]]);
    fromField.onChange(val[0]);
    toField.onChange(val[1]);
  }

  return (
    <div className="w-full" >
      <Slider
        min={300}
        max={10000}
        value={salary}
        step={100}
        onValueChange={handleChange}
        defaultValue={salary}
        className="py-4"
      />
      <div className="w-full flex justify-between items-center" >
        <span>{salary[0]}$</span>
        <span>{salary[1]}$</span>
      </div>
    </div>
  )
}