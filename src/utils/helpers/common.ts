// Функция для добавления отступов в больших числах
export const formatCount = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
