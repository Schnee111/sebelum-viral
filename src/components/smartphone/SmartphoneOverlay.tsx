import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DialogueLine } from '../../types';
import { ChatBubble } from './ChatBubble';
import { SocialPost } from './SocialPost';
import { PhoneHeader } from './PhoneHeader';

interface SmartphoneOverlayProps {
  /** All dialog lines for this phone scene */
  dialogues: DialogueLine[];
  /** Index of the current dialog line to display up to */
  currentIndex: number;
  /** Whether all dialog lines have been shown */
  isComplete: boolean;
  /** Called when player taps to advance dialog */
  onTap: () => void;
  /** Called when all dialog is done and player taps to continue */
  onContinue: () => void;
}

/**
 * Determines the visual type of a dialog line based on speaker + text content.
 */
function classifyLine(line: DialogueLine): 'notification' | 'social_post' | 'chat_message' | 'narrator' | 'player_thought' | 'group_header' {
  const { speaker, text } = line;

  // Player's own thought
  if (speaker === 'nala') return 'player_thought';

  // Narrator lines
  if (speaker === 'narrator') return 'narrator';

  // System lines — further classify
  if (speaker === 'system') {
    // Notification bracket
    if (text.startsWith('[Notifikasi]') || text.startsWith('[Notif]')) return 'notification';

    // Group chat header bracket
    if (text.startsWith('[Grup') || text.startsWith('[Group')) return 'group_header';

    // Social post: starts with @handle
    if (text.startsWith('@')) return 'social_post';

    // Chat message: "Name: " pattern (Indonesian names)
    if (/^[A-Z][a-z]+(?:\s[A-Z][a-z]+)?:\s/.test(text)) return 'chat_message';

    // Fallback: if it has quotes and a colon, likely chat
    if (text.includes(': "') || text.includes(': \u201c')) return 'chat_message';

    // Default system
    return 'notification';
  }

  // Unknown speaker — treat as chat
  return 'chat_message';
}

/**
 * Parse a chat message "Name: "text"" into sender + message parts.
 */
function parseChatMessage(text: string): { sender: string; message: string } {
  const match = text.match(/^([^:]+):\s*[""\u201c](.+)[""\u201d]?\s*$/);
  if (match) {
    return { sender: match[1]!.trim(), message: match[2]!.trim() };
  }
  // Fallback: split on first colon
  const colonIdx = text.indexOf(': ');
  if (colonIdx > 0) {
    return {
      sender: text.slice(0, colonIdx).trim(),
      message: text.slice(colonIdx + 2).replace(/^[""\u201c]|[""\u201d]?$/g, '').trim(),
    };
  }
  return { sender: '???', message: text };
}

/**
 * Parse a social post "@handle: "text"" into handle + content parts.
 */
function parseSocialPost(text: string): { handle: string; content: string } {
  const match = text.match(/^(@\w+):\s*[""\u201c](.+)[""\u201d]?\s*$/);
  if (match) {
    return { handle: match[1]!, content: match[2]!.trim() };
  }
  // If just starts with @, take the handle
  const handleMatch = text.match(/^(@\w+)\s+(.*)/s);
  if (handleMatch) {
    return { handle: handleMatch[1]!, content: handleMatch[2]!.trim() };
  }
  return { handle: '@unknown', content: text };
}

/**
 * Detect if this is a primarily social-feed scene or chat scene
 * based on the majority of line types.
 */
function detectSceneVariant(dialogues: DialogueLine[]): 'social' | 'chat' {
  let socialCount = 0;
  let chatCount = 0;
  for (const line of dialogues) {
    const type = classifyLine(line);
    if (type === 'social_post' || type === 'notification') socialCount++;
    if (type === 'chat_message') chatCount++;
  }
  return chatCount > socialCount ? 'chat' : 'social';
}

/** Generate a consistent color for a chat sender name */
function senderColor(name: string): string {
  const colors = [
    '#E06C75', '#61AFEF', '#98C379', '#E5C07B', '#C678DD',
    '#56B6C2', '#D19A66', '#BE5046', '#7EC8E3', '#F4A261',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  }
  return colors[Math.abs(hash) % colors.length]!;
}

export function SmartphoneOverlay({
  dialogues,
  currentIndex,
  isComplete,
  onTap,
  onContinue,
}: SmartphoneOverlayProps) {
  const variant = detectSceneVariant(dialogues);
  const visibleLines = dialogues.slice(0, currentIndex + 1);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentIndex, visibleLines]);

  // Auto-advance logic for fast-scrolling comments
  useEffect(() => {
    if (isComplete) return;
    const currentLine = dialogues[currentIndex];
    if (currentLine?.autoAdvance) {
      const delay = currentLine.autoAdvanceDelay || 1000;
      const timer = setTimeout(() => {
        onTap();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, dialogues, isComplete, onTap]);

  const handleTap = () => {
    if (isComplete) {
      onContinue();
    } else {
      onTap();
    }
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 font-body transition-opacity duration-300"
      onClick={handleTap}
    >
      {/* Phone frame with 3D Depth */}
      <div
        className="relative flex flex-col overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_0_2px_rgba(255,255,255,0.1),inset_0_0_20px_rgba(255,255,255,0.05)] transition-transform duration-500 hover:scale-[1.01]"
        style={{
          width: 'min(400px, 92vw)',
          height: 'min(720px, 92vh)',
          backgroundColor: '#0F172A',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 8px #1E293B, 0 0 0 10px #0F172A, inset 0 0 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-black to-navy-900 opacity-90" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full w-full">
          {/* Phone status bar */}
          <PhoneHeader variant={variant} />

          {/* Content area */}
          <div 
            className="flex-1 overflow-y-auto px-4 md:px-5 py-3 md:py-4 space-y-3 md:space-y-4" 
            style={{ scrollbarWidth: 'none' }}
          >
          <AnimatePresence initial={false}>
            {visibleLines.map((line, i) => {
              const lineType = classifyLine(line);
              const isNew = i === currentIndex;

              // Notification banner
              if (lineType === 'notification') {
                return (
                  <motion.div
                    key={line.id}
                    initial={isNew ? { opacity: 0, y: -10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center my-2 md:my-3"
                  >
                    <div
                      className="text-[10px] md:text-[11px] font-bold tracking-wider px-3 md:px-4 py-1 md:py-1.5 rounded-full backdrop-blur-md shadow-sm border border-white/5 uppercase"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: '#94A3B8',
                      }}
                    >
                      {textClean(line.text)}
                    </div>
                  </motion.div>
                );
              }

              // Group header
              if (lineType === 'group_header') {
                return (
                  <motion.div
                    key={line.id}
                    initial={isNew ? { opacity: 0, scale: 0.95 } : false}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-center my-3 md:my-4"
                  >
                    <div
                      className="text-[10px] md:text-xs font-bold tracking-widest px-4 md:px-5 py-1.5 md:py-2 rounded-xl backdrop-blur-sm border border-navy-700/50 shadow-md"
                      style={{
                        backgroundColor: 'rgba(15,23,42,0.6)',
                        color: '#94A3B8',
                      }}
                    >
                      {textClean(line.text)}
                    </div>
                  </motion.div>
                );
              }

              // Narrator
              if (lineType === 'narrator') {
                return (
                  <motion.div
                    key={line.id}
                    initial={isNew ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    className="my-2 px-2"
                  >
                    <p
                      className="text-[10px] md:text-[11px] italic leading-relaxed text-center"
                      style={{ color: '#8E8E93' }}
                    >
                      {line.text}
                    </p>
                  </motion.div>
                );
              }

              // Player thought (Nala)
              if (lineType === 'player_thought') {
                return (
                  <motion.div
                    key={line.id}
                    initial={isNew ? { opacity: 0, y: 5 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    className="my-2 md:my-3 px-2 flex justify-center"
                  >
                    <div
                      className="text-[11px] md:text-[12px] font-medium leading-relaxed px-3 md:px-4 py-2 md:py-2.5 rounded-2xl border backdrop-blur-md shadow-md max-w-[90%] text-center"
                      style={{
                        backgroundColor: 'rgba(139,92,246,0.15)',
                        borderColor: 'rgba(139,92,246,0.3)',
                        color: '#C4B5FD',
                      }}
                    >
                      💭 <span className="italic">{line.text}</span>
                    </div>
                  </motion.div>
                );
              }

              // Social post
              if (lineType === 'social_post') {
                const { handle, content } = parseSocialPost(line.text);
                return (
                  <motion.div
                    key={line.id}
                    initial={isNew ? { opacity: 0, y: 10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <SocialPost handle={handle} content={content} />
                  </motion.div>
                );
              }

              // Chat message
              if (lineType === 'chat_message') {
                const { sender, message } = parseChatMessage(line.text);
                const isNala = sender.toLowerCase() === 'nala';
                return (
                  <motion.div
                    key={line.id}
                    initial={isNew ? { opacity: 0, x: isNala ? 10 : -10 } : false}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <ChatBubble
                      sender={sender}
                      message={message}
                      color={senderColor(sender)}
                      isSelf={isNala}
                    />
                  </motion.div>
                );
              }

              return null;
            })}
          </AnimatePresence>
          <div ref={bottomRef} className="h-2" />
          </div>

          {/* Tap indicator */}
          {!isComplete && (
            <div
              className="flex-shrink-0 text-center py-2.5 md:py-3 bg-gradient-to-t from-black/80 to-transparent relative z-20"
            >
              <motion.span
                className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-white/50"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Ketuk layar untuk lanjut
              </motion.span>
            </div>
          )}

          {isComplete && (
            <motion.div
              className="flex-shrink-0 text-center py-3 md:py-4 bg-gradient-to-t from-black/80 to-transparent relative z-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-game-accent drop-shadow-md">
                Ketuk untuk keluar ▸
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Strip system tags like [Notifikasi], [Grup Chat: ...] */
function textClean(text: string): string {
  return text
    .replace(/^\[Notifikasi\]\s*/, '')
    .replace(/^\[Notif\]\s*/, '')
    .replace(/^\[Grup Chat:\s*/, '')
    .replace(/^\[Group Chat:\s*/, '')
    .replace(/\]$/, '')
    .trim();
}
