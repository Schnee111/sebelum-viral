import type { ChapterData } from '../../types';

import { scenes } from './scenes';
import { evidences } from './evidences';
import { rules } from './rules';
import { editorialDecisions } from './editorials';

export const chapter1: ChapterData = {
  id: 'CH1',
  title: 'Rumor Pertama',
  scenes,
  evidences,
  rules,
  claimRules: [],
  editorialDecisions,
};

export { scenes } from './scenes';
export { evidences } from './evidences';
export { rules } from './rules';
export { editorialDecisions } from './editorials';
