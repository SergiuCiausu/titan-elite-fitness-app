 export function getStackHeight ({ rowHeight, hoursGap, classGap, stackEnd, stackStart }: { rowHeight: number, hoursGap: number, stackEnd: number, stackStart: number, classGap: number}){
    return (rowHeight + hoursGap) * ((stackEnd - stackStart - (stackEnd - stackStart) % 60) / 60 + ((stackEnd - stackStart) % 60) / 60) - classGap - 1;
}