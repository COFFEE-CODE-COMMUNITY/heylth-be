export const dateInputIso = dateInput => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const [ year, month, day ] = dateInput.split('-');
    const convertToDateIso = new Date(year, month - 1, day, hours, minutes, seconds).toISOString();
    return convertToDateIso;
};