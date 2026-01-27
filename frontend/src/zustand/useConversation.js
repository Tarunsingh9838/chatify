import { create } from 'zustand'

const useConversation = create((set, get) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messagesOrUpdater) =>
    set((state) => ({
      messages: typeof messagesOrUpdater === 'function'
        ? messagesOrUpdater(state.messages)
        : messagesOrUpdater,
    })),
  // Search functionality
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));

export default useConversation;