export type McqOption = {
  label: string
  text: string
}

export type McqAnswer = {
  question: string
  options: McqOption[]
  answer: string
  explanation?: string
}

export const McqSection = ({
  title,
  mcqs,
  isLoading
}: {
  title: string
  mcqs: McqAnswer[] | null
  isLoading: boolean
}) => {
  if (isLoading) {
    return (
      <div className="space-y-1.5">
        <p className="text-xs bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-clip-text text-transparent animate-pulse">
          Analyzing MCQs...
        </p>
      </div>
    )
  }

  if (!mcqs || mcqs.length === 0) {
    return <div className="text-[13px] leading-[1.4] text-gray-100">{'No MCQs found.'}</div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-[13px] font-medium text-white tracking-wide">{title}</h2>
      {mcqs.map((mcq, idx) => (
        <div key={idx} className="space-y-2 bg-white/5 rounded-md p-3">
          <div className="text-[13px] leading-[1.4] text-gray-100 whitespace-pre-wrap">{mcq.question}</div>

          <div className="space-y-2">
            {mcq.options.map((opt) => {
              const isCorrect = mcq.answer?.trim().toUpperCase() === opt.label?.trim().toUpperCase()
              return (
                <div
                  key={opt.label}
                  className={`flex items-start gap-2 rounded-md border p-2 ${
                    isCorrect
                      ? 'border-blue-400/60 bg-blue-500/15'
                      : 'border-white/10 bg-black/10'
                  }`}
                >
                  <div className={`mt-0.5 text-xs font-mono ${isCorrect ? 'text-blue-200' : 'text-white/70'}`}>
                    {opt.label}
                  </div>
                  <div className="text-[13px] leading-[1.4] text-gray-100 whitespace-pre-wrap">{opt.text}</div>
                </div>
              )
            })}
          </div>

          {mcq.explanation ? (
            <div className="text-xs text-white/70 whitespace-pre-wrap">
              <span className="font-medium text-white/80">{'Explanation: '}</span>
              {mcq.explanation}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

