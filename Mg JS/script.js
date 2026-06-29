let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let editandoId = null;

function mostrar(){
    const tbody = document.getElementById('tablaUsuarios');
    tbody.innerHTML = '';

    usuarios.forEach(u => {
        tbody.innerHTML += `
        <tr>
            <td>${u.id}</td>
            <td>${u.nombre}</td>
            <td>${u.apellido}</td>
            <td>${u.nickname}</td>
            <td>
                <button class="btn btn-edit" onclick="editar('${u.id}')">Editar</button>
                <button class="btn btn-delete" onclick="eliminar('${u.id}')">Eliminar</button>
            </td>
        </tr>
        `;
    });
}

function guardar() {
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const nickname = document.getElementById('nickname').value.trim();

    if (!nombre || !apellido || !nickname) {
        alert('Completa todos los campos');
        return;
    }

    if (editandoId === null) {
        const nuevo = {
            id: String(Date.now()), 
            nombre: nombre,
            apellido: apellido,
            nickname: nickname
        };
        usuarios.push(nuevo);
    } else {
        usuarios = usuarios.map(u =>
            String(u.id) === String(editandoId) ? { ...u, nombre, apellido, nickname } : u
        );
        editandoId = null;
        
        const formTitle = document.getElementById('formTitle');
        if (formTitle) formTitle.innerText = 'Agregar Usuario';
    }

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    limpiar();
    mostrar();
}

function editar(id) {
    const user = usuarios.find(u => String(u.id) === String(id));
    if (!user) return;

    document.getElementById('nombre').value = user.nombre;
    document.getElementById('apellido').value = user.apellido;
    document.getElementById('nickname').value = user.nickname;
    editandoId = id;
    
    const formTitle = document.getElementById('formTitle');
    if (formTitle) formTitle.innerText = 'Editar Usuario';
}

function eliminar(id) {
    if (confirm('¿Eliminar este usuario?')) {
        usuarios = usuarios.filter(u => String(u.id) !== String(id));
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        mostrar();
        
        if (editandoId === id) {
            editandoId = null;
            limpiar();
            const formTitle = document.getElementById('formTitle');
            if (formTitle) formTitle.innerText = 'Agregar Usuario';
        }
    }
}

function limpiar () {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('nickname').value = '';
}

mostrar();