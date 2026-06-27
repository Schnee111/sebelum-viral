import type { ChapterData } from '../../types';

import { scenes } from './scenes';
import { evidences } from './evidences';
import { rules } from './rules';
import { editorialDecisions, editorialOutcomes } from './editorials';

export const chapter1: ChapterData = {
  id: 'CH1',
  title: 'Rumor Pertama',
  scenes,
  evidences,
  rules,
  claimRules: [],
  editorialDecisions,
  editorialOutcomes,
};

export { scenes } from './scenes';
export { evidences } from './evidences';
export { rules } from './rules';
export { editorialDecisions, editorialOutcomes } from './editorials';
