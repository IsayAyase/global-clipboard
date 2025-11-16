export const formatDateAgo = (date: string | Date): string => {
    const dateObj = new Date(date);
    if (!dateObj) {
        return "Invalid Date";
    }
    const currDate = new Date();
    const timeDiff = currDate.getTime() - dateObj.getTime();

    if (timeDiff < 60000) {
        const seconds = Math.floor(timeDiff / 1000);
        return `${seconds} seconds ago`;
    } else if (timeDiff < 3600000) {
        const minutes = Math.floor(timeDiff / 60000);
        return `${minutes} minutes ago`;
    } else if (timeDiff < 86400000) {
        const hours = Math.floor(timeDiff / 3600000);
        return `${hours} hours ago`;
    } else if (timeDiff < 2592000000) {
        const days = Math.floor(timeDiff / 86400000);
        return `${days} days ago`;
    } else {
        return dateObj.toLocaleDateString();
    }
}
