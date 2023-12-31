const fs = require("node:fs/promises");

const path = require("node:path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const crypto = require("crypto");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function getAll() {
  const contacts = await listContacts();
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const newContact = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];

  await writeContacts(newContact);
  return contacts[index];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getAll,
  getContactById,
  removeContact,
  addContact,
};
