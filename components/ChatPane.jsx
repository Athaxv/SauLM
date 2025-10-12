"use client";

import {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { Pencil, RefreshCw, Check, X, Square } from "lucide-react";
import Message from "./Message";
import Composer from "./Composer";
import { cls, timeAgo } from "./utils";

function ThinkingMessage({ onPause, selectedModel }) {
  return (
    <Message role="assistant" selectedModel={selectedModel}>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-red-400 [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-pink-400 [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-rose-400"></div>
        </div>
        <span className="text-sm text-gray-600">AI is thinking...</span>
        <button
          onClick={onPause}
          className="ml-auto inline-flex items-center gap-1 rounded-full border border-red-200 px-2 py-1 text-xs text-gray-600 hover:bg-red-50 transition-colors"
        >
          <Square className="h-3 w-3" /> Pause
        </button>
      </div>
    </Message>
  );
}

const ChatPane = forwardRef(function ChatPane(
  {
    conversation,
    onSend,
    onEditMessage,
    onResendMessage,
    isThinking,
    onPauseThinking,
    selectedModel,
    user,
    modelOptions,
    onModelChange,
    onFileUploaded,
    uploadedFiles,
  },
  ref
) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const composerRef = useRef(null);
  const bottomRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      insertTemplate: (templateContent) => {
        composerRef.current?.insertTemplate(templateContent);
      },
    }),
    []
  );

  // Auto-scroll to the latest message when messages change or when the assistant is thinking
  // Note: Hooks must not be conditional; run this effect every render with guarded usage.
  useEffect(() => {
    try {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    } catch (e) {
      // no-op on SSR or if ref unavailable
    }
  }, [conversation?.messages?.length ?? 0, isThinking]);

  if (!conversation) return null;

  const messages = Array.isArray(conversation.messages)
    ? conversation.messages
    : [];
  const count = messages.length || conversation.messageCount || 0;

  function startEdit(m) {
    setEditingId(m.id);
    setDraft(m.content);
  }
  function cancelEdit() {
    setEditingId(null);
    setDraft("");
  }
  function saveEdit() {
    if (!editingId) return;
    onEditMessage?.(editingId, draft);
    cancelEdit();
  }
  function saveAndResend() {
    if (!editingId) return;
    onEditMessage?.(editingId, draft);
    onResendMessage?.(editingId);
    cancelEdit();
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="mb-2 text-3xl font-serif tracking-tight sm:text-4xl md:text-5xl">
          <span className="block leading-[1.05] font-sans text-2xl">
            {conversation.title}
          </span>
        </div>
        <div className="mb-4 text-sm text-gray-600">
          Updated {timeAgo(conversation.updatedAt)} · {count} messages
        </div>

        {messages.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-600 bg-gray-50">
            No messages yet. Say hello to start.
          </div>
        ) : (
          <>
            {messages.map((m) => (
              <div key={m.id} className="space-y-2">
                {editingId === m.id ? (
                  <div
                    className={cls(
                      "rounded-2xl border p-2",
                      "border-red-200 bg-white"
                    )}
                  >
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      className="w-full resize-y rounded-xl bg-transparent p-2 text-sm outline-none text-gray-800"
                      rows={3}
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={saveEdit}
                        className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1.5 text-xs text-white hover:from-red-600 hover:to-pink-600 transition-all"
                      >
                        <Check className="h-3.5 w-3.5" /> Save
                      </button>
                      <button
                        onClick={saveAndResend}
                        className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-red-50 transition-colors"
                      >
                        <RefreshCw className="h-3.5 w-3.5" /> Save & Resend
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <Message
                    role={m.role}
                    selectedModel={selectedModel}
                    user={user}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
                    {m.role === "user" && (
                      <div className="mt-1 flex gap-2 text-[11px] text-gray-500">
                        <button
                          className="inline-flex items-center gap-1 hover:underline hover:text-gray-700 transition-colors"
                          onClick={() => startEdit(m)}
                        >
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button
                          className="inline-flex items-center gap-1 hover:underline hover:text-gray-700 transition-colors"
                          onClick={() => onResendMessage?.(m.id)}
                        >
                          <RefreshCw className="h-3.5 w-3.5" /> Resend
                        </button>
                      </div>
                    )}
                  </Message>
                )}
              </div>
            ))}
            {isThinking && (
              <ThinkingMessage
                onPause={onPauseThinking}
                selectedModel={selectedModel}
              />
            )}
            {/* sentinel element to scroll into view */}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      <Composer
        ref={composerRef}
        onSend={async (text) => {
          if (!text.trim()) return;
          setBusy(true);
          await onSend?.(text);
          setBusy(false);
        }}
        busy={busy}
        selectedModel={selectedModel}
        modelOptions={modelOptions}
        onModelChange={onModelChange}
        onFileUploaded={onFileUploaded}
        uploadedFiles={uploadedFiles}
      />
    </div>
  );
});

export default ChatPane;
