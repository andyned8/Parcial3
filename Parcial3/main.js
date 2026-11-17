const { createApp } = Vue;

createApp({
    data() {
        return {
            idBuscado: '',
            personaje: null,
            errorMsg: '',
            listaPersonajes: [],
            mensajeEstado: ''
        }
    },
    methods: {
        // Acción del Botón 1: Buscar personaje específico por ID en la API
        async buscarPersonaje() {
            if (!this.idBuscado) return;
            this.personaje = null;
            this.errorMsg = '';

            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${this.idBuscado}`);
                if (!response.ok) throw new Error('No encontrado');
                
                const data = await response.json();
                this.personaje = data;
            } catch (error) {
                this.errorMsg = "Personaje no encontrado en la API.";
            }
        },

        // Acción del Botón 2: Cargar la lista masiva con v-for
        async cargarLista() {
            try {
                // IDs exactos que simulan la vista de tarjetas de la referencia
                const response = await fetch('https://rickandmortyapi.com/api/character/10,11,12,20,21,22');
                const data = await response.json();
                this.listaPersonajes = data;
            } catch (error) {
                console.error("Error al cargar los personajes");
            }
        },

        // Acción del Botón 3: Verificar estado del sistema
        mostrarAlerta() {
            this.mensajeEstado = "¡Sistema operando al 100%! Peticiones HTTP funcionando correctamente.";
        }
    }
}).mount('#app');