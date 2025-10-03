/**
 * Google Calendar Integration Utilities
 * Provides functions to create Google Calendar events and links
 */

/**
 * Create a Google Calendar link for an event
 * @param {Object} event - Event object with title, description, startDate, endDate, location
 * @returns {string} Google Calendar URL
 */
export const createGoogleCalendarLink = (event) => {
    if (!event) return '';

    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';

    // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ format)
    const formatDateForGoogle = (dateStr) => {
        const date = new Date(dateStr);
        return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };

    const startDate = formatDateForGoogle(event.startDate);
    const endDate = formatDateForGoogle(event.endDate);

    // Create URL parameters
    const params = new URLSearchParams({
        text: event.title || 'Event',
        dates: `${startDate}/${endDate}`,
        details: event.description || 'Event created via CampusNex',
        location: event.location || '',
        ctz: Intl.DateTimeFormat().resolvedOptions().timeZone
    });

    return `${baseUrl}&${params.toString()}`;
};

/**
 * Open Google Calendar with pre-filled event data
 * @param {Object} event - Event object
 */
export const addToGoogleCalendar = (event) => {
    const calendarLink = createGoogleCalendarLink(event);
    window.open(calendarLink, '_blank', 'width=600,height=600');
};

/**
 * Create iCalendar (.ics) file content for download
 * @param {Object} event - Event object
 * @returns {string} iCal content
 */
export const createICalContent = (event) => {
    if (!event) return '';

    const formatDateForIcal = (dateStr) => {
        const date = new Date(dateStr);
        return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };

    const startDate = formatDateForIcal(event.startDate);
    const endDate = formatDateForIcal(event.endDate);
    const now = formatDateForIcal(new Date());

    const icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CampusNex//Event Calendar//EN
BEGIN:VEVENT
UID:${event.id || Date.now()}@campusnex.com
DTSTAMP:${now}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${event.title || 'Event'}
DESCRIPTION:${event.description || 'Event created via CampusNex'}
LOCATION:${event.location || ''}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    return icalContent;
};

/**
 * Download iCalendar file
 * @param {Object} event - Event object
 */
export const downloadICalFile = (event) => {
    const icalContent = createICalContent(event);
    const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${event.title || 'event'}.ics`;
    link.click();
    window.URL.revokeObjectURL(link.href);
};

/**
 * Get calendar provider options
 * @param {Object} event - Event object
 * @returns {Array} Array of calendar provider options
 */
export const getCalendarProviders = (event) => {
    return [
        {
            name: 'Google Calendar',
            icon: '📅',
            action: () => addToGoogleCalendar(event),
            color: 'bg-blue-600 hover:bg-blue-700'
        },
        {
            name: 'Download .ics',
            icon: '📥',
            action: () => downloadICalFile(event),
            color: 'bg-green-600 hover:bg-green-700'
        },
        {
            name: 'Apple Calendar',
            icon: '🍎',
            action: () => downloadICalFile(event), // Apple Calendar can import .ics files
            color: 'bg-gray-600 hover:bg-gray-700'
        }
    ];
};

const googleCalendarUtils = {
    createGoogleCalendarLink,
    addToGoogleCalendar,
    createICalContent,
    downloadICalFile,
    getCalendarProviders
};

export default googleCalendarUtils;