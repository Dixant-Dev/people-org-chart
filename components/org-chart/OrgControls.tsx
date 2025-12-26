import { PiMinus, PiPlus, PiDownloadSimple, PiEye } from "react-icons/pi"

export default function OrgControls({
  scale,
  onZoomIn,
  onZoomOut,
  onFit,
}: {
  scale: number
  onZoomIn: () => void
  onZoomOut: () => void
  onFit: () => void
}) {
  return (
    <div className="absolute right-6 z-50 rounded-xl bg-white shadow-md p-2 flex items-center gap-2">
      <button
        onClick={onZoomOut}
        className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center cursor-pointer"
      >
        <PiMinus />
      </button>

      <span className="text-sm w-10 text-center">
        {Math.round(scale * 100)}
      </span>

      <button
        onClick={() => {
          onZoomIn()
        }}
        className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center cursor-pointer"
      >
        <PiPlus />
      </button>

      <button className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center">
        <PiDownloadSimple />
      </button>

      <button
        onClick={onFit}
        className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center cursor-pointer"
      >
        <PiEye />
      </button>
    </div>
  )
}
