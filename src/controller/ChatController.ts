import { Store } from '../utils/Store';

export class MessageController {
    private store: Store;
  
    constructor() {
        this.store = Store.getInstance();
    }
  
    // Add multiple messages to the store
    public addMessages(messages: Record<string, any>[], chatId: number) {
        const currentMessages = this.store.getState().messages || {};
        const chatMessages = currentMessages[chatId] || [];
    
        // Merge and deduplicate messages by id
        const messagesMap = new Map();
    
        // Add existing messages to map
        chatMessages.forEach((msg: Record<string, any>) => {
            messagesMap.set(msg.id, msg);
        });
    
        // Add new messages to map (will overwrite if same id)
        messages.forEach((msg: Record<string, any>) => {
            messagesMap.set(msg.id, msg);
        });
    
        // Convert map back to array and sort by time
        const updatedMessages = Array.from(messagesMap.values()).sort(
            (a: Record<string, any>, b: Record<string, any>) => {
                const timeA = new Date(a.time).getTime();
                const timeB = new Date(b.time).getTime();
                return timeA - timeB;
            }
        );
    
        // Update store with new messages
        this.store.set(`messages.${chatId}`, updatedMessages);
    }
  
    // Add a single message to the store
    public addMessage(message: Record<string, any>, chatId: number) {
        this.addMessages([message], chatId);
    }
  
    // Get messages for a specific chat
    public getMessages(chatId: number): Record<string, any>[] {
        const state = this.store.getState();
        return state.messages?.[chatId] || [];
    }
}