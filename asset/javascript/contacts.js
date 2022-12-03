const id = localStorage.getItem("online");
if (!id) {
    window.location.href = "../../index.html";
}

const user = JSON.parse(localStorage.getItem("users")).find((user) => user.id == id);

if (!localStorage.getItem("contacts")) {
    localStorage.setItem("contacts", JSON.stringify([]));
}

document.querySelector("a[username]").append(user.username);

const tableRow = (contact, index, deleteFuntion, editFunction) => {
    const tr = document.createElement("tr");
    const tdNumber = document.createElement("td");
    const tdName = document.createElement("td");
    const tdPhoneNo = document.createElement("td");
    const tdEmail = document.createElement("td");
    const tdButtons = document.createElement("td");
    const buttonEdit = document.createElement("button");
    const buttonDelete = document.createElement("button");

    tdNumber.textContent = index + 1;
    tr.append(tdNumber);

    tdName.textContent = contact.name;
    tr.append(tdName);

    tdPhoneNo.textContent = contact.phoneNo;
    tr.append(tdPhoneNo);

    tdEmail.textContent = contact.email;
    tr.append(tdEmail);

    const editIcon = `<i class="bi bi-pencil-square"></i>`;

    const removeIcon = `<i class="bi bi-trash"></i>`;

    buttonEdit.innerHTML = editIcon;
    buttonEdit.setAttribute("data-bs-toggle", "modal");
    buttonEdit.setAttribute("data-bs-target", "#editContactForm");
    buttonEdit.classList.add("btn", "btn-primary");
    buttonEdit.addEventListener("click", editFunction);
    tdButtons.append(buttonEdit);

    buttonDelete.innerHTML = removeIcon;
    buttonDelete.classList.add("btn", "btn-danger");
    buttonDelete.addEventListener("click", deleteFuntion);
    tdButtons.append(" ", buttonDelete);
    tr.append(tdButtons);

    return tr;
};

let savedRandomId;

const renderTable = () => {
    let contacts = JSON.parse(localStorage.getItem("contacts")).filter((contact) => {
        if (contact.user_id == id) return contact;
    });

    if (contacts.length == 0) return;

    const table = document.querySelector("table");

    const tbody = document.createElement("tbody");
    contacts.forEach((contact, index) => {
        const deleteContact = () => {
            let isSure = window.confirm("Are your sure you want to delete the contact?");
            if (isSure == false) return;
            contacts.splice(index, 1);
            table.removeChild(table.lastChild);
            localStorage.setItem("contacts", JSON.stringify(contacts));
            renderTable();
        };
        const editContact = () => {
            document.querySelector("#editContactForm input[name='contactName']").value =
                contact.name;
            document.querySelector("#editContactForm input[name='phoneNo']").value =
                contact.phoneNo;
            document.querySelector("#editContactForm input[name='email']").value = contact.email;
            savedRandomId = contact.id;
        };
        const tr = tableRow(contact, index, deleteContact, editContact);
        tbody.append(tr);
    });
    document.querySelector("table").append(tbody);
};

renderTable();

const addContactForm = document.querySelector("#add-contact-form");

const addContact = document.querySelector("#add-contact-form input[name='contactName']");
const addPhoneNo = document.querySelector("#add-contact-form input[name='phoneNo']");
const addEmail = document.querySelector("#add-contact-form input[name='email']");

let contactInput;
let phoneNoInput;
let emailInput;

addContact.addEventListener("input", (event) => {
    contactInput = event.target.value;
});

addPhoneNo.addEventListener("input", (event) => {
    phoneNoInput = event.target.value;
});

addEmail.addEventListener("input", (event) => {
    emailInput = event.target.value;
});

addContactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let randomNo = Math.floor(Math.random() * 1000);
    const data = {
        id: randomNo,
        user_id: id,
        name: contactInput,
        phoneNo: phoneNoInput,
        email: emailInput,
    };

    let contacts = JSON.parse(localStorage.getItem("contacts"));
    contacts.push(data);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    const table = document.querySelector("table");
    table.removeChild(table.lastChild);
    renderTable();
});

const editContactForm = document.querySelector("#edit-contact-form");

editContactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let editContactInput = document.querySelector("#edit-contact").value;
    let editPhoneNoInput = document.querySelector("#edit-phoneNo").value;
    let editEmailInput = document.querySelector("#edit-email").value;

    const contacts = JSON.parse(localStorage.getItem("contacts"));

    const findContact = contacts.find((contact) => contact.id == savedRandomId);

    const findIndex = contacts.indexOf(findContact);

    let editedContact = { ...findContact };
    editedContact.name = editContactInput;
    editedContact.phoneNo = editPhoneNoInput;
    editedContact.email = editEmailInput;

    let updatedContacts = [...contacts];
    updatedContacts[findIndex] = editedContact;

    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    const table = document.querySelector("table");
    table.removeChild(table.lastChild);
    renderTable();
});

const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("online");
    window.location.href = "../../index.html";
});
