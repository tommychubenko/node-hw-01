const fs = require("fs/promises");
const path = require("path");
const dbPath = path.join(__dirname, "./contacts.json");
const { v4: uuidv4 } = require("uuid");

async function getContacts() {
  const dbRaw = await fs.readFile(dbPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function getExactContact(id) {
  const db = await getContacts();
  const exactContact = db.find((item) => item.id === id);
  console.table(exactContact);
}

async function addContact(contact) {
  const id = uuidv4();
  const newContact = { id, ...contact };
  const contacts = await getContacts();
  contacts.push(newContact);
  await fs.writeFile(dbPath, JSON.stringify(contacts));
  return newContact;
}

async function removeContact(id) {
  const db = await getContacts();
  const contact = db.find((item) => item.id === id);
  if (!contact) {
    console.log("No such contact");
    return null;
  }
  if (contact) {
    console.log("Contact found!");
    const contacts = db.filter((contact) => contact.id !== id);
    await fs.writeFile(dbPath, JSON.stringify(contacts));
  }
}

module.exports = {
  getContacts,
  getExactContact,
  addContact,
  removeContact,
};
