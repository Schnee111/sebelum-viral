import { Background } from '../visual-novel/Background';
import { CharacterSprite } from '../visual-novel/CharacterSprite';
import { DialogBox } from '../visual-novel/DialogBox';
import { ChoicePanel } from '../visual-novel/ChoicePanel';
import type { Scene, DialogueLine, Evidence } from '../../types';

interface StoryScreenProps {
  scene: Scene;
  currentLine: DialogueLine | null;
  inventory: Evidence[];
  onChoose: (choiceId: string) => void;
  onTapDialog: () => void;
  isDialogComplete: boolean;
}

export function StoryScreen({
  scene,
  currentLine,
  onChoose,
  onTapDialog,
  isDialogComplete,
}: StoryScreenProps) {
  const showChoices = isDialogComplete && scene.choices && scene.choices.length > 0;

  return (
    <div className="absolute inset-0 overflow-hidden font-body">
      {/* Background */}
      <Background src={`/assets/backgrounds/${scene.background}.jpg`} />

      {/* Characters */}
      {scene.characters.map((char) => (
        <CharacterSprite
          key={char.characterId}
          characterId={char.characterId}
          expression={
            currentLine?.speaker === char.characterId
              ? currentLine.expression
              : char.initialExpression
          }
          position={char.position}
          isActive={currentLine?.speaker === char.characterId || !currentLine}
        />
      ))}

      {/* Dialog */}
      {currentLine && !isDialogComplete && (
        <DialogBox line={currentLine} onTap={onTapDialog} />
      )}

      {/* Choices */}
      {showChoices && (
        <ChoicePanel
          choices={scene.choices!}
          onSelect={onChoose}
        />
      )}
    </div>
  );
}
