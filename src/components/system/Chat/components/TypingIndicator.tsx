export default function TypingIndicator() {
  return (
    <div className="flex gap-3 flex-row">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9af6a380]">
        <span className="h-2 w-2 rounded-full bg-black/70 animate-ping" />
      </div>
      <div className="flex max-w-[70%] rounded-lg px-1 py-2 flex-col bg-black/70 text-white items-start">
        <div className="rounded-2xl text-md px-2 bg-[var(--bot-message)] ">
          <div className="text-sm md:text-md leading-relaxed text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[var(--bot-message)] px-3 py-2">
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="h-2 w-2 rounded-full bg-white/80 animate-bounce"
                      style={{ animationDelay: `${dot * 120}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
