import { getRandomTB303Pattern } from '@/dal';
import { RandomTB303Pattern } from '@/features/random-pattern';

export default async function RandomPatternPage() {
  const pattern = await getRandomTB303Pattern();

  return <RandomTB303Pattern pattern={pattern} />;
}
