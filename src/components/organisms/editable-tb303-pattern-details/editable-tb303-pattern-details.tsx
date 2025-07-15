import { useFormContext } from 'react-hook-form';

import { InputElement } from '@/components/molecules/input-element';
import { SwitchElement } from '@/components/molecules/switch-element';
import { Button } from '@/components/ui/button';
import { pattern_name_validation } from '@/utils/input-validations';

export function EditableTB303PatternDetails() {
  const {
    reset,
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <InputElement {...pattern_name_validation} />
        <SwitchElement
          label="Make this pattern public"
          description="If enabled, this pattern will be visible to other users."
          name="is_public"
        />
      </div>
      <div className="mt-8 flex gap-8">
        <Button type="button" variant="secondary" onClick={() => reset()}>
          Reset
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  );
}
