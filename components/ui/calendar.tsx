"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type CalendarProps = {
  className?: string
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  mode?: "single" | "multiple" | "range"
}

function Calendar({
  className,
  selected,
  onSelect,
  disabled,
  ...props
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of the month and number of days
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  // Generate calendar days
  const calendarDays: (Date | null)[] = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day))
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleDateClick = (date: Date) => {
    if (disabled && disabled(date)) return
    onSelect?.(date)
  }

  const isSelected = (date: Date) => {
    if (!selected) return false
    return date.toDateString() === selected.toDateString()
  }

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex justify-center pt-1 relative items-center mb-4">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
          onClick={goToPreviousMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">
          {monthNames[month]} {year}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
          onClick={goToNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="flex">
            {dayNames.map((day) => (
              <th
                key={day}
                className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] flex-1 text-center"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(calendarDays.length / 7) }, (_, weekIndex) => (
            <tr key={weekIndex} className="flex w-full mt-2">
              {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((date, dayIndex) => (
                <td key={dayIndex} className="h-9 w-9 text-center text-sm p-0 relative flex-1">
                  {date ? (
                    <Button
                      variant="ghost"
                      className={cn(
                        "h-9 w-9 p-0 font-normal",
                        isSelected(date) &&
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                        isToday(date) && !isSelected(date) && "bg-accent text-accent-foreground",
                        disabled && disabled(date) && "text-muted-foreground opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => handleDateClick(date)}
                      disabled={disabled && disabled(date)}
                    >
                      {date.getDate()}
                    </Button>
                  ) : (
                    <div className="h-9 w-9" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
