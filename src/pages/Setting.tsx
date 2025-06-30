import { useState, type FC } from "react"
import { THEMES } from '../constants/themes'
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { setTheme } from "../store/features/theme/themeSlice"
import { BiSend } from "react-icons/bi"

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const Setting: FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [themes, setThemes] = useState<string>('coffee')

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const theme = e.currentTarget.name;
    setThemes(theme);
    dispatch(setTheme(theme))
  };
  return (
    <div className="h-screen container mx-auto  px-4 pt-16 max-w-5xl ">
      <div className=" space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-primary text-lg font-bold">Theme</h1>
          <p className="text-base-content/70 text-sm tracking-wider">Choose a theme for your chat interface</p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8  gap-2">
          {THEMES.map((t) => (<button
            key={t}
            name={t}
            className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors 
              ${themes === t ? "bg-base-200" : "hover:bg-base-300"}`}
            onClick={handleClick}>
            <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
              <div className="absolute inset-0 grid grid-cols-4 p-1 gap-[2px]">
                <div className="rounded-sm bg-primary"></div>
                <div className="rounded-sm bg-secondary"></div>
                <div className="rounded-sm bg-accent"></div>
                <div className="rounded-sm bg-neutral"></div>
              </div>
            </div>
            <span className="text-[11px] font-medium w-full tracking-wider text-center capitalize">{t}</span>
          </button>))}
        </div>
      </div>
      <h1 className="text-lg  font-semibold mt-8 my-2 ">Preview</h1>

      <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
        <div className="p-4 bg-base-200">
          <div className="max-w-lg mx-auto">
            {/* Mock Chat UI */}
            <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                    J
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">John Doe</h3>
                    <p className="text-xs text-base-content/70">Online</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                {PREVIEW_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                      >
                        12:00 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-base-300 bg-base-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1 text-sm h-10"
                    placeholder="Type a message..."
                    value="This is a preview"
                    readOnly
                  />
                  <button className="btn btn-primary h-10 min-h-0">
                    <BiSend size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting