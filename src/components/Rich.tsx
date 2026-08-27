import { Fragment } from 'react'

/**
 * Renders a content string where `**...**` marks the words worth landing on.
 *
 * Emphasis is a highlighter pen (`.mark` in globals.css), not an underline:
 * on this site an underline means "link", and marking words with one would
 * invite clicks that go nowhere. Body copy is `text-muted`, so the jump to
 * `text-fg` does as much work as the ink behind it.
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split('**')

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong
            key={i}
            className="mark font-medium text-fg"
          >
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
