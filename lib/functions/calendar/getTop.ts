export function getStackTop({ rowHeight, hoursGap, hours, stackStart }: { rowHeight: number, hoursGap: number, hours: number[], stackStart: number }){
    return  (rowHeight + hoursGap) * (hours.indexOf((stackStart - stackStart % 60) / 60)) + (rowHeight + hoursGap) * ((stackStart % 60) / 60);
}