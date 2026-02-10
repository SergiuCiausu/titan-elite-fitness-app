import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "../../../button";
import { ChevronDownIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { ro } from "date-fns/locale";

type CalendarRangeProps = {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
}

export function DateSelector({ startDate, setStartDate, endDate, setEndDate}: CalendarRangeProps) {

    return (
        <div
            className="flex items-center">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="no_bg"
                        data-empty={!startDate}
                        className="data-[empty=true]:text-muted-foreground w-fit justify-between text-left font-normal"
                        >
                    {startDate ? format(startDate, "PPP", { locale: ro }) : <span>Pick a date</span>}
                    <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                        mode="single"
                        required
                        selected={startDate}
                        onSelect={setStartDate}
                        defaultMonth={startDate}
                        className="rounded-md border shadow-sm"
                        captionLayout="dropdown"
                    />
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="no_bg"
                        data-empty={!endDate}
                        className="data-[empty=true]:text-muted-foreground w-fit justify-between text-left font-normal"
                    >
                    {endDate ? format(endDate, "PPP", { locale: ro }) : <span>Pick a date</span>}
                    <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                        mode="single"
                        required
                        selected={endDate}
                        onSelect={setEndDate}
                        defaultMonth={endDate}
                        className="rounded-md border shadow-sm"
                        captionLayout="dropdown"
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}