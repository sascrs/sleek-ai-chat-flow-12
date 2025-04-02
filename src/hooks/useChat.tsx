
// This hook is a wrapper around the ChatContext for convenience
import { useChat as useChatContext } from '@/context/ChatContext';

export function useChat() {
  return useChatContext();
}
