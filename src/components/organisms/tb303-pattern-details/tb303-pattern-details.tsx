import { useFormContext } from 'react-hook-form';

import { InputElement } from '@/components/molecules/input-element';
import { SwitchElement } from '@/components/molecules/switch-element';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { pattern_name_validation } from '@/utils/input-validations';

export interface TB303PatternDetailsProps {
  readonly?: boolean;
}

export function TB303PatternDetails({
  readonly = false,
}: TB303PatternDetailsProps) {
  const {
    reset,
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Card className="px-4 py-4 gap-4">
      <CardContent className="px-0">
        <InputElement {...pattern_name_validation} disabled={readonly} />
        <SwitchElement
          label="Make this pattern public"
          description="If enabled, this pattern will be visible to other users."
          name="is_public"
          disabled={readonly}
        />
      </CardContent>
      {!readonly && (
        <CardFooter className="flex justify-end gap-4 px-0">
          <Button type="button" variant="secondary" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={isSubmitting} className="w-20">
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
