/**
 * Utility to determine live shop status in Oklahoma City (US Central Time)
 * Hours: Mon-Fri 8:00 AM - 5:00 PM, Sat-Sun Closed
 */
export function getShopOpenStatus(): {
  isOpen: boolean;
  statusText: string;
  nextOpenText: string;
  currentTimeString: string;
} {
  try {
    const now = new Date();
    // Format to US Central Time
    const centralTimeString = now.toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      hour12: false,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Extract day and hour in central time
    const centralDate = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/Chicago' })
    );

    const day = centralDate.getDay(); // 0 is Sunday, 6 is Saturday
    const hours = centralDate.getHours();
    const minutes = centralDate.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    const openMinutes = 8 * 60; // 8:00 AM
    const closeMinutes = 17 * 60; // 5:00 PM

    const isWeekday = day >= 1 && day <= 5;
    const isWithinHours = totalMinutes >= openMinutes && totalMinutes < closeMinutes;
    const isOpen = isWeekday && isWithinHours;

    const formatCentralTime = centralDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    if (isOpen) {
      const remainingMinutes = closeMinutes - totalMinutes;
      const closingSoon = remainingMinutes <= 60;
      return {
        isOpen: true,
        statusText: closingSoon ? `Open Now (Closes at 5:00 PM)` : 'Open Now — Welcoming Walk-ins',
        nextOpenText: 'Open today until 5:00 PM Central',
        currentTimeString: `${formatCentralTime} OKC Time`,
      };
    } else {
      let nextDayText = 'Opens Monday at 8:00 AM';
      if (day >= 1 && day < 5) {
        if (totalMinutes < openMinutes) {
          nextDayText = 'Opens today at 8:00 AM';
        } else {
          nextDayText = 'Opens tomorrow at 8:00 AM';
        }
      } else if (day === 5) {
        if (totalMinutes < openMinutes) {
          nextDayText = 'Opens today at 8:00 AM';
        } else {
          nextDayText = 'Opens Monday at 8:00 AM';
        }
      }

      return {
        isOpen: false,
        statusText: 'Shop Closed — Drop Box & Online Booking Open',
        nextOpenText: nextDayText,
        currentTimeString: `${formatCentralTime} OKC Time`,
      };
    }
  } catch (err) {
    return {
      isOpen: true,
      statusText: 'Mon–Fri 8:00 AM – 5:00 PM',
      nextOpenText: 'Call (405) 677-7454',
      currentTimeString: 'Central Time',
    };
  }
}
