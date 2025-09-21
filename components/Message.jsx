import { cls } from "./utils"

export default function Message({ role, children, selectedModel, user }) {
  const isUser = role === "user"
  return (
    <div className={cls("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="mt-0.5 flex h-7 w-7 items-center justify-center">
          <img 
            src={selectedModel?.image} 
            alt={selectedModel?.name || 'AI'}
            className="h-7 w-7 rounded-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm" style={{display: 'none'}}>
            {selectedModel?.name?.charAt(0) || 'AI'}
          </div>
        </div>
      )}
      <div
        className={cls(
          "max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm",
          isUser
            ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md"
            : "bg-white text-gray-800 border border-gray-200 shadow-sm",
        )}
      >
        {children}
      </div>
      {isUser && (
        <div className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-[10px] font-bold text-white shadow-sm">
          {user?.name ? user.name.charAt(0).toUpperCase() : user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
        </div>
      )}
    </div>
  )
}
