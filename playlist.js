// Lista de URLs de las canciones en Dropbox
const canciones = [
    { titulo: "BEAT 1", url: "#" },
    { titulo: "BEAT 2", url: "#" },
    { titulo: "BEAT 3", url: "#" },
    { titulo: "BEAT 4", url: "#" },
    { titulo: "BEAT 5", url: "#" },
    { titulo: "BEAT 6", url: "#" }
];





// Elementos del DOM
const audioPlayer = document.getElementById('audioPlayer');
const playlist = document.getElementById('playlist');

// Función para cargar la lista de canciones
function cargarPlaylist() {
    canciones.forEach((cancion, index) => {
        const li = document.createElement('li');
        li.textContent = cancion.titulo;
        li.dataset.index = index; // Almacena el índice de la canción
        playlist.appendChild(li);

        // Añade un evento al hacer clic
        li.addEventListener('click', () => {
            reproducirCancion(index);
        });
    });
}

// Función para reproducir una canción
function reproducirCancion(index) {
    audioPlayer.pause(); // Pausa cualquier reproducción en curso
    audioPlayer.src = canciones[index].url; // Cambia la fuente del reproductor
    audioPlayer.load(); // Asegúrate de que el nuevo audio esté cargado
    audioPlayer.play().catch(error => {
        console.error("Error al reproducir la canción:", error);
    });
}

// Manejo de errores en el reproductor de audio
audioPlayer.addEventListener('error', (event) => {
    console.error("Error en el reproductor de audio:", event);
});

// Reproducción automática de la siguiente canción al terminar la actual
audioPlayer.addEventListener('ended', () => {
    let currentIndex = canciones.findIndex(c => c.url === audioPlayer.src);
    let nextIndex = (currentIndex + 1) % canciones.length; // Pasa a la siguiente canción (bucle infinito)
    reproducirCancion(nextIndex);
});

// Cargar la playlist al iniciar
cargarPlaylist();
