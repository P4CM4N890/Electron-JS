const dataBase = require('./js/database.js');

class peopleManager {
    constructor() {
        this.formPeople = document.getElementById('formPeople');
        this.peopleData = document.getElementById('peopleData');
        this.firstName = document.getElementById('firstName');
        this.lastName = document.getElementById('lastName');
        this.email = document.getElementById('email');
        this.bttonRegister = document.getElementById('bttonRegister');
        
        this.loadPeople();
        this.addEventListeners();
    }

    addEventListeners() {
        this.formPeople.addEventListener('submit', this.createRegister.bind(this));
    }

    createRegister(event) {
        event.preventDefault();

        dataBase.addPerson(this.firstName.value, this.lastName.value, this.email.value);
        this.firstName.value = '';
        this.lastName.value = '';
        this.email.value = '';

        this.loadPeople();
    }

    createHTML(person){
        return `<tr>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.email}</td>
            <td>
            <button class="btn btn-danger btn-sm" onclick="PeopleManager.deletePerson('${person._id}');">Eliminar</button>
            </td>
        </tr>`
    }

    loadPeople() {
        dataBase.getPeople((people) => {
            let html = people.map(this.createHTML).join('');

            this.peopleData.innerHTML = html;
        });
    }

    deletePerson(id) {
        dataBase.deletePerson(id);

        this.loadPeople();
    }
}

let PeopleManager = new peopleManager();