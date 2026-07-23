import EmptyState from '../common/EmptyState'
import ReplyCard from './ReplyCard'

export default function RepliesList({ replies }) {
  if (!replies.length) {
    return (
      <EmptyState
        title="No replies yet."
        body="Maybe Ines is still reading with a smile."
      />
    )
  }

  return (
    <section className="stack-md">
      {replies.map((reply) => (
        <ReplyCard key={reply.id} reply={reply} />
      ))}
    </section>
  )
}
