const DB_KEY = "passwordDB";

export const readDB = () => {
  const data = localStorage.getItem(DB_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

export const writeToDB = (serviceName, password) => {
  const data = readDB();
  data.push({ serviceName, password });
  localStorage.setItem(DB_KEY, JSON.stringify(data));
};

export const updateInDB = (serviceName, newPassword) => {
  const data = readDB();
  const updatedData = data.map((item) =>
    item.serviceName === serviceName ? { ...item, password: newPassword } : item
  );
  localStorage.setItem(DB_KEY, JSON.stringify(updatedData));
};

export const deleteFromDB = (serviceName) => {
  const data = readDB();
  const updatedData = data.filter((item) => item.serviceName !== serviceName);
  localStorage.setItem(DB_KEY, JSON.stringify(updatedData));
};
