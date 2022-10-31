const { program } = require("commander");
const db = require("./db");

async function invokeAction({ action, info, id }) {
  switch (action) {
    case "list":
      const contacts = await db.getContacts();
      console.table(contacts);

      break;
    case "get":
      await db.getExactContact(id);
      break;
    case "add":
      await db.addContact(info);
      break;

    case "remove":
      await db.removeContact(id);
      break;

    default:
      break;
  }
}

program.command("list").action(async (options) => {
  invokeAction({ action: "list" });
});

program.command("get <id>").action(async (options) => {
  console.log(options);
  invokeAction({ action: "get", id: options });
});

program.command("add <infoArgs...>").action(async (options) => {
  invokeAction({
    action: "add",
    info: {
      name: options[0],
      email: options[1],
      phone: options[2],
    },
  });
});

program.command("remove <id>").action(async (options) => {
  console.log(options);
  invokeAction({ action: "remove", id: options });
});

program.parse();
