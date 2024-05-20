import 'ldrs/helix'

export default function Loader({ isLoading }) {
  return (
    <div aria-live="polite" aria-busy={isLoading}>
      {isLoading && <l-ring size="60" color="coral"></l-ring>}
    </div>
  )
}