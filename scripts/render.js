import { SpotifyEmbed, SoundCloudEmbed } from './embeds.js';

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('CONTENT.json');
  const content = await res.json();

  const servicesContainer = document.getElementById('services-container');
  if (servicesContainer) {
    content.services.forEach(s => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `<h3>${s.title}</h3><p>${s.description}</p><p><strong>Entregables:</strong> ${s.deliverables}</p><p><strong>Formatos:</strong> ${s.formats}</p><p><strong>Plazos:</strong> ${s.timeline}</p><button class="cotizar" data-service="${s.id}">Solicitar cotización</button>`;
      servicesContainer.appendChild(card);
    });
  }

  const spotifyContainer = document.getElementById('spotify-container');
  if (spotifyContainer && content.spotify[0]) {
    spotifyContainer.innerHTML = SpotifyEmbed(content.spotify[0]);
  }

  const soundcloudContainer = document.getElementById('soundcloud-container');
  if (soundcloudContainer && content.soundcloud[0]) {
    soundcloudContainer.innerHTML = SoundCloudEmbed(content.soundcloud[0]);
  }
});
