const argv = require("yargs").argv;

const Contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await Contacts.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const createdContact = await Contacts.addContact(name, email, phone);
      console.log(createdContact);
      break;

    case "remove":
      const removedContact = await Contacts.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
