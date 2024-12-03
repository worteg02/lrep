// Lista de URLs de las canciones en Dropbox
const canciones = [
    { titulo: "60 Segundos- Get-Em-Beat-Monk-x-Vikingo.wav ", url: "https://www.dropbox.com/scl/fi/hp6v3dbcqqb2dxp5oemts/Get-Em-Beat-Monk-x-Vikingo.wav?rlkey=9kfns60jl9b9wyg5oc66t2b8m&st=scpy5uvx&raw=1" },
    { titulo: "60 Segundos- Get-Em-Beat-Monk-x-Vikingo.wav", url: "https://www.dropbox.com/scl/fi/hp6v3dbcqqb2dxp5oemts/Get-Em-Beat-Monk-x-Vikingo.wav?rlkey=9kfns60jl9b9wyg5oc66t2b8m&st=scpy5uvx&raw=1" },
    { titulo: "60 Segundos- I-Don-t-Beat-Monk-X-Vikingo.wav ", url: "https://www.dropbox.com/scl/fi/c6afy9wos7s5yrjg0iqj9/I-Don-t-Beat-Monk-X-Vikingo.wav?rlkey=pbjexnvqfksnctow02jnzikxc&st=25rejtk7&raw=1" },
    { titulo: "60 Segundos- Main-Event-Beat-Monk-x-Vikingo.wav ", url: "https://www.dropbox.com/scl/fi/k9tt5wq9iqm83i3txir1x/Main-Event-Beat-Monk-x-Vikingo.wav?rlkey=g2n1dfgadl1oswoh5srv2c4jh&st=scd1oyhb&raw=1" },
    { titulo: "60 Segundos- Pista-1-Vikingo.wav ", url: "https://www.dropbox.com/scl/fi/3mz96sxr3cbc3iyc0vqc3/Pista-1-Vikingo.wav?rlkey=bruhpk6tvl1fqu9txoi4uee5v&st=7h2ks3nb&raw=1" },
    { titulo: "60 Segundos- Pista-2-Vikingo.wav ", url: "https://www.dropbox.com/scl/fi/ccyfobco7ewdo6gpz7wec/Pista-2-Vikingo.wav?rlkey=awt1xwpn7knbbvyfpclw0jm1s&st=8bwfij2w&raw=1" },
    { titulo: "60 Segundos- Rawness-Beat-Monk-x-Vikingo.wav ", url: "https://www.dropbox.com/scl/fi/uqt4o458vlcrn0w7y2s93/Rawness-Beat-Monk-x-Vikingo.wav?rlkey=xr5acodfkndnhtrv919g8pxb3&st=4mvswzms&raw=1" },
    { titulo: "60 Segundos- Shaolin-Vengeance-Beat-Monk-x-Vikingo.wav ", url: "https://www.dropbox.com/scl/fi/p6mjahfxs08yh7kgqyft8/Shaolin-Vengeance-Beat-Monk-x-Vikingo.wav?rlkey=5vj3co8q7eg408w7omr1gyo2a&st=nlkaa3co&raw=1" },
    { titulo: "60 Segundos- ", url: "#" }
   
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
