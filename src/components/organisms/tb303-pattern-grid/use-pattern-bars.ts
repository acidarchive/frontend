import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export function usePatternBars() {
  const [activeBar, setActiveBar] = useState(0);
  const { control, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'bars' });

  const handleAddBar = () => {
    const activeSteps = getValues(`bars.${activeBar}.steps`);
    append({ steps: activeSteps ?? [] });
    setActiveBar(fields.length);
  };

  const handleRemoveBar = (index: number) => {
    remove(index);
    const remaining = fields.length - 1;
    const nextIndex = index >= remaining ? Math.max(0, remaining - 1) : index;
    setActiveBar(nextIndex);
  };

  return { fields, activeBar, setActiveBar, handleAddBar, handleRemoveBar };
}
