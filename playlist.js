// Lista de URLs de las canciones en Dropbox
const canciones = [
    { titulo: "60 Segundos- Get-Em-Beat-Monk-x-Vikingo.wav", url: "aHR0cHM6Ly93d3cuZHJvcGJveC5jb20vc2NsL2ZpLzFnc3M4a2pxZTd4Znl0YjQwdWR0ZS9Cb29tYmx1LUNob3AtU2Vuc2kteC1WaWtpbmdvLndhdj9ybGtleT13OGZwdjJzOHRpamZocDg3YWppYTNpZnBmJnN0PWVlazY3Z2o4JmRsPTE=" },
    { titulo: "60 Segundos- Chop-Sensi-x-Vikingo.wav", url: "aHR0cHM6Ly93d3cuZHJvcGJveC5jb20vc2NsL2ZpL2hwNnYzZGJjcXFiMmR4cDVvZW10cy9HZXQtRW0tQmVhdC1Nb25rLXgtVmlraW5nby53YXY/cmxrZXk9OWtmbnM2MGpsOWI5d3lnNW9jNjZ0MmI4bSZzdD1zY3B5NXV2eCZyYXc9MQ==" },
    { titulo: "60 Segundos- I-Don-t-Beat-Monk-X-Vikingo.wav", url: "aHR0cHM6Ly93d3cuZHJvcGJveC5jb20vc2NsL2ZpL2M2YWZ5OXdvc3c1eXJqZzBpcWo5L0ktRG9uLXQtQmVhdC1Nb25rLVgtVmlraW5nby53YXY/cmxrZXk9cGJqZXhudnFma3NuY3RvdzAyam56aWt4YyZzdD0yNXJlanRrNyZyYXc9MQ==" },
    { titulo: "60 Segundos- Main-Event-Beat-Monk-x-Vikingo.wav", url: "aHR0cHM6Ly93d3cuZHJvcGJveC5jb20vc2NsL2ZpL2s5dHQ1d3E5aXFtODNpM3R4aXIxeC9NYWluLUV2ZW50LUJlYXQtTW9uay14LVZpa2luZ28ud2F2P3JsZ2tleT1nMm4xZGZnYWRsMW9zd29oNXNydjJjNGpoJnN0PXNjZDFveWhiJnJhdz0x" },
    { titulo: "60 Segundos- Pista-1-Vikingo.wav", url: "aHR0cHM6Ly93d3cuZHJvcGJveC5jb20vc2NsL2ZpLzNtejk2c3hyM2NiYzNpeWMwdnFjMy9QaXN0YS0xLVZpa2luZ28ud2F2P3JsZ2tleT1icnVocGs2dHZsMWZxdTl0eG9pNHVlZTV2JnN0PTdoMmtzM25iJnJhdz0x" },
    { titulo: "60 Segundos- Pista-2-Vikingo.wav", url: "aHR0cHM6Ly93d3cuZHJvcGJveC5jb20vc2NsL2ZpL2NjeWZvYmNvN2V3ZG82Z3B6N3dlYy9QaXN0YS0yLVZpa2luZ28ud2F2P3JsZ2tleT1hd3QxeHdwbjdrbmJidmZ5ZnBjbHcwam0xcyZzdD04YndmaWoyd3omcmF3PTE=" },
    { titulo: "60 Segundos- Rawness-Beat-Monk-x-Vikingo.wav", url: "aHR0cHM6Ly93d3cuZHJvcGJveC5jb20vc2NsL2ZpL3VxdDQwbzQ1OHZsY3JuMHc3eTJzOTMvUmF3bmVzcy1CZWF0LU1vbmsteC1WaWtpbmdvLndhdj9ybGtleT14cjVhY29kZmtuZG5odHI5MTlnOHB4YjMmc3Q9NG12c3d6bXMmcGF3PTE=" },
    { titulo: "60 Segundos- Shaolin-Vengeance-Beat-Monk-x-Vikingo.wav", url: "aHR0cHM6Ly93d3cuZHJvcGJveC5jb20vc2NsL2ZpL3A2bWphaGZ4czA4eWg3a2dxeWZ0OC9TaGFvbGluLVZlbmdlYW5jZS1CZWF0LU1vbmsteC1WaWtpbmdvLndhdj9ybGtleT01dmozY28xc2FydDQ2dDdvbXIxZ3lvMmEmc3Q9bmxrYWgzY28mcmF3PTE=" }   
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
