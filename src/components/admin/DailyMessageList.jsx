import DailyMessageItemCard from './DailyMessageItemCard'

export default function DailyMessageList(props) {
  return (
    <div className="admin-grid">
      {props.items.map((item) => (
        <DailyMessageItemCard key={item.id} item={item} {...props} />
      ))}
    </div>
  )
}
