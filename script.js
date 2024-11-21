let currentIndex = -1;
const data = [];

const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];
const formContainer = document.getElementById('form-container');
const showFormBtn = document.getElementById('show-form-btn');
const cancelBtn = document.getElementById('cancel-btn');
const dataForm = document.getElementById('data-form');

document.addEventListener('DOMContentLoaded', () => {
    showFormBtn.addEventListener('click', () => {
        formContainer.classList.remove('hidden');
        showFormBtn.classList.add('hidden');
    });

    cancelBtn.addEventListener('click', () => {
        formContainer.classList.add('hidden');
        showFormBtn.classList.remove('hidden');
        resetForm();
    });

    dataForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();

        if (!firstName || !lastName || !email || !address || !city) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const newData = { firstName, lastName, email, address, city };

        if (currentIndex >= 0) {
            data[currentIndex] = newData;
            currentIndex = -1;
        } else {
            data.push(newData);
        }

        renderTable();
        resetForm();
        formContainer.classList.add('hidden');
        showFormBtn.classList.remove('hidden');
    });
});

function deleteData(index) {
    data.splice(index, 1);
    renderTable();
}

function editData(index) {
    const item = data[index];
    
    document.getElementById('first-name').value = item.firstName;
    document.getElementById('last-name').value = item.lastName;
    document.getElementById('email').value = item.email;
    document.getElementById('address').value = item.address;
    document.getElementById('city').value = item.city;

    formContainer.classList.remove('hidden');
    showFormBtn.classList.add('hidden');
    document.getElementById('form-title').textContent = 'Actualizar Datos';

    currentIndex = index;
}

function renderTable() {
    dataTable.innerHTML = '';

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.email}</td>
            <td>${item.address}</td>
            <td>${item.city}</td>
            <td>
                <button class="bot btn-update" onclick="editData(${index})">Actualizar</button>
                <button class="bot btn-delete" onclick="deleteData(${index})">Eliminar</button>
            </td>
        `;
        dataTable.appendChild(row);
    });
}

function resetForm() {
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
    document.getElementById('city').value = '';

    document.getElementById('form-title').textContent = 'Agregar Datos';
}
