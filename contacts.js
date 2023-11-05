import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

const updateContacts = contacts =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


// TODO: задокументировать каждую функцию
export const listContacts = async () => {
  try {
    // ...твой код. Возвращает массив контактов.
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
  } catch (error) {
    throw new Error(`Ошибка при получении списка контактов: ${error.message}`);
  }
};

export const getContactById = async (id) => {
  // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === id);
    return result || null;
  } catch (error) {
    throw new Error(`Ошибка при поиске контакта: ${error.message}`);
  }
};

export const removeContact = async (id) => {
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts;
    return result;
  } catch (error) {
    throw new Error(`Ошибка при удалении контакта: ${error.message}`);
  }
};

export const addContact = async (name, email, phone) => {
  // ...твой код. Возвращает объект добавленного контакта.
  try {
    const contacts = await listContacts();
    const newContscts = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContscts);
    await updateContacts(contacts);
    return newContscts;
  } catch (error) {
    throw new Error(`Ошибка при добавлении контакта: ${error.message}`);
  }
};
