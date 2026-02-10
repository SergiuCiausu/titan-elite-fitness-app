export function YDashLine({ index, height }: { index: number, height: number }) {
    return index === 0 ? "" : <div className="absolute bg-white outline-dashed outline-[1px] opacity-20" style={{ left: 0, height, top: 0}}></div>
}