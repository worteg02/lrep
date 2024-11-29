// Lista de URLs de las canciones en Dropbox
const canciones = [
    { titulo: "BEAT 1", url: "https://www.dropbox.com/scl/fi/ubu2h583j0gab6694l9c0/GBLUES-PISTA_1_90S_BEAT_COMPLETO.wav?rlkey=evnzafac4fbq7h7te4pcal2x9&st=pu46vhyx&dl=1" },
    { titulo: "BEAT 2", url: "https://www.dropbox.com/scl/fi/soqj0fe3vgqd6iban5jii/GBLUES-PISTA_2_90S_BEAT_COMPLETO.wav?rlkey=xsor51q2zgvo98gmmmzlv6hhf&st=46uujllh&dl=1" },
    { titulo: "BEAT 3", url: "https://www.dropbox.com/scl/fi/0at6mzl9iy86tkohzl9u9/GBLUES-PISTA_6_90S_BEAT_COMPLETO.wav?rlkey=g0nvcyhsdnlc13qw1ahtj4jyc&st=0olnq2k2&dl=1" },
    { titulo: "BEAT 4", url: "https://www.dropbox.com/scl/fi/up531it5f2z89ooqux2g4/GBLUES-PISTA_4_90S_BEAT_COMPLETO.wav?rlkey=pq0t5g0i96gzeaqpw65ubu2ou&st=6pee4xiq&dl=1" },
    { titulo: "BEAT 5", url: "https://www.dropbox.com/scl/fi/dvvxvgujvk05zpkx8le34/GBLUES-PISTA_5_90S_BEAT_COMPLETO.wav?rlkey=mln9yfh6tr5rsvbx5zf23ul1m&st=muowg1nl&dl=1" },
    { titulo: "BEAT 6", url: "https://www.dropbox.com/scl/fi/vkei3k4xy7xie745kj5dk/GBLUES-PISTA_6_90S_BEAT_COMPLETO.wav?rlkey=esy91y9pj001wr6ismo4rcf78&st=ohnk5u1g&dl=1" }
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
